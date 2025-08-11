<script setup lang="ts">
import BackgroundImageDefault from '~/assets/images/background.jpg'
import Phone from '~/components/Phone.vue'
</script>

<template>
  <div flex gap-6>
    <section flex-1>
      <Phone>
        <div w-full>
          <!-- Mask -->
          <div w-full h-75 bg-cover :style="{ backgroundImage: `url(${BackgroundImageDefault})` }" />
          <!-- Avatar -->
          <div px-4>
            <div flex gap-2 mt--8>
              <img
                class="w-14 h-14 rounded-lg"
                src="https://avatars.githubusercontent.com/u/42139754?v=4"
                alt="Avatar"
              >
              <span text-lg fw-600>Chris</span>
            </div>
            <p mt-3 text-xs op-64>
              Regardless of the past, do not ask the future.
            </p>
          </div>
        </div>
      </Phone>
    </section>
    <section flex-1>
      <div>
        <Emulator />
      </div>
    </section>
  </div>
</template>
