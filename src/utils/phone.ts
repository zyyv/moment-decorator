export interface PhonePreset {
  /** 机型全称 */
  model: string
  /** 官方标称屏幕尺寸 */
  screenSize: string
  /** CSS 逻辑像素宽度（纵向 Portrait） */
  width: number
  /** CSS 逻辑像素高度（纵向 Portrait） */
  height: number
  /** 典型设备像素比（可选，不同缩放下可能变化） */
  dpr?: number
  /** 备注（刘海 / 打孔 / 折叠等） */
  note?: string
}

// 说明:
// 1. 尺寸均为纵向 (Portrait) 下的 CSS 逻辑像素 viewport（非物理像素）。
// 2. 数值来源于官方文档 / 浏览器模拟器 / 主流社区资料（可能随系统更新微调，仅供参考）。
// 3. 若需横向，可在使用时交换 width / height。
// 4. 可按需继续补充。

export const PhonePresets: Record<string, PhonePreset> = {
  // --- iPhone 系列 ---
  iPhone14ProMax: {
    model: 'iPhone 14 Pro Max',
    screenSize: '6.7"',
    width: 430,
    height: 932,
    dpr: 3,
    note: 'Dynamic Island / OLED',
  },
  iPhone14Pro: {
    model: 'iPhone 14 Pro',
    screenSize: '6.1"',
    width: 393,
    height: 852,
    dpr: 3,
    note: 'Dynamic Island / OLED',
  },
  iPhone14: {
    model: 'iPhone 14 / 13 (同逻辑尺寸)',
    screenSize: '6.1"',
    width: 390,
    height: 844,
    dpr: 3,
  },
  iPhone14Plus: {
    model: 'iPhone 14 Plus',
    screenSize: '6.7"',
    width: 428,
    height: 926,
    dpr: 3,
  },
  iPhoneSE3: {
    model: 'iPhone SE (3rd / 2nd)',
    screenSize: '4.7"',
    width: 375,
    height: 667,
    dpr: 2,
    note: '经典 Home 键',
  },
  iPhone12Mini: {
    model: 'iPhone 12 / 13 mini',
    screenSize: '5.4"',
    width: 360,
    height: 780,
    dpr: 3,
  },
  iPadPro129: {
    model: 'iPad Pro 12.9" (纵向)',
    screenSize: '12.9"',
    width: 1024,
    height: 1366,
    dpr: 2,
    note: 'iPadOS 默认 DPR=2',
  },
  iPadMini6: {
    model: 'iPad mini 6',
    screenSize: '8.3"',
    width: 744,
    height: 1133,
    dpr: 2,
  },

  // --- Android / Pixel 系列 ---
  Pixel8Pro: {
    model: 'Pixel 8 Pro',
    screenSize: '6.7"',
    width: 412,
    height: 923,
    dpr: 3,
    note: '近似值',
  },
  Pixel7: {
    model: 'Pixel 7',
    screenSize: '6.3"',
    width: 412,
    height: 915,
    dpr: 3,
  },
  Pixel5: {
    model: 'Pixel 5',
    screenSize: '6.0"',
    width: 393,
    height: 851,
    dpr: 3,
  },

  // --- Samsung / 其它主流 ---
  GalaxyS24Ultra: {
    model: 'Galaxy S24 Ultra',
    screenSize: '6.8"',
    width: 480,
    height: 1066,
    dpr: 3.5,
    note: '近似逻辑 viewport',
  },
  GalaxyS23: {
    model: 'Galaxy S23',
    screenSize: '6.1"',
    width: 393,
    height: 915,
    dpr: 3,
  },
  GalaxyZFold5Outer: {
    model: 'Galaxy Z Fold5 外屏',
    screenSize: '6.2"',
    width: 384,
    height: 852,
    dpr: 3,
    note: '折叠外屏',
  },
  GalaxyZFold5Inner: {
    model: 'Galaxy Z Fold5 内屏(纵向)',
    screenSize: '7.6"',
    width: 768,
    height: 884,
    dpr: 3,
    note: '折叠展开',
  },

  // --- 常见通用基线尺寸 ---
  SmallPhone: {
    model: '通用小屏 360x640',
    screenSize: '~5"',
    width: 360,
    height: 640,
    dpr: 2,
    note: '旧款 / 入门机参考',
  },
  MediumPhone: {
    model: '通用中屏 375x812',
    screenSize: '~5.8"',
    width: 375,
    height: 812,
    dpr: 3,
    note: 'iPhone X 基线',
  },
  LargePhone: {
    model: '通用大屏 414x896',
    screenSize: '~6.5"',
    width: 414,
    height: 896,
    dpr: 3,
  },
}

export type PhonePresetKey = keyof typeof PhonePresets

/**
 * 获取一个设备预设（带类型提示）。
 */
export function getPhonePreset(key: PhonePresetKey): PhonePreset {
  return PhonePresets[key]
}
