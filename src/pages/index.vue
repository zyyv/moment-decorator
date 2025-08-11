<script setup lang="ts">
</script>

<template>
  <div flex flex-col gap-6>
    <div>
      <h2 text-xl font-bold mb-2>
        Index Page
      </h2>
      <RouterLink to="/about" text-blue-600 dark:text-blue-400 underline>
        About
      </RouterLink>
    </div>

    <section>
      <h3 text-lg font-medium mb-2>
        手机模拟器实验
      </h3>
      <Emulator />
    </section>
  </div>
</template>
