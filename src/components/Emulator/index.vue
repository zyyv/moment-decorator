<script lang="ts" setup>
const scale = ref(0.8)
const MIN_SCALE = 0.3
const MAX_SCALE = 2

const clamp = (v: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(v.toFixed(2))))

function addScale(step = 0.01) {
  scale.value = clamp(scale.value + step)
}

function reduceScale(step = 0.01) {
  scale.value = clamp(scale.value - step)
}

const displayPercent = computed(() => `${Math.round(scale.value * 100)}%`)

let holdTimer: number | null = null
let holdRAF: number | null = null

function startHold(action: 'inc' | 'dec') {
  stopHold()
  // initial tick for responsiveness
  action === 'inc' ? addScale() : reduceScale()
  // accelerate while holding
  let velocity = 0.01
  let last = performance.now()
  const tick = (now: number) => {
    const dt = now - last
    // throttle to ~60fps minimum spacing (about every 16ms)
    if (dt >= 16) {
      last = now
      // ease up to a higher speed but keep precise steps
      velocity = Math.min(0.05, Number((velocity + 0.002).toFixed(3)))
      action === 'inc' ? addScale(velocity) : reduceScale(velocity)
    }
    holdRAF = requestAnimationFrame(tick)
  }
  // small delay to distinguish click vs hold
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

onBeforeUnmount(() => {
  stopHold()
})
</script>

<template>
  <div relative flex flex-col justify-center items-center bg-light-700 bg-op-90 dark:bg-dark-900 dark:bg-op-30 rd-2xl>
    <!-- Scale Controls -->
    <div
      class="flex items-center gap-2 px-2.5 py-1.5 rd-full bg-light-700 bg-op-60 dark:bg-dark-900 dark:bg-op-40 backdrop-blur-6 border border-dark-700 dark:border-light-700 border-op-10 shadow-sm"
    >
      <!-- Decrease -->
      <button
        type="button"
        class="size-8 rd-full grid place-items-center hover:bg-dark-700 hover:bg-op-6 dark:hover:bg-light-700 dark:hover:bg-op-8 active:scale-95 transition duration-200"
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

      <!-- Display -->
      <span class="min-w-14 text-center text-sm text-basecolor op-80 select-none">{{ displayPercent }}</span>

      <!-- Increase -->
      <button
        type="button"
        class="size-8 rd-full grid place-items-center hover:bg-dark-700 hover:bg-op-6 dark:hover:bg-light-700 dark:hover:bg-op-8 active:scale-95 transition duration-200"
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

    <WechatMoment :scale="scale" />
  </div>
</template>
