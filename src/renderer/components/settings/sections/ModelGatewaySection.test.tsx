// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MODEL_GATEWAY_SECRET_REF } from '@shared/agents/model-gateway'
import { DEFAULT_SETTINGS } from '@shared/types'
import { useSettings } from '../../../state/settings'
import { useModelGateway } from '../../../state/modelGateway'
import { ModelGatewaySection } from './ModelGatewaySection'
import { setUiLanguage } from '@renderer/i18n/runtime'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('ModelGatewaySection credential modes', () => {
  let host: HTMLElement
  let root: Root
  let saveCredential: ReturnType<typeof vi.fn>

  beforeEach(() => {
    host = document.createElement('div')
    document.body.appendChild(host)
    saveCredential = vi.fn(async () => ({ hasStoredKey: true, storage: 'encrypted' as const }))
    ;(window as unknown as { nodeTerminal: any }).nodeTerminal = {
      settings: { save: vi.fn() },
      agent: {
        discoverModels: vi.fn(),
        gatewayCredentialStatus: vi.fn(async () => ({
          hasStoredKey: false,
          storage: 'encrypted' as const
        })),
        saveGatewayCredential: saveCredential,
        clearGatewayCredential: vi.fn(async () => ({
          hasStoredKey: false,
          storage: 'encrypted' as const
        }))
      }
    }
    useSettings.setState({
      settings: {
        ...DEFAULT_SETTINGS,
        modelGateway: {
          baseUrl: 'https://gateway.example.test',
          apiKey: '${env:BIFROST_VK}'
        }
      },
      hydrated: true
    })
    useModelGateway.setState({ models: [], status: 'idle', error: '' })
  })

  afterEach(() => {
    act(() => root?.unmount())
    host.remove()
    setUiLanguage('en')
  })

  const mount = async (): Promise<void> => {
    root = createRoot(host)
    await act(async () => {
      root.render(<ModelGatewaySection isActive />)
    })
  }

  it('renders gateway controls in Chinese and updates them when the locale changes', async () => {
    setUiLanguage('zh')
    await mount()
    for (const text of ['模型发现接口', '自定义路径…', '凭据来源', '环境变量', '获取模型', '默认模型']) {
      expect(host.textContent).toContain(text)
    }
    expect(host.textContent).toContain('settings.json 中保存的是 ${env:VAR} 引用')
    expect(host.textContent).not.toMatch(/Model discovery endpoint|Enter the server root|Credential source|Available models|Custom path/)
    expect(host.querySelector('[role="radiogroup"]')?.getAttribute('aria-label')).toBe('模型发现接口')

    await act(async () => {
      useModelGateway.setState({ models: [{ id: 'example-model' }], status: 'ready' })
    })
    expect(host.textContent).toContain('共 1 个可用模型。')
    await act(async () => { setUiLanguage('en') })
    expect(host.textContent).toContain('1 model available.')
    expect(host.textContent).toContain('Model discovery endpoint')
  })

  it('localizes stored-key feedback without displaying the secret', async () => {
    setUiLanguage('zh')
    await mount()
    const source = host.querySelector<HTMLSelectElement>('#model-gateway-credential-source')!
    await act(async () => {
      source.value = 'stored'
      source.dispatchEvent(new Event('change', { bubbles: true }))
    })
    const input = host.querySelector<HTMLInputElement>('#model-gateway-key')!
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, 'test-secret')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    const save = [...host.querySelectorAll('button')].find((button) => button.textContent === '保存密钥')!
    saveCredential.mockRejectedValueOnce(new Error('keyring-locked'))
    await act(async () => { save.click() })
    expect(host.textContent).toContain('请解锁系统密钥环后重试。')
    await act(async () => { save.click() })
    expect(host.textContent).toContain('API 密钥已安全保存。')
    expect(host.textContent).not.toContain('test-secret')
    expect(input.value).toBe('')
    await act(async () => { setUiLanguage('en') })
    expect(host.textContent).toContain('API key saved securely.')
  })

  it('shows an environment name as ordinary text while persisting the expansion token', async () => {
    await mount()
    const input = host.querySelector<HTMLInputElement>('#model-gateway-env-name')!
    expect(input.type).toBe('text')
    expect(input.value).toBe('BIFROST_VK')
    expect(host.querySelector('#model-gateway-key')).toBeNull()

    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(
        input,
        'GATEWAY_KEY'
      )
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })

    expect(useSettings.getState().settings.modelGateway.apiKey).toBe('${env:GATEWAY_KEY}')
  })

  it('persists the selected discovery path and previews its resolved endpoint', async () => {
    await mount()
    expect(host.textContent).toContain(
      'Discovery: https://gateway.example.test/v1/models'
    )

    const openAiPath = [...host.querySelectorAll<HTMLInputElement>('input[type="radio"]')].find(
      (input) => input.parentElement?.textContent?.includes('/openai/v1/models')
    )!
    await act(async () => {
      openAiPath.click()
    })

    expect(useSettings.getState().settings.modelGateway.discoveryPath).toBe(
      '/openai/v1/models'
    )
    expect(openAiPath.checked).toBe(true)
    expect(host.textContent).toContain(
      'Discovery: https://gateway.example.test/openai/v1/models'
    )
  })

  it('keeps a literal key write-only and stores only the secret sentinel in settings', async () => {
    await mount()
    const source = host.querySelector<HTMLSelectElement>('#model-gateway-credential-source')!
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')!.set!.call(
        source,
        'stored'
      )
      source.dispatchEvent(new Event('change', { bubbles: true }))
    })

    const input = host.querySelector<HTMLInputElement>('#model-gateway-key')!
    expect(input.type).toBe('password')
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(
        input,
        'literal-secret'
      )
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    const save = [...host.querySelectorAll('button')].find(
      (button) => button.textContent === 'Save key'
    )!
    await act(async () => {
      save.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(saveCredential).toHaveBeenCalledWith('literal-secret')
    expect(useSettings.getState().settings.modelGateway.apiKey).toBe(
      MODEL_GATEWAY_SECRET_REF
    )
    expect(input.value).toBe('')
    expect(host.textContent).not.toContain('literal-secret')
  })
})
