<script lang='ts' setup>
import type { WechatPost } from '~/types'

defineProps<{
  post: WechatPost
}>()
</script>

<template>
  <div flex justify-between items-center>
    <span text-sm text-gray-500>{{ useTimeAgo(post.createdAt) }}</span>
    <div flex justify-center items-center h-4.25 w-7 gap-1 class="bg-wechat-name/10 " rd>
      <span inline-block size-1 rd-full bg-wechat-name bg-op-80 />
      <span inline-block size-1 rd-full bg-wechat-name bg-op-80 />
    </div>
  </div>
</template>
