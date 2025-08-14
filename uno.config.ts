import { symbols } from '@unocss/core'
import { defineConfig, presetAttributify, presetIcons, presetWind4, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      wechat: {
        name: '#6a7a96',
      },
    },
    text: {
      md: {
        fontSize: '0.9375rem',
        lineHeight: '1.375rem',
      },
    },
  },
  rules: [
    [
      'no-scrollbar',
      [
        {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        },
        {
          [symbols.selector]: (s: string) => `${s}::-webkit-scrollbar`,
          display: 'none',
        } as any,
      ],
      { autocomplete: 'no-(scrollbar)' },
    ],
  ],
  shortcuts: {
    'text-basecolor': 'text-dark-700 dark:text-light-700',
    'fill-basecolor': 'fill-dark-700 dark:fill-light-700',
    'stroke-basecolor': 'stroke-dark-700 dark:stroke-light-700',
    'bg-basecolor': 'bg-light dark:bg-dark',
  },
})
