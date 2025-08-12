<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEditorStore } from '~/stores/editor'

const editor = useEditorStore()
const { current } = storeToRefs(editor)
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <section>
      <WechatForm v-model="current" />
    </section>

    <section>
      <Emulator />
    </section>
  </div>
</template>
