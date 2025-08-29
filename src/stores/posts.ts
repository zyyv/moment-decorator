import type { WechatPost } from '~/types'
import { defineStore } from 'pinia'
import { generatePosts } from '~/mocks/posts'

export const usePostsStore = defineStore('posts', () => {
  const defaultPostLength = 5
  const posts = ref<WechatPost[]>(generatePosts(defaultPostLength))

  function addPost(post: WechatPost) {
    posts.value.push(post)
  }

  function removePost(post: WechatPost) {
    posts.value = posts.value.filter(p => p.id !== post.id)
  }

  function resetPosts() {
    posts.value = generatePosts(defaultPostLength)
  }

  function clearPosts() {
    posts.value = []
  }

  return { posts, addPost, removePost, resetPosts, clearPosts }
})
