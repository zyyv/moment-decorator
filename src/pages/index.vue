<script setup lang="ts">
import { storeToRefs } from 'pinia'

// Posts store
const postsStore = usePostsStore()
const { posts } = storeToRefs(postsStore)
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2 h-[calc(100vh-4.5rem)]">
    <!-- 左侧：表单 + 列表 -->
    <section h-full of-auto relative class="no-scrollbar space-y-4" b="~ dashed gray/30">
      <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/5 dark:bg-dark/5 flex items-center justify-between px-4 py-2 b-b b-dark/10 dark:b-light/5">
        <h2 class="text-lg font-semibold">
          Posts ({{ posts.length }})
        </h2>
        <button class="text-xs op-70 hover:op-100" @click="postsStore.posts = [] as any">
          清空
        </button>
      </div>
      <div class="p-4">
        <div v-if="!posts.length" class="p-6 text-center text-sm op-60">
          暂无内容，先生成一条吧~
        </div>
        <Accordion v-else type="multiple" class="space-y-3 bg-transparent divide-y-0">
          <AccordionItem
            v-for="p in posts"
            :key="p.id"
            :value="p.id"
          >
            <AccordionTrigger class="!no-underline !py-3 px-4 flex items-start gap-3 text-left">
              <div flex="~ items-center gap-2">
                <img
                  :src="p.author.avatar" class="size-12 rd-full object-cover" loading="lazy"
                  decoding="async" alt="avatar"
                >
                <div class="flex flex-col gap-2">
                  <span class="text-sm fw-600 text-wechat-name">{{ p.author.name }}</span>
                  <span class="text-[10px] op-60">{{ useDateFormat(p.createdAt, 'YYYY-MM-DD HH:mm').value }}</span>
                </div>
              </div>
              <p class="mt-4 text-sm line-clamp-2 op-70 whitespace-pre-line">
                {{ p.content }}
              </p>
              <div class="i-hugeicons:chevron-down text-base ml-2 op-60 group-data-[state=open]:rotate-180 transition-transform" />
            </AccordionTrigger>
            <AccordionContent class="p-0 bg-transparent">
              <WechatForm :model-value="p" read-only class="!shadow-none !bg-transparent" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- 右侧：手机预览 -->
    <section h-full of-auto no-scrollbar b="~ dashed green:50" bg-green bg-op-10 dark:bg-op-5 rd-xl>
      <Emulator />
    </section>
  </div>
</template>
