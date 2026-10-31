import { describe, expect, it } from 'vitest'
import { createTranslator } from './translate'

describe('createTranslator', () => {
  it('looks up nested keys in the active locale', () => {
    const t = createTranslator('zh')
    expect(t('common.ok')).toBe('确定')
    expect(t('settings.behavior.title')).toBe('行为')
  })

  it('interpolates {name} placeholders', () => {
    const t = createTranslator('zh')
    expect(t('welcome.noMatch', { query: 'foo' })).toBe('没有与「foo」匹配的已关闭项目。')
    expect(t('projectLimit.openTitle', { open: 2, limit: 3 })).toBe('已打开 2 / 3 个免费项目')
  })

  it('falls back to English when a zh key is missing', () => {
    const t = createTranslator('zh')
    expect(t('common.testOnlyFallback')).toBe('English fallback string')
  })

  it('returns the key when missing in both catalogs', () => {
    const t = createTranslator('en')
    expect(t('totally.missing.key')).toBe('totally.missing.key')
  })
})
