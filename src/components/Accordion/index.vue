<script lang="ts" setup>
/**
 * Shadcn 风格 Accordion Root
 * Props:
 *  - type: 'single' | 'multiple' (默认 single)
 *  - collapsible: boolean (single 模式下是否允许点击已展开项收起，默认 true)
 *  - modelValue: string | string[] | undefined
 *  - defaultValue: string | string[] | undefined (非受控初始值)
 */

const props = withDefaults(defineProps<{
  type?: 'single' | 'multiple'
  collapsible?: boolean
  modelValue?: string | string[]
  defaultValue?: string | string[]
}>(), {
  type: 'single',
  collapsible: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[] | undefined): void
  (e: 'change', value: string | string[] | undefined): void
}>()

const isControlled = computed(() => props.modelValue !== undefined)
const inner = ref<string | string[] | undefined>(props.modelValue ?? props.defaultValue)

watch(() => props.modelValue, (val) => {
  if (isControlled.value)
    inner.value = val
})

function toggleItem(value: string) {
  if (props.type === 'multiple') {
    const list = Array.isArray(inner.value) ? [...inner.value] : []
    const idx = list.indexOf(value)
    if (idx > -1)
      list.splice(idx, 1)
    else
      list.push(value)
    update(list)
  }
  else {
    const current = inner.value as string | undefined
    if (current === value) {
      if (props.collapsible)
        update(undefined)
    }
    else {
      update(value)
    }
  }
}

function isItemOpen(value: string) {
  if (props.type === 'multiple')
    return Array.isArray(inner.value) && inner.value.includes(value)
  return inner.value === value
}

function update(v: string | string[] | undefined) {
  if (!isControlled.value)
    inner.value = v
  emit('update:modelValue', v)
  emit('change', v)
}

provide('accordionRootCtx', {
  type: toRef(props, 'type'),
  collapsible: toRef(props, 'collapsible'),
  isItemOpen,
  toggleItem,
})
</script>

<template>
  <div class="flex flex-col divide-y divide-gray/10 dark:divide-white/5">
    <slot />
  </div>
</template>
