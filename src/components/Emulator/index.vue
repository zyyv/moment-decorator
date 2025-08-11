<script lang="ts" setup>
import type { PhonePresetKey } from '../../utils/phone'
import { computed, ref } from 'vue'
import { PhonePresets } from '../../utils/phone'
import Phone from './Phone.vue'

// 当前使用的预设名；'custom' 表示手动拖拽后的自定义尺寸
const presetName = ref<PhonePresetKey | 'custom'>('iPhone14Pro')

// 尺寸（逻辑像素）
const width = ref(PhonePresets.iPhone14Pro.width)
const height = ref(PhonePresets.iPhone14Pro.height)

function applyPreset(name: PhonePresetKey) {
  const p = PhonePresets[name]
  width.value = p.width
  height.value = p.height
  presetName.value = name
}

// 供下拉选择使用的选项（简单分组：iPhone / 其它）
const options = computed(() => (Object
  .entries(PhonePresets) as [PhonePresetKey, typeof PhonePresets[PhonePresetKey]][])
  .map(([k, v]) => ({ value: k, label: `${v.model} (${v.width}×${v.height})` })))

// 拖拽开始时记录
let startX = 0
let startY = 0
let startW = 0
let startH = 0
const resizing = ref(false)

function onResizePointerDown(e: PointerEvent) {
  startX = e.clientX
  startY = e.clientY
  startW = width.value
  startH = height.value
  resizing.value = true
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp, { once: true })
}

function onPointerMove(e: PointerEvent) {
  if (!resizing.value)
    return
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  width.value = Math.max(200, Math.round(startW + dx))
  height.value = Math.max(400, Math.round(startH + dy))
  if (presetName.value !== 'custom')
    presetName.value = 'custom'
}

function onPointerUp() {
  resizing.value = false
  window.removeEventListener('pointermove', onPointerMove)
}

const sizeLabel = computed(() => `${width.value} × ${height.value}`)
const hasIsland = computed(() => {
  if (presetName.value === 'custom')
    return false
  return PhonePresets[presetName.value].note?.includes('Dynamic Island')
})
</script>

<template>
  <div flex flex-col gap-4>
    <div flex items-center gap-2>
      <label text-sm opacity-70>机型:</label>
      <select
        v-model="presetName"
        class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm outline-none"
        @change="presetName !== 'custom' && applyPreset(presetName as PhonePresetKey)"
      >
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
        <option value="custom">
          自定义 (拖拽)
        </option>
      </select>
      <span text-xs opacity-60>当前尺寸: {{ sizeLabel }}</span>
    </div>

    <Phone
      :width="width"
      :height="height"
      :preset="presetName"
      :resizing="resizing"
      :has-island="hasIsland"
      @resize-start="onResizePointerDown"
    >
      <div flex flex-col items-center justify-center h-full gap-2 p-4 text-sm select-none>
        <p>这是一个模拟器区域</p>
        <p opacity-70>
          {{ sizeLabel }} ({{ presetName }})
        </p>
        <p text-xs opacity-50>
          拖拽右下角即可改变尺寸
        </p>
      </div>
    </Phone>
  </div>
</template>

<style scoped>
select:focus {
  box-shadow: 0 0 0 2px rgba(59,130,246,0.4);
}
</style>
