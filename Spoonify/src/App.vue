<template>
  <div class="page">
    <Navigation />
    <div class="main-container" style="margin-top: 100px">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style scoped>
.page {
  width: 100%;
}
.main-container {
  width: 100%;
  max-width: 100%;
  margin-top: 100px;
  padding: 0;
}
</style>
