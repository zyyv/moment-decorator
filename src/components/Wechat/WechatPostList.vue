<script lang='ts' setup>
import { storeToRefs } from 'pinia'

const postsStore = usePostsStore()
const { posts } = storeToRefs(postsStore)
</script>

<template>
  <div space-y-1>
    <WechatPostItem v-for="(post, idx) in posts" :key="idx" :post="post" important:last:b-none />
  </div>
</template>
