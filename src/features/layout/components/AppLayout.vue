<script setup lang="ts">
import HeaderBar from "./HeaderBar.vue"
</script>

<template>
  <div class="dashboard-container">
    <HeaderBar />
    <main class="dashboard-main">
      <slot />
    </main>
  </div>
</template>
