import type { TranslateParams, UiLanguage } from './types'
import { enMessages } from '../locales/en'
import { zhMessages } from '../locales/zh'

type MessageTree = Record<string, string | MessageTree>

const CATALOGS: Record<UiLanguage, MessageTree> = {
  en: enMessages,
  zh: zhMessages
}

function lookup(tree: MessageTree, key: string): string | undefined {
  const parts = key.split('.')
  let node: string | MessageTree | undefined = tree
  for (const part of parts) {
    if (node == null || typeof node === 'string') return undefined
    node = node[part]
  }
  return typeof node === 'string' ? node : undefined
}

function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const v = params[name]
    return v === undefined ? `{${name}}` : String(v)
  })
}

export function createTranslator(locale: UiLanguage): (key: string, params?: TranslateParams) => string {
  const catalog = CATALOGS[locale]
  const fallback = CATALOGS.en
  return (key, params) => {
    const hit = lookup(catalog, key) ?? lookup(fallback, key)
    if (hit === undefined) return key
    return interpolate(hit, params)
  }
}
