<template>
  <button
    type="button"
    class="inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 select-none outline-none ring-0 hover:bg-gray-500/10 active:scale-95"
    :class="isDark ? 'text-amber-300' : 'text-stone-600'"
    aria-label="切换深色模式"
    :title="isDark ? 'To Light Mode' : 'To Dark Mode'"
    @click="toggleDark()"
  >
    <span v-if="isDark" class="i-hugeicons:sun-02 text-xl" />
    <span v-else class="i-hugeicons:moon-slow-wind text-xl" />
  </button>
</template>
