<script lang='ts' setup>
import type { WechatPost } from '~/types'

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
</script>

<template>
  <div w-full grid="~ gap-1" :class="gridCols">
    <img
      v-for="(image, index) in props.post.images"
      :key="index"
      :src="image"
      loading="lazy"
      decoding="async"
      :fetchpriority="index === 0 ? 'high' : 'auto'"
      object-cover
      :class="colNum > 1 ? 'aspect-square' : 'max-w-60%'"
    >
  </div>
</template>
