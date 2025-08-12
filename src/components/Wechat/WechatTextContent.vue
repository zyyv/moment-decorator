<script lang='ts' setup>
import type { WechatPost } from '~/types'

defineProps<{ post: WechatPost }>()

const contentRef = ref<HTMLElement | null>(null)
const showFullText = ref(false)
const isShowButton = ref(false)
const maxHeight = 22 * 5 // 5 lines

onMounted(() => {
  if (contentRef.value) {
    const { height } = contentRef.value.getBoundingClientRect()
    isShowButton.value = height > maxHeight
  }
})
</script>

<template>
  <div>
    <p ref="contentRef" text="md basecolor" :style="{ maxHeight: (isShowButton && !showFullText) ? `${maxHeight / 16}rem` : 'none', overflow: 'hidden' }">
      {{ post.content }}
    </p>
    <button v-if="isShowButton" mt-1 text="md wechat-name" @click="showFullText = !showFullText">
      {{ showFullText ? '收起' : '全文' }}
    </button>
  </div>
</template>
