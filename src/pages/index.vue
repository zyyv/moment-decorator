<script setup lang="ts">

</script>

<template>
  <div class="grid gap-6 md:grid-cols-2 h-[calc(100vh-4.5rem)]">
    <section h-full of-auto class="no-scrollbar">
      <WechatForm />
    </section>

    <section h-full of-auto no-scrollbar b="~ dashed green:50" bg-green bg-op-10 dark:bg-op-5 rd-xl>
      <Emulator />
    </section>
  </div>
</template>
