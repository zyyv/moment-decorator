<script setup lang="ts">
// import TheHeader from '../components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main
    px-4 py-10
  >
    <RouterView />
    <div mx-auto mt-5 text-center text-sm opacity-50>
      [Default Layout]
    </div>
  </main>
</template>
