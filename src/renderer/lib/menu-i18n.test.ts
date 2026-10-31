import { afterEach, describe, expect, it, vi } from 'vitest'
import { setUiLanguage } from '../i18n/runtime'
import { urlLinkMenuItems } from '../terminal/link-menu'
import { downloadMenuEntries } from './filesNode'
import { osRevealLabel } from './osReveal'
import { ZONES } from './nodeZones'
import { HIDEABLE_MENU_ITEMS } from './ui-visibility'
import { enMessages } from '@shared/locales/en'
import { zhMessages } from '@shared/locales/zh'

afterEach(() => setUiLanguage('en'))

describe('Chinese menu labels', () => {
  it('translates link actions while preserving their URL and handler', () => {
    setUiLanguage('zh')
    const openUrl = vi.fn()
    const copy = vi.fn()
    const items = urlLinkMenuItems('https://example.com', { openUrl, copy })
    expect(items.map((item) => 'label' in item ? item.label : '')).toEqual(['在浏览器中打开', '', '复制链接'])
    if ('onClick' in items[0]) items[0].onClick()
    expect(openUrl).toHaveBeenCalledWith('https://example.com')
  })

  it('updates module-level menu inventories when the language changes', () => {
    expect(ZONES[0].label).toBe('Left half')
    setUiLanguage('zh')
    expect(ZONES[0].label).toBe('左半部分')
    expect(HIDEABLE_MENU_ITEMS.find((item) => item.id === 'colors')?.label).toBe('颜色')
    setUiLanguage('en')
    expect(ZONES[0].label).toBe('Left half')
  })

  it('translates platform and download menu variants', () => {
    setUiLanguage('zh')
    expect(osRevealLabel('win32')).toBe('在文件资源管理器中显示')
    expect(osRevealLabel('darwin')).toBe('在访达中显示')
    expect(downloadMenuEntries('scp', '/tmp/folder', { dir: true, here: false }).map((item) => item.label))
      .toEqual(['下载文件夹', '下载到…'])
    expect(downloadMenuEntries('http', '/tmp/folder', { dir: true, here: true })[0].label)
      .toBe('下载当前文件夹 (.tar.gz)')
  })

  it('keeps both menu catalogs complete with Chinese translations', () => {
    expect(Object.keys(zhMessages.menuItems).sort()).toEqual(Object.keys(enMessages.menuItems).sort())
    for (const [key, value] of Object.entries(zhMessages.menuItems)) {
      expect(value, key).toMatch(/[\u3400-\u9fff]/)
    }
  })
})
