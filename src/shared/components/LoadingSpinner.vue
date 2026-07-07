<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="loading-overlay">
      <div class="loading-spinner" />
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
