<script setup lang="ts">
// 性能监控组件
const fps = ref(0)
const memory = ref({ used: 0, total: 0 })
const renderTime = ref(0)

let frameCount = 0
let lastTime = performance.now()
let animationId: number

function updateFPS() {
  const now = performance.now()
  frameCount++

  if (now - lastTime >= 1000) {
    fps.value = Math.round((frameCount * 1000) / (now - lastTime))
    frameCount = 0
    lastTime = now
  }

  animationId = requestAnimationFrame(updateFPS)
}

function updateMemory() {
  if ('memory' in performance) {
    const mem = (performance as any).memory
    memory.value = {
      used: Math.round(mem.usedJSHeapSize / 1024 / 1024),
      total: Math.round(mem.totalJSHeapSize / 1024 / 1024),
    }
  }
}

function measureRenderTime() {
  const start = performance.now()
  nextTick(() => {
    renderTime.value = Math.round(performance.now() - start)
  })
}

onMounted(() => {
  updateFPS()
  const memoryInterval = setInterval(updateMemory, 1000)
  const renderInterval = setInterval(measureRenderTime, 1000)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    clearInterval(memoryInterval)
    clearInterval(renderInterval)
  })
})

const isVisible = ref(false)
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <button
      class="px-3 py-2 bg-black/20 text-white rounded-lg backdrop-blur text-xs"
      @click="isVisible = !isVisible"
    >
      性能监控
    </button>

    <div
      v-if="isVisible"
      class="absolute bottom-12 right-0 p-3 bg-black/80 text-white rounded-lg backdrop-blur text-xs space-y-1 min-w-40"
    >
      <div>FPS: {{ fps }}</div>
      <div v-if="memory.total > 0">
        内存: {{ memory.used }}MB / {{ memory.total }}MB
      </div>
      <div>渲染时间: {{ renderTime }}ms</div>
    </div>
  </div>
</template>
