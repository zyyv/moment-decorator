<script lang="ts" setup>
interface Props {
  width: number
  height: number
  resizing?: boolean
  /** 是否显示 Dynamic Island 裁切 */
  hasIsland?: boolean
  /** 仅用于展示（可选） */
  preset?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'resizeStart', ev: PointerEvent): void }>()

function onHandlePointerDown(e: PointerEvent) {
  e.preventDefault()
  emit('resizeStart', e)
}
</script>

<template>
  <div class="emulator-wrapper" :class="{ resizing: props.resizing }">
    <div
      class="device-frame"
      :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    >
      <!-- 顶部区域，可模拟刘海 / Dynamic Island -->
      <div v-if="props.hasIsland" class="island" />
      <div class="device-screen">
        <slot />
      </div>
      <div
        class="resize-handle"
        title="拖拽调整尺寸"
        @pointerdown="onHandlePointerDown"
      />
    </div>
  </div>
</template>

<style scoped>
.emulator-wrapper { position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 1rem; border-radius: 0.75rem; background: var(--uno-colors-gray-100,#f3f4f6); box-shadow: inset 0 1px 2px rgba(0,0,0,.06); border: 1px solid rgba(203,213,225,.7); min-width: 260px; }
.dark .emulator-wrapper { background: #1f2937; border-color: rgba(75,85,99,.6); }
.device-frame { position: relative; background: rgba(0,0,0,.95); border-radius: 32px; overflow: hidden; transition: width .25s ease-out, height .25s ease-out; box-shadow: 0 6px 18px -4px rgba(0,0,0,.35), 0 2px 4px rgba(0,0,0,.25); }
.device-screen { position: absolute; inset: 0; background: #fff; color: #1f2937; overflow: auto; border-radius: 26px; padding: 12px 10px 10px; }
.dark .device-screen { background: #111827; color: #e5e7eb; }
.island { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 110px; height: 32px; background: rgba(30,30,32,.9); border-radius: 18px; z-index: 10; box-shadow: 0 2px 4px -1px rgba(0,0,0,.4); }
.resize-handle { position: absolute; right: 4px; bottom: 4px; width: 18px; height: 18px; cursor: nwse-resize; background: linear-gradient(135deg, rgba(255,255,255,.15) 0%, rgba(255,255,255,.05) 50%, rgba(255,255,255,0) 50%), repeating-linear-gradient(135deg, rgba(255,255,255,.3) 0 2px, transparent 2px 4px); border-radius: 4px; opacity: .6; transition: opacity .2s; }
.resize-handle:hover { opacity: 1; }
.emulator-wrapper.resizing .device-frame { box-shadow: 0 0 0 3px rgba(59,130,246,.5), 0 6px 18px -4px rgba(0,0,0,.35), 0 2px 4px rgba(0,0,0,.25); }
</style>
