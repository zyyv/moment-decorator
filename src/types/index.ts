export interface WechatUser {
  name: string
  avatar: string
  bio: string
}

export interface WechatPost {
  author: WechatUser
  content: string
  createdAt: Date
  images: string[]
}
