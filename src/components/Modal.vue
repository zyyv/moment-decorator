<script setup lang="ts">
interface Props {
  title?: string
  maxWidth?: string
  onClose?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: 'max-w-2xl',
})

const modelValue = defineModel<boolean>()

function close() {
  modelValue.value = false
  props.onClose?.()
}

function handleOverlayClick() {
  close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click="handleOverlayClick"
    >
      <div
        class="w-full mx-4 rounded-lg shadow-xl max-h-[90vh] overflow-auto"
        :class="maxWidth"
        @click.stop
      >
        <div v-if="title || $slots.header" class="flex items-center justify-between p-4">
          <slot name="header">
            <h3 class="text-lg font-semibold">
              {{ title }}
            </h3>
          </slot>
          <button
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            @click="close"
          >
            <div class="i-hugeicons:cancel-01 text-lg" />
          </button>
        </div>
        <div class="p-4">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
