export interface WechatUser {
  name: string
  avatar: string
  bio: string
}

export interface WechatPost {
  id: string
  author: WechatUser
  content: string
  createdAt: Date
  images: string[]
}
