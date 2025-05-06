<template>
  <section class="card position-relative">
    <div class="card-body">
      <h2 class="card-title">Technologies used:</h2>
      <p class="card-text">
        Vue 3(Composition API), Vue Router, Pinia, Bootstrap 5, spoonacular API.
      </p>
    </div>
  </section>
  <section class="card joke position-relative shadow bg-success bg-primary bg-gradient mb-5">
    <div v-if="jokeStory.isLoading">Loading joke...</div>
    <div v-else-if="jokeStory.error" class="error">
      {{ jokeStory.error }}
    </div>
    <div v-else class="joke" style="padding: 10px">
      {{ jokeStory.joke }}
    </div>
  </section>
</template>
<script setup>
import { onMounted } from 'vue'
import { useJokes } from '@/stores/RecipesStore'
const jokeStory = useJokes()
onMounted(() => {
  jokeStory.fetchRandomJoke()
})
</script>

<style scoped>
.joke {
  font-family: 'IBM Plex Mono', monospace;
  width: 90%;
  height: auto;
  color: white;
}
.card {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
