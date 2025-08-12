import type { WechatUser } from '../types'

function randomAvatar() {
  const randomNum = Math.random().toString().slice(2, 10)
  return `https://avatars.githubusercontent.com/u/${randomNum}?v=4`
}

function randomName() {
  const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let name = ''
  for (let i = 0; i < 5; i++) {
    name += words.charAt(Math.floor(Math.random() * words.length))
  }
  return name
}

function randomBio() {
  const bios = [
    'Just another developer.',
    'Loves coding and coffee.',
    'Frontend enthusiast.',
    'Backend wizard.',
    'Fullstack ninja.',
  ]
  return bios[Math.floor(Math.random() * bios.length)]
}

function generateUser(count: number) {
  const users: WechatUser[] = []
  for (let i = 0; i < count; i++) {
    users.push({
      name: randomName(),
      avatar: randomAvatar(),
      bio: randomBio(),
    })
  }
  return users
}

export const users: WechatUser[] = generateUser(10)
