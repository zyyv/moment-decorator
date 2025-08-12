import type { WechatPost } from '~/types'
import { users } from './user'

function randomPostContent() {
  const contents = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    '今天天气很好，适合出去散步。',
    '早上喝了一杯咖啡，精神好多了。',
    '下班后和朋友一起去吃了火锅。',
    '周末打算去看一场电影，放松一下。',
    '最近在学习做饭，尝试了新菜谱。',
    '晚上散步时遇到了很久不见的同学。',
    '家里的猫今天特别粘人，一直跟着我。',
    '今天加班到很晚，有点累。',
    '午休时间看了一会儿书，感觉很充实。',
    '早上地铁上人很多，差点迟到。',
    '下雨天最适合在家看剧了。',
  ]

  // 随机选择多行内容返回
  const randomLines = Math.floor(Math.random() * 8) + 1
  const startIndex = Math.floor(Math.random() * (contents.length - randomLines))
  return contents.slice(startIndex, startIndex + randomLines).join('\n')
}

function randomDate() {
  const start = new Date(2020, 0, 1)
  const end = new Date()
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const ImagesList = [
  'https://images.unsplash.com/photo-1754653099086-3bddb9346d37',
  'https://images.unsplash.com/photo-1754597302822-4b96f3442d3f',
  'https://images.unsplash.com/photo-1754764987594-2236e7736115',
  'https://images.unsplash.com/photo-1754079132962-2f6c62f14d33',
  'https://images.unsplash.com/photo-1734760381824-f52cb9960b9e',
  'https://images.unsplash.com/photo-1743595738944-8652106902c4',
  'https://images.unsplash.com/photo-1744148069790-ff3b26a9a034',
  'https://images.unsplash.com/photo-1744125156184-e0d7e0bc04c4',
  'https://images.unsplash.com/flagged/photo-1563692384431-67fcdc19ba94',
  'https://images.unsplash.com/photo-1754756736142-b5251258b167',
  'https://plus.unsplash.com/premium_photo-1754781493808-e575e4474ee9',
  'https://images.unsplash.com/photo-1754842382582-b643e9af5a27',
  'https://images.unsplash.com/photo-1754799399805-da0178249638',
  'https://images.unsplash.com/photo-1754079132679-d9bbe1ba79cf',
  'https://plus.unsplash.com/premium_photo-1753982281666-9f0a17331d66',
  'https://images.unsplash.com/photo-1754430544331-0b2d98edaf2a',
]

function randomImages() {
  // 0 - 9
  const count = Math.floor(Math.random() * 10)
  return Array.from({ length: count }, () => ImagesList[Math.floor(Math.random() * ImagesList.length)])
}

export const posts: WechatPost[] = users.map(user => ({
  id: crypto.randomUUID().slice(0, 8), // Generate a random ID
  author: user,
  content: randomPostContent(),
  createdAt: randomDate(),
  images: randomImages(),
})).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
