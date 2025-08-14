import type { WechatPost } from '~/types'
import { defineStore } from 'pinia'
import { generatePosts } from '~/mocks/posts'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<WechatPost[]>(generatePosts(5))

  function addPost(post: WechatPost) {
    posts.value.push(post)
  }

  function removePost(post: WechatPost) {
    posts.value = posts.value.filter(p => p.id !== post.id)
  }

  return { posts, addPost, removePost }
})
