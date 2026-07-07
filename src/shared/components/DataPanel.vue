<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
  <div class="chart-card">
    <div class="chart-title">{{ title }}</div>
    <div class="chart-body">
      <slot />
    </div>
  </div>
</template>
