<script lang='ts' setup>
import { storeToRefs } from 'pinia'

const postsStore = usePostsStore()
const { posts } = storeToRefs(postsStore)

// 虚拟滚动优化
const visiblePosts = computed(() => {
  // 只渲染前 20 个帖子，避免 DOM 节点过多
  return posts.value.slice(0, 20)
})
</script>

<template>
  <div space-y-1>
    <WechatPostItem
      v-for="post in visiblePosts"
      :key="post.id"
      :post="post"
      important:last:b-none
    />
    <div v-if="posts.length > 20" class="p-4 text-center text-sm op-60">
      显示前 20 条，共 {{ posts.length }} 条
    </div>
  </div>
</template>
