<script lang='ts' setup>
import type { WechatPost } from '~/types'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps<{
  post: WechatPost
}>()

const gridCols = computed(() => {
  const length = props.post.images.length
  if (length === 1)
    return 'grid-cols-1'
  if (length === 2)
    return 'grid-cols-2'
  if (length === 3)
    return 'grid-cols-3'
  if (length <= 4)
    return 'grid-cols-2'
  return 'grid-cols-3'
})
const colNum = computed(() => Number(gridCols.value.split('-')[2]) || 1)
const el = ref()
const images = computed({
  get: () => props.post.images,
  set: (value) => {
    // eslint-disable-next-line vue/no-mutating-props
    props.post.images = value
  },
})
</script>

<template>
  <VueDraggable
    ref="el"
    v-model="images"
    :animation="150"
    class="w-full grid grid-gap-1"
    :class="gridCols"
  >
    <img
      v-for="(image, index) in post.images"
      :key="`${image}-${index}`"
      :src="image"
      loading="lazy"
      decoding="async"
      :fetchpriority="index === 0 ? 'high' : 'low'"
      object-cover
      :class="colNum > 1 ? 'aspect-square' : 'max-w-60%'"
      :style="{ 'content-visibility': 'auto' }"
    >
  </VueDraggable>
</template>
