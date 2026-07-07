<script setup lang="ts">
import { onMounted } from "vue"
import { setupGlobalErrorHandler } from "@/core/error-handler"

onMounted(() => {
  setupGlobalErrorHandler()
})
</script>

<template>
  <RouterView />
</template>
