<script setup lang="ts">
import { storeToRefs } from 'pinia'

// Posts store
const postsStore = usePostsStore()
const { posts } = storeToRefs(postsStore)

// 弹窗控制
const showModal = ref(false)
const selectedPost = ref<any>(null)

function openModal(post: any) {
  selectedPost.value = post
  showModal.value = true
}
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2 h-[calc(100vh-4.5rem)]">
    <!-- 左侧：表单 + 列表 -->
    <section h-full of-auto relative class="no-scrollbar space-y-4" b="~ dashed gray/30">
      <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/5 dark:bg-dark/5 flex items-center justify-between px-4 py-2 b-b b-dark/10 dark:b-light/5">
        <h2 class="text-lg font-semibold">
          Posts ({{ posts.length }})
        </h2>
        <div flex="~ items-center gap-2">
          <button class="text-sm op-70 hover:op-100 cursor-pointer" @click="postsStore.resetPosts">
            <div i-hugeicons:refresh />
          </button>
          <button class="text-sm op-70 hover:op-100 cursor-pointer" @click="postsStore.clearPosts">
            <div i-hugeicons:cancel-01 />
          </button>
        </div>
      </div>
      <div class="p-4">
        <div v-if="!posts.length" class="p-6 text-center text-sm op-60">
          暂无内容，先生成一条吧~
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="p in posts"
            :key="p.id"
            :view-transition-name="`post-${p.id}`"
            class="group cursor-pointer !py-3 px-4 flex items-center gap-3 text-left hover:bg-gray/6 dark:hover:bg-white/5 rounded-lg transition-opacity duration-3000"
          >
            <div flex="~ items-center gap-2" flex-shrink-0>
              <img
                :src="p.author.avatar" class="size-12 rd-full object-cover" loading="lazy"
                decoding="async" alt="avatar"
              >
              <div class="flex flex-col gap-2">
                <span class="text-sm fw-600 text-wechat-name">{{ p.author.name }}</span>
                <span class="text-[10px] op-60">{{ useDateFormat(p.createdAt, 'YYYY-MM-DD HH:mm').value }}</span>
              </div>
            </div>
            <p class="text-sm flex-1 line-clamp-2 op-70 whitespace-pre-line">
              {{ p.content }}
            </p>
            <div op-0 group-hover:op-100 transition-opacity @click.stop="postsStore.removePost(p)">
              <div class="i-hugeicons:cancel-01 text-base ml-2 op-80" />
            </div>
          </div>
          <hr>
          <!-- <div
            v-for="p in posts"
            :key="p.id"
            class="group post cursor-pointer !py-3 px-4 flex items-center gap-3 text-left hover:bg-gray/6 dark:hover:bg-white/5 rounded-lg"
            @click="openModal(p)"
          >
            <div flex="~ items-center gap-2" flex-shrink-0>
              <img
                :src="p.author.avatar" class="size-12 rd-full object-cover" loading="lazy"
                decoding="async" alt="avatar"
              >
              <div class="flex flex-col gap-2">
                <span class="text-sm fw-600 text-wechat-name">{{ p.author.name }}</span>
                <span class="text-[10px] op-60">{{ useDateFormat(p.createdAt, 'YYYY-MM-DD HH:mm').value }}</span>
              </div>
            </div>
            <p class="text-sm flex-1 line-clamp-2 op-70 whitespace-pre-line">
              {{ p.content }}
            </p>
            <div op-0 group-hover:op-100 transition-opacity @click.stop="postsStore.removePost(p)">
              <div class="i-hugeicons:cancel-01 text-base ml-2 op-80" />
            </div>
          </div> -->
        </div>
        <div>
          <div class="i-hugeicons:add-01 text-base ml-2 op-60" @click="() => postsStore.addPost()" />
        </div>
      </div>
    </section>

    <!-- 右侧：手机预览 -->
    <section h-full of-auto no-scrollbar b="~ dashed green:50" bg-green bg-op-10 dark:bg-op-5 rd-xl>
      <Emulator />
    </section>

    <!-- 性能监控 -->
    <PerformanceMonitor />

    <!-- 弹窗 -->
    <Modal v-model="showModal" title="编辑朋友圈">
      <WechatForm v-if="selectedPost" :model-value="selectedPost" />
    </Modal>
  </div>
</template>

<style scoped>
.post {
  /* height: auto;
  opacity: 1;
  transition: opacity 0.5s, height 0.5s;

  @starting-style{
    height: 0;
    opacity: 0;
  } */
}
</style>
