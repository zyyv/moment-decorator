<script setup lang="ts">
const props = defineProps({
  scale: { type: Number, default: 1 },
  min: { type: Number, default: 0.3 },
  max: { type: Number, default: 2 },
})
const emit = defineEmits<{ (e: 'update:scale', value: number): void }>()

const internal = ref(props.scale)
watch(() => props.scale, v => (internal.value = v))

const clamp = (v: number) => Math.min(props.max, Math.max(props.min, Number(v.toFixed(2))))

function setScale(v: number) {
  const nv = clamp(v)
  internal.value = nv
  emit('update:scale', nv)
}
function addScale(step = 0.01) {
  setScale(internal.value + step)
}
function reduceScale(step = 0.01) {
  setScale(internal.value - step)
}

const displayPercent = computed(() => `${Math.round(internal.value * 100)}%`)

let holdTimer: number | null = null
let holdRAF: number | null = null
function startHold(action: 'inc' | 'dec') {
  stopHold()
  action === 'inc' ? addScale() : reduceScale()
  let velocity = 0.01
  let last = performance.now()
  const tick = (now: number) => {
    const dt = now - last
    if (dt >= 16) {
      last = now
      velocity = Math.min(0.05, Number((velocity + 0.002).toFixed(3)))
      action === 'inc' ? addScale(velocity) : reduceScale(velocity)
    }
    holdRAF = requestAnimationFrame(tick)
  }
  holdTimer = window.setTimeout(() => {
    holdRAF = requestAnimationFrame(tick)
  }, 200)
}
function stopHold() {
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }
  if (holdRAF) {
    cancelAnimationFrame(holdRAF)
    holdRAF = null
  }
}
onBeforeUnmount(() => stopHold())
</script>

<template>
  <div class="flex items-center gap-1 px-2.5 py-1.5 rd-full bg-light-700 bg-op-60 dark:bg-dark-900 dark:bg-op-40 backdrop-blur-6 border border-dark-700 dark:border-light-700 border-op-10 shadow-sm">
    <button
      type="button"
      class="size-4 rd-full grid place-items-center"
      aria-label="Decrease scale"
      @click="reduceScale()"
      @mousedown.prevent="startHold('dec')"
      @mouseup="stopHold"
      @mouseleave="stopHold"
      @touchstart.prevent="startHold('dec')"
      @touchend="stopHold"
      @touchcancel="stopHold"
    >
      <div class="i-hugeicons:remove-circle text-basecolor" />
    </button>
    <span class="min-w-14 text-center text-sm text-basecolor op-80 select-none">{{ displayPercent }}</span>
    <button
      type="button"
      class="size-4 rd-full grid place-items-center"
      aria-label="Increase scale"
      @click="addScale()"
      @mousedown.prevent="startHold('inc')"
      @mouseup="stopHold"
      @mouseleave="stopHold"
      @touchstart.prevent="startHold('inc')"
      @touchend="stopHold"
      @touchcancel="stopHold"
    >
      <div class="i-hugeicons:add-circle text-basecolor" />
    </button>
  </div>
</template>
