import type { WechatPost } from '~/types'
import { defineStore } from 'pinia'
import { generatePosts } from '~/mocks/posts'

export const usePostsStore = defineStore('posts', () => {
  const defaultPostLength = 5
  const posts = ref<WechatPost[]>(generatePosts(defaultPostLength))

  function addPost(post?: WechatPost) {
    if (!post) {
      post = generatePosts(1)[0]
    }
    safelyStartViewTransition(() => {
      posts.value.push(post)
    })
  }

  function removePost(post: WechatPost) {
    safelyStartViewTransition(() => {
      posts.value = posts.value.filter(p => p.id !== post.id)
    })
  }

  function resetPosts() {
    posts.value = generatePosts(defaultPostLength)
  }

  function clearPosts() {
    posts.value = []
  }

  return { posts, addPost, removePost, resetPosts, clearPosts }
})
