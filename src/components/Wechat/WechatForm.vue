<script lang="ts" setup>
import type { WechatPost, WechatUser } from '~/types'

const props = defineProps<{
  modelValue?: WechatPost
}>()

const emit = defineEmits<{
  'update:modelValue': [value: WechatPost]
  'submit': [value: WechatPost]
}>()

function defaultUser(): WechatUser {
  return {
    name: 'Chris',
    avatar: 'https://avatars.githubusercontent.com/u/42139754?v=4',
    bio: 'Regardless of the past, do not ask the future.',
  }
}

function defaultPost(): WechatPost {
  return {
    id: crypto.randomUUID().slice(0, 8), // Generate a random ID
    author: defaultUser(),
    content: '',
    createdAt: new Date(),
    images: [],
  }
}

const post = reactive<WechatPost>(props.modelValue ? structuredClone(props.modelValue) : defaultPost())

watch(
  () => props.modelValue,
  (val) => {
    if (val)
      Object.assign(post, structuredClone(val))
  },
)

watch(
  () => post,
  () => emit('update:modelValue', post),
  { deep: true },
)

// datetime-local helpers
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
          <input v-model="post.author.name" class="md:col-start-1 md:col-end-3 px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none" placeholder="昵称">
        </div>
        <div class="grid gap-2 md:grid-cols-[1fr_auto] items-center">
          <label class="text-sm op-80">头像</label>
          <div class="flex items-center gap-2">
            <input v-model="post.author.avatar" class="flex-1 px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none" placeholder="头像 URL">
            <label class="px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 cursor-pointer text-sm">选择文件
              <input type="file" accept="image/*" class="hidden" @change="onAvatarFile">
            </label>
          </div>
        </div>
        <div>
          <label class="text-sm op-80">签名</label>
          <textarea v-model="post.author.bio" rows="3" class="w-full mt-1 px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none" placeholder="个性签名" />
        </div>
      </fieldset>

      <!-- Content -->
      <fieldset class="space-y-2">
        <legend class="text-basecolor fw-600">
          内容
        </legend>
        <textarea v-model="post.content" rows="6" class="w-full px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none" placeholder="说点什么..." />
      </fieldset>

      <!-- Time -->
      <fieldset class="space-y-2">
        <legend class="text-basecolor fw-600">
          时间
        </legend>
        <input v-model="createdAtLocal" type="datetime-local" class="px-3 py-2 rd border border-dark-700 dark:border-light-700 border-op-15 bg-transparent text-basecolor outline-none">
      </fieldset>

      <!-- Images -->
      <fieldset class="space-y-3">
        <legend class="text-basecolor fw-600">
          图片
        </legend>
        <div class="flex items-center gap-2">
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
            <button type="button" class="absolute top-1 right-1 size-6 rd-full grid place-items-center bg-dark/60 text-white hover:bg-dark/80" @click="removeImage(i)">
              <div class="i-hugeicons:xmark" />
            </button>
          </div>
        </div>
      </fieldset>

      <div class="pt-2">
        <button type="submit" class="px-4 py-2 rd bg-wechat-name text-white hover:bg-wechat-name/90 active:scale-98 transition">
          生成
        </button>
      </div>
    </form>
  </div>
</template>
