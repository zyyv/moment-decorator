<template>
  <button
    type="button"
    class="
      inline-flex items-center justify-center cursor-pointer
      w-10 h-10 rounded-full transition-colors duration-300 select-none outline-none
      ring-0 active:scale-95
      @hover:bg-orange-500/10 dark:@hover:bg-purple-400/10
    "
    :class="isDark ? 'text-purple-400' : 'text-orange-500'"
    aria-label="Toggle Dark Mode"
    :title="isDark ? 'To Light Mode' : 'To Dark Mode'"
    @click="toggleDark()"
  >
    <span v-if="isDark" class="i-hugeicons:sun-03 text-xl" />
    <span v-else class="i-hugeicons:moon-slow-wind text-xl" />
  </button>
</template>
