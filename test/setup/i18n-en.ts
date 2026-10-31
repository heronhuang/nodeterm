// TEST-ONLY — product default UI language is zh; most unit tests assert English copy.
import { beforeEach } from 'vitest'
import { setUiLanguage } from '../../src/renderer/i18n/runtime'

setUiLanguage('en')
beforeEach(() => {
  setUiLanguage('en')
})
