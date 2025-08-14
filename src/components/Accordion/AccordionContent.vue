<script lang="ts" setup>
interface ItemCtx {
  value: Ref<string>
  open: Ref<boolean>
  disabled: Ref<boolean | undefined>
  toggle: () => void
}
const item = inject<ItemCtx>('accordionItemCtx')
if (!item)
  throw new Error('AccordionContent 需要在 AccordionItem 内使用')

const bodyRef = ref<HTMLElement | null>(null)
function setHeightVar() {
  if (bodyRef.value)
    bodyRef.value.style.setProperty('--accordion-content-height', `${bodyRef.value.scrollHeight}px`)
}
watch(() => item.open.value, () => nextTick(setHeightVar))

onMounted(() => nextTick(setHeightVar))
</script>

<template>
  <Transition
    enter-active-class="overflow-hidden animate-[accordion-down_.25s_ease]"
    leave-active-class="overflow-hidden animate-[accordion-up_.25s_ease]"
    @before-enter="setHeightVar"
    @before-leave="setHeightVar"
  >
    <div
      v-show="item!.open.value"
      ref="bodyRef"
      class="px-4 pb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
      :data-state="item!.open.value ? 'open' : 'closed'"
      role="region"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
@keyframes accordion-down {
  from { height: 0; opacity: 0; }
  to { height: var(--accordion-content-height); opacity: 1; }
}
@keyframes accordion-up {
  from { height: var(--accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}
</style>
