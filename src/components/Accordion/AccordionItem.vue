<script lang="ts" setup>
const props = defineProps<{ value: string, disabled?: boolean }>()

interface Ctx {
  type: Ref<'single' | 'multiple'>
  collapsible: Ref<boolean>
  isItemOpen: (v: string) => boolean
  toggleItem: (v: string) => void
}
const ctx = inject<Ctx>('accordionRootCtx')
if (!ctx)
  throw new Error('AccordionItem 需要在 Accordion 根组件内使用')

const open = computed(() => ctx.isItemOpen(props.value))

provide('accordionItemCtx', {
  value: toRef(props, 'value'),
  open,
  disabled: toRef(props, 'disabled'),
  toggle: () => ctx.toggleItem(props.value),
})
</script>

<template>
  <div class="group/acc-item flex flex-col">
    <slot />
  </div>
</template>

<style scoped>
</style>
