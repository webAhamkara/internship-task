<template>
  <section class="search-section">
    <div class="search-section__controls" :class="{ 'mx-auto': screenWidth <= 768 }">
      <input
        type="text"
        class="search-section__input opacity-75 fs-6"
        :placeholder="placeholderText"
        @focus="handleFocus"
        @blur="handleBlur"
        ref="input"
        style="width: 220px"
      />
      <button class="search-section__submit-button btn btn-secondary ms-1" @click="handleClick">
        Ok
      </button>
    </div>
    <button
      v-if="showSimilarMode"
      class="search__section__button-back mt-1 btn btn-danger"
      :class="{ 'mx-auto': screenWidth <= 768 }"
      :style="{
        'max-width': screenWidth <= 768 ? '80%' : '250px',
        'min-width': screenWidth <= 768 ? '60%' : '200px',
      }"
      @click="showOriginal"
    >
      Back
    </button>
  </section>
  <div class="recipes-list mx-auto">
    <div v-if="recipesStore.isLoading || similarDishes.isLoading" class="text-center">
      <h3>Loading...</h3>
    </div>
    <div
      class="recipes-list__item card shadow-lg mb-5"
      :class="{
        'mt-5': screenWidth <= 768,
        'mx-auto': screenWidth <= 768,
      }"
      v-for="recipe in showSimilarMode
        ? similarDishes.similarDishes
        : recipesStore.recipes?.results"
      :key="recipe.id"
    >
      <div
        class="recipes-card__body card-body position-relative"
        :class="{
          'mx-auto': screenWidth <= 768,
        }"
      >
        <h3 class="recipes-card__title card-title fw-bold">{{ recipe.title }}</h3>
        <div class="recipes-card__content">
          <img
            :src="
              showSimilarMode
                ? `https://spoonacular.com/recipeImages/${recipe.image}`
                : recipe.image
            "
            width="300"
            style="min-height: 300px; max-height: 400px"
            alt="dish_photo"
            class="recipe-card__image rounded-4"
            :class="{ 'mx-auto': screenWidth <= 768 }"
          />
          <div
            v-if="!showSimilarMode"
            v-html="recipe.summary"
            class="recipe-card__summary flex-grow-1"
            :class="{ 'ms-3': screenWidth > 768 }"
          ></div>

          <div class="recipe-card__actions d-flex flex-column">
            <button
              v-if="!showSimilarMode"
              class="recipe-card__similar-button position-relative btn btn-outline-secondary"
              @click="showSimilar(recipe.id)"
              id="similar"
            >
              Similar
            </button>
          </div>
          <div v-if="showSimilarMode" class="recipe-card__details ms-3 flex-grow-1">
            <p><b>Cooking time</b>: {{ recipe.readyInMinutes }} mins.</p>
            <p><b>Number of servings</b>: {{ recipe.servings }}.</p>
            <a target="_blank" :href="recipe.sourceUrl">View Recipe</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRecipesStore } from '@/stores/RecipesStore'
import { useSimilarDishes } from '@/stores/RecipesStore'
import { useScreenWidth } from '@/composables/useScreenWidth'
const { screenWidth } = useScreenWidth()
const input = ref(null)
const placeholderText = ref('Enter the name of the dish')
const showSimilarMode = ref(false)
const handleFocus = () => {
  placeholderText.value = ''
}
const handleBlur = () => {
  if (!input.value.value.trim()) {
    placeholderText.value = 'Enter the name of the dish'
  }
}
const handleClick = () => {
  if (input.value?.value.trim()) {
    recipesStore.fetchRecipes(input.value.value.trim())
  }
}

const recipesStore = useRecipesStore()

const similarDishes = useSimilarDishes()
const showSimilar = (id) => {
  similarDishes.fetchSimilarDishes(id)
  showSimilarMode.value = true
}
const showOriginal = () => {
  showSimilarMode.value = false
}
</script>
<style scoped>
section {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: auto;
  min-width: 300px;
  align-items: center;
}
section input {
  width: 20vw;
  border-radius: 3px;
  text-align: center;
}
section input:focus {
  border: none;
}
.recipes-list {
  height: auto;
  width: 90%;
}
.recipes-card__content {
  display: flex;
  flex-direction: row;
}
.card {
  height: auto;
}
.card-body .card-title {
  text-align: center;
}
#similar {
  max-height: 50px;
}

@media (max-width: 768px) {
  button {
    transition: transform 0.2s ease;
  }
  button:active {
    transform: scale(1.1) !important;
  }
  .recipes-card__content {
    flex-direction: column;
  }
  .btn-danger {
    z-index: 1000;
  }
  .card {
    width: 90%;
  }
}
</style>
