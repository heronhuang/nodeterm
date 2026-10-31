import type { CommandDefinition } from '@shared/keybindings'
import type { TranslateFn } from '@shared/i18n/types'

export function localizedCommandTitle(def: CommandDefinition, t: TranslateFn): string {
  const key = `keybindings.commands.${def.id.replace(/\./g, '_')}`
  const hit = t(key)
  return hit !== key ? hit : def.title
}

export function localizedCommandGroup(group: string, t: TranslateFn): string {
  const slug = group.replace(/\s+/g, '_')
  const key = `keybindings.groups.${slug}`
  const hit = t(key)
  return hit !== key ? hit : group
}
