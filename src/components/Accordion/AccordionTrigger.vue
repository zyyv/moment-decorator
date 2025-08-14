<script lang="ts" setup>
interface ItemCtx {
  value: Ref<string>
  open: Ref<boolean>
  disabled: Ref<boolean | undefined>
  toggle: () => void
}
const item = inject<ItemCtx>('accordionItemCtx')
if (!item)
  throw new Error('AccordionTrigger 需要在 AccordionItem 内使用')

function onClick() {
  if (item!.disabled?.value)
    return
  item!.toggle()
}
</script>

<template>
  <button
    type="button"
    :disabled="item!.disabled?.value"
    class="flex items-center w-full justify-between text-left px-4 py-3 font-medium select-none outline-none cursor-pointer transition-colors duration-200 @hover:bg-gray/6 disabled:cursor-not-allowed"
    :class="item!.open.value ? 'text-basecolor' : 'text-gray-700 dark:text-gray-200'"
    :aria-expanded="item!.open.value"
    :data-state="item!.open.value ? 'open' : 'closed'"
    @click="onClick"
  >
    <span class="flex-1"><slot /></span>
    <span class="i-hugeicons:chevron-down-small text-xl transition-transform duration-300" :class="item!.open.value ? 'rotate-180' : ''" />
  </button>
</template>
