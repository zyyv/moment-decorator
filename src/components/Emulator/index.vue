<script lang="ts" setup>
import ScaleControl from './ScaleControl.vue'

const scale = ref(0.7)
</script>

<template>
  <div relative h-full of-hidden>
    <ScaleControl v-model:scale="scale" absolute top-2 right-2 z-10 />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <WechatMoment :scale="scale" />
    </div>
  </div>
</template>
