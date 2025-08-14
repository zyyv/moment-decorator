<script setup lang="ts">
import type { WechatPost } from '~/types'
import BackgroundImageDefault from '~/assets/images/background.jpg'

withDefaults(defineProps<{
  scale?: number
  post?: WechatPost
}>(), {
  scale: 1,
})
</script>

<template>
  <Phone :scale>
    <div w-full>
      <!-- Mask -->
      <div w-full h-75 bg-cover :style="{ backgroundImage: `url(${BackgroundImageDefault})` }" />

      <!-- Avatar -->
      <div px-5>
        <div flex gap-3 mt--8>
          <img
            class="size-14 rounded-lg"
            src="https://avatars.githubusercontent.com/u/42139754?v=4"
            alt="Avatar"
          >
          <span text-lg fw-600 text-basecolor>Chris</span>
        </div>
        <p mt-3 text-xs text-basecolor op-64>
          Regardless of the past, do not ask the future.
        </p>
      </div>

      <!-- Moments -->
      <div mt-6>
        <WechatPostItem v-if="post" :post="post" />
        <WechatPostList v-else />
      </div>
    </div>
  </Phone>
</template>
