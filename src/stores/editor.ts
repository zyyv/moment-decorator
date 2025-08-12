import type { WechatPost } from '~/types'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const current = ref<WechatPost | undefined>(undefined)

  function setCurrent(value?: WechatPost) {
    current.value = value
  }

  function reset() {
    current.value = undefined
  }

  return { current, setCurrent, reset }
})
