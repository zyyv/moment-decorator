<script lang="ts" setup>
import type { WechatPost, WechatUser } from '~/types'
import { deepClone } from '~/utils/clone'

const props = withDefaults(defineProps<{
  modelValue?: WechatPost
  readOnly?: boolean
}>(), {
  readOnly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: WechatPost]
  'submit': [value: WechatPost]
}>()

// 初始化：若未提供 modelValue，则内部生成一个空白结构（不再使用 defaultPost 方法）
const post = reactive<WechatPost>(props.modelValue
  ? deepClone(props.modelValue)
  : {
      id: crypto.randomUUID().slice(0, 8),
      author: {
        name: 'Chris',
        avatar: 'https://avatars.githubusercontent.com/u/42139754?v=4',
        bio: 'Regardless of the past, do not ask the future.',
      } as WechatUser,
      content: '',
      createdAt: new Date(),
      images: [],
    },
)

watch(
  () => props.modelValue,
  (val) => {
    if (val)
      Object.assign(post, deepClone(val))
  },
)

// 使用防抖优化表单更新性能
const debouncedEmit = useDebounceFn(() => {
  emit('update:modelValue', post)
}, 100)

watch(
  () => post,
  () => debouncedEmit(),
  { deep: true, flush: 'post' }, // 使用 flush: 'post' 减少更新频率
)

// 归一化 createdAt（防止为字符串）
watch(
  () => post.createdAt,
  (v) => {
    if (!(v instanceof Date)) {
      const t = new Date(v as any)
      post.createdAt = Number.isNaN(t.getTime()) ? new Date() : t
    }
  },
  { immediate: true },
)

// datetime-local 双向绑定
const createdAtLocal = computed({
  get() {
    const d = post.createdAt ?? new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const yyyy = d.getFullYear()
    const MM = pad(d.getMonth() + 1)
    const dd = pad(d.getDate())
    const hh = pad(d.getHours())
    const mm = pad(d.getMinutes())
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`
  },
  set(v: string) {
    const t = new Date(v)
    if (!Number.isNaN(t.getTime()))
      post.createdAt = t
  },
})

// images upload/urls
const urlInput = ref('')
const revokeSet = new Set<string>()

function addImageUrl() {
  const url = urlInput.value.trim()
  if (!url)
    return
  post.images.push(url)
  urlInput.value = ''
}

function onFiles(e: Event) {
  const input = e.target as HTMLInputElement
  const files = input.files
  if (!files || !files.length)
    return
  Array.from(files).forEach((file) => {
    const url = URL.createObjectURL(file)
    revokeSet.add(url)
    post.images.push(url)
  })
  // reset so selecting the same file again triggers change
  input.value = ''
}

function removeImage(i: number) {
  const url = post.images[i]
  post.images.splice(i, 1)
  if (revokeSet.has(url)) {
    URL.revokeObjectURL(url)
    revokeSet.delete(url)
  }
}

function clearImages() {
  post.images.forEach((u) => {
    if (revokeSet.has(u))
      URL.revokeObjectURL(u)
  })
  revokeSet.clear()
  post.images = []
}

function onAvatarFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file)
    return
  const url = URL.createObjectURL(file)
  post.author.avatar = url
}

onBeforeUnmount(() => {
  clearImages()
})

function submit() {
  emit('submit', post)
}
</script>

<template>
  <div class="w-full">
    <!-- Form -->
    <form class="space-y-4 p-4 rd-2xl bg-light-700 bg-op-80 dark:bg-dark-900 dark:bg-op-40 shadow-sm" @submit.prevent="submit">
      <!-- Author -->
      <fieldset class="space-y-2">
        <legend class="text-basecolor fw-600">
          作者
        </legend>
        <div class="grid gap-2 md:grid-cols-[1fr_auto] items-center">
          <label class="text-sm op-80">昵称</label>
          <input v-model="post.author.name" :disabled="readOnly" :readonly="readOnly" class="md:col-start-1 md:col-end-3 px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none disabled:op-60" placeholder="昵称">
        </div>
        <div class="grid gap-2 md:grid-cols-[1fr_auto] items-center">
          <label class="text-sm op-80">头像</label>
          <div class="flex items-center gap-2">
            <input v-model="post.author.avatar" :disabled="readOnly" :readonly="readOnly" class="flex-1 px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none disabled:op-60" placeholder="头像 URL">
            <label v-if="!readOnly" class="px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 cursor-pointer text-sm">选择文件
              <input type="file" accept="image/*" class="hidden" @change="onAvatarFile">
            </label>
          </div>
        </div>
        <div>
          <label class="text-sm op-80">签名</label>
          <textarea v-model="post.author.bio" rows="3" :disabled="readOnly" :readonly="readOnly" class="w-full mt-1 px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none disabled:op-60" placeholder="个性签名" />
        </div>
      </fieldset>

      <!-- Content -->
      <fieldset class="space-y-2">
        <legend class="text-basecolor fw-600">
          内容
        </legend>
        <textarea v-model="post.content" rows="6" :disabled="readOnly" :readonly="readOnly" class="w-full px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none disabled:op-60" placeholder="说点什么..." />
      </fieldset>

      <!-- Time -->
      <fieldset class="space-y-2">
        <legend class="text-basecolor fw-600">
          时间
        </legend>
        <input v-model="createdAtLocal" type="datetime-local" :disabled="readOnly" :readonly="readOnly" class="px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none disabled:op-60">
      </fieldset>

      <!-- Images -->
      <fieldset class="space-y-3">
        <legend class="text-basecolor fw-600">
          图片
        </legend>
        <div v-if="!readOnly" class="flex items-center gap-2">
          <input v-model="urlInput" class="flex-1 px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none" placeholder="图片 URL">
          <button type="button" class="px-3 py-2 rd bg-dark-700 bg-op-10 dark:bg-light-700 dark:bg-op-10 text-basecolor hover:bg-op-15 active:scale-97 transition" @click="addImageUrl">
            添加
          </button>
          <label class="px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 cursor-pointer text-sm">上传
            <input type="file" accept="image/*" multiple class="hidden" @change="onFiles">
          </label>
          <button v-if="post.images.length" type="button" class="px-3 py-2 rd text-red-600 hover:bg-red-600/10 active:scale-97 transition" @click="clearImages">
            清空
          </button>
        </div>
        <div v-if="post.images.length" class="grid grid-cols-3 gap-2 pt-1">
          <div v-for="(img, i) in post.images" :key="`${img}-${i}`" class="relative">
            <img :src="img" alt="" class="w-full aspect-square object-cover rd">
            <button v-if="!readOnly" type="button" class="absolute top-1 right-1 size-6 rd-full grid place-items-center bg-dark/60 text-white hover:bg-dark/80" @click="removeImage(i)">
              <div class="i-hugeicons:xmark" />
            </button>
          </div>
        </div>
      </fieldset>
      <div v-if="!readOnly" class="pt-2">
        <button type="submit" class="px-4 py-2 rd bg-wechat-name text-white hover:bg-wechat-name/90 active:scale-98 transition">
          生成
        </button>
      </div>
    </form>
  </div>
</template>
