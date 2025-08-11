<script lang='ts' setup>
import PhoneWrapperImage from '~/assets/phone-16-pro/iPhone-16-Pro.png'

const time = ref()

watchEffect((onCleanup) => {
  const interval = setInterval(() => {
    time.value = new Date().toLocaleTimeString('zh-CN', { hour12: false, hour: 'numeric', minute: '2-digit' })
  }, 1000)

  onCleanup(() => {
    clearInterval(interval)
  })
})
</script>

<template>
  <div
    class="w-112.5 aspect-[450/920] flex justify-center items-center of-hidden relative"
  >
    <div class="bg-white w-100.5 aspect-[402/874] of-x-hidden of-y-auto rd-12.5 relative hidden-scroll">
      <!-- Status Bar -->
      <div class="w-full h-15.5" p="x4 y5.25" flex items-center justify-between absolute top-0 z-100>
        <div class="flex justify-center items-center w-27">
          <span class="fw-600 text-4.25">{{ time }}</span>
        </div>
        <!-- Level -->
        <div class="flex justify-center items-center w-27 gap-7px">
          <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3652 1.53302C19.3652 0.899978 18.8876 0.386795 18.2985 0.386795H17.2318C16.6427 0.386795 16.1652 0.899978 16.1652 1.53302V11.467C16.1652 12.1 16.6427 12.6132 17.2318 12.6132H18.2985C18.8876 12.6132 19.3652 12.1 19.3652 11.467V1.53302ZM11.931 2.83208H12.9977C13.5868 2.83208 14.0644 3.35758 14.0644 4.00581V11.4395C14.0644 12.0877 13.5868 12.6132 12.9977 12.6132H11.931C11.3419 12.6132 10.8644 12.0877 10.8644 11.4395V4.00581C10.8644 3.35758 11.3419 2.83208 11.931 2.83208ZM7.59928 5.48112H6.53261C5.94351 5.48112 5.46594 6.01331 5.46594 6.6698V11.4245C5.46594 12.081 5.94351 12.6132 6.53261 12.6132H7.59928C8.18838 12.6132 8.66594 12.081 8.66594 11.4245V6.6698C8.66594 6.01331 8.18838 5.48112 7.59928 5.48112ZM2.29849 7.92642H1.23183C0.642724 7.92642 0.165161 8.451 0.165161 9.09812V11.4415C0.165161 12.0886 0.642724 12.6132 1.23183 12.6132H2.29849C2.8876 12.6132 3.36516 12.0886 3.36516 11.4415V9.09812C3.36516 8.451 2.8876 7.92642 2.29849 7.92642Z" fill="black" />
          </svg>
          <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.93641 2.80213C11.4235 2.80223 13.8155 3.72432 15.618 5.3778C15.7538 5.50545 15.9707 5.50384 16.1044 5.37419L17.4019 4.11072C17.4696 4.04496 17.5073 3.95588 17.5068 3.8632C17.5062 3.77052 17.4674 3.68187 17.3989 3.61688C12.6679 -0.757833 5.20418 -0.757833 0.473168 3.61688C0.404636 3.68183 0.365752 3.77044 0.36512 3.86313C0.364488 3.95581 0.402161 4.04491 0.469801 4.11072L1.76767 5.37419C1.90126 5.50404 2.11839 5.50565 2.25404 5.3778C4.05678 3.72421 6.44906 2.80212 8.93641 2.80213ZM8.93306 7.0224C10.2904 7.02232 11.5993 7.53406 12.6054 8.45819C12.7415 8.58934 12.9558 8.5865 13.0885 8.45178L14.3758 7.13247C14.4436 7.06327 14.4812 6.96939 14.4802 6.87184C14.4792 6.77429 14.4397 6.68121 14.3706 6.61342C11.3067 3.72257 6.56199 3.72257 3.49816 6.61342C3.42895 6.68121 3.38947 6.77434 3.38856 6.87192C3.38765 6.9695 3.4254 7.06337 3.49333 7.13247L4.78024 8.45178C4.91289 8.5865 5.12726 8.58934 5.26334 8.45819C6.26879 7.53467 7.57664 7.02297 8.93306 7.0224ZM11.4575 9.81596C11.4594 9.9213 11.4223 10.0229 11.355 10.0967L9.17838 12.5514C9.11458 12.6236 9.02758 12.6642 8.93681 12.6642C8.84604 12.6642 8.75905 12.6236 8.69524 12.5514L6.51822 10.0967C6.45096 10.0228 6.41397 9.92122 6.41596 9.81587C6.41796 9.71052 6.45877 9.61075 6.52875 9.54014C7.91885 8.22625 9.95478 8.22625 11.3449 9.54014C11.4148 9.61081 11.4556 9.7106 11.4575 9.81596Z" fill="black" />
          </svg>
          <svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.35" x="1.00684" y="0.5" width="24" height="12" rx="3.8" stroke="black" />
            <path opacity="0.4" d="M26.5068 4.78113V8.8566C27.3116 8.51143 27.8349 7.70847 27.8349 6.81886C27.8349 5.92926 27.3116 5.1263 26.5068 4.78113" fill="black" />
            <rect x="2.50684" y="2" width="21" height="9" rx="2.5" fill="black" />
          </svg>
        </div>
      </div>
      <!-- Slot Content -->
      <slot />
      <!-- Home Indicator -->
      <div class="w-full h-6.8 flex justify-center items-end pb-2 flex-shrink-0 absolute bottom-0 z-100">
        <div class="w-36 h-1.25 bg-black rd-full" />
      </div>
    </div>
    <div :style="{ backgroundImage: `url(${PhoneWrapperImage})` }" bg-no-repeat bg-cover absolute inset-0 pointer-events-none />
  </div>
</template>
