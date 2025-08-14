<script lang='ts' setup>
import type { WechatPost } from '~/types'

defineProps<{
  post: WechatPost
}>()
</script>

<template>
  <div px-5 flex gap-4 py-2 b-b="~ light-800 op-50 dark:op-5">
    <img
      class="size-11 rounded-md"
      :src="post.author.avatar"
      alt="Avatar"
      loading="lazy"
      decoding="async"
    >
    <div flex-1>
      <h5 text-md fw-400 text-wechat-name>
        {{ post.author.name }}
      </h5>
      <WechatTextContent mt-2 :post />
      <WechatImages v-if="post.images.length" mt-2 :post />
      <WechatStatusBar :post mt-2 />
    </div>
  </div>
</template>
