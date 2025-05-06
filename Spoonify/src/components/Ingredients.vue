<template>
  <div
    :class="['page', { 'page--mobile': screenWidth <= 1100, 'page--desktop': screenWidth > 1100 }]"
  >
    <div class="ingredient-menu">
      <div
        class="ingredient-section"
        :class="['ingredient-menu__section', { 'mt-5': screenWidth <= 1100 }]"
        :style="{
          transform: screenWidth <= 1100 ? 'translateX(-50%)' : '',
        }"
      >
        <div class="ingredient-menu__functionality mt-3">
          <button
            type="button"
            class="ingredient-menu__button btn btn-success position-relative"
            @click="handleClick"
          >
            Search
          </button>
          <input
            type="text"
            class="ingredient-menu__input position-relative"
            :placeholder="placeholderText"
            @focus="handleFocus"
            @blur="handleBlur"
            ref="input"
            v-model="currentIngredient"
          />
          <svg
            @click="addIngredient"
            width="30"
            height="30"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ingredient-menu__add-icon position-relative"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.3125 23.625C25.3125 24.5531 24.5565 25.3125 23.625 25.3125H3.375C2.4435 25.3125 1.6875 24.5531 1.6875 23.625V3.375C1.6875 2.44687 2.4435 1.6875 3.375 1.6875H23.625C24.5565 1.6875 25.3125 2.44687 25.3125 3.375V23.625ZM23.625 0H3.375C1.51116 0 0 1.51031 0 3.375V23.625C0 25.4897 1.51116 27 3.375 27H23.625C25.4888 27 27 25.4897 27 23.625V3.375C27 1.51031 25.4888 0 23.625 0ZM18.5625 12.6562H14.3438V8.4375C14.3438 7.97344 13.9657 7.59375 13.5 7.59375C13.0343 7.59375 12.6562 7.97344 12.6562 8.4375V12.6562H8.4375C7.97175 12.6562 7.59375 13.0359 7.59375 13.5C7.59375 13.9641 7.97175 14.3438 8.4375 14.3438H12.6562V18.5625C12.6562 19.0266 13.0343 19.4062 13.5 19.4062C13.9657 19.4062 14.3438 19.0266 14.3438 18.5625V14.3438H18.5625C19.0282 14.3438 19.4062 13.9641 19.4062 13.5C19.4062 13.0359 19.0282 12.6562 18.5625 12.6562Z"
              fill="green"
            />
          </svg>
        </div>
        <div class="ingredient-menu__list mt-2">
          <ul class="ingredient-menu__list-container">
            <li
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="ingredient-menu__list-item"
            >
              <div class="ingredient-menu__item-content d-flex align-items-center">
                <span class="ingredient-menu__item-text list-group-item list-group-item-success">
                  {{ ingredient }}
                </span>
                <svg
                  class="ingredient-menu__remove-icon ms-1"
                  @click="removeIngredient(index)"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.5305 9.99595L19.0623 5.46883C20.3126 4.22108 20.3126 2.18956 19.0623 0.941811C17.8103 -0.313937 15.7817 -0.313937 14.5305 0.941811L9.99961 5.46883L5.46868 0.941811C4.21835 -0.313937 2.18967 -0.313937 0.937744 0.941811C-0.312581 2.18956 -0.312581 4.22108 0.937744 5.46883L5.46868 9.99595L0.937744 14.5311C-0.312581 15.7788 -0.312581 17.8104 0.937744 19.0582C2.18967 20.3139 4.21835 20.3139 5.46868 19.0582L9.99961 14.5311L14.5305 19.0582C15.7817 20.3139 17.8103 20.3139 19.0623 19.0582C20.3126 17.8104 20.3126 15.7788 19.0623 14.5311L14.5305 9.99595Z"
                    fill="red"
                  />
                </svg>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div v-if="ingredientsStore.isLoading" class="content__loading">Loading...</div>
      <div
        class="content__card card shadow-lg"
        v-for="dish in ingredientsStore.dishes?.results"
        :key="dish.id"
      >
        <div class="content__card-body card-body position-relative">
          <h3 class="content__card_title card-title fw-bold">{{ dish.title }}</h3>
          <div class="content__card-info">
            <img
              :src="`${dish.image}`"
              alt="dish_photo"
              class="content__card-image rounded-4"
              width="300px"
              :style="{
                height: screenWidth > 1100 ? 'auto' : '300px',
              }"
            />
            <div class="content__ingredients-list ms-5">
              <h4 class="content__ingredients-title">Ingredients used:</h4>
              <div
                v-for="(ingredient, index) in dish.usedIngredients"
                :key="'used-' + index"
                class="content__ingredient-item"
              >
                {{ ingredient.original }}
              </div>
              <h5 class="content__additional-title mt-1">Also used:</h5>
              <div
                v-for="(ingredient, index) in dish.missedIngredients"
                :key="'missed-' + index"
                class="content__additional-item"
              >
                {{ ingredient.original }}
                <span v-if="ingredient.image">
                  <img :src="ingredient.image" width="30" class="content__ingredient-image+++" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useIngredientsStore } from '@/stores/RecipesStore'
import { useScreenWidth } from '@/composables/useScreenWidth'
const { screenWidth } = useScreenWidth()
const input = ref(null)
const placeholderText = ref('Add an ingredient')
const handleFocus = () => {
  placeholderText.value = ''
}
const handleBlur = () => {
  if (!currentIngredient.value.trim()) {
    placeholderText.value = 'Add an ingredient'
  }
}
const ingredients = ref([])
const currentIngredient = ref('')
const addIngredient = () => {
  if (currentIngredient.value.trim()) {
    ingredients.value.push(currentIngredient.value.trim())
    currentIngredient.value = ''
    placeholderText.value = 'Add an ingredient'
  }
}

const ingredientsStore = useIngredientsStore()
const handleClick = () => {
  if (ingredients.value.length > 0) {
    ingredientsStore.fetchDishes(ingredients.value)
  }
}
const removeIngredient = (index) => {
  ingredients.value.splice(index, 1)
}
</script>
<style scoped>
.page--mobile {
  position: relative;
  min-height: 100vh;
}
.page--desktop {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  min-height: 100vh;
}
.page--desktop .content {
  width: 70%;
}
.page--desktop .ingredient-menu {
  width: 30%;

  justify-items: center;
}

.ingredient-menu input:focus {
  border: none;
  outline-color: rgb(73, 158, 64);
}
.ingredient-section {
  min-width: 20vw;
  height: auto;
  display: flex;
  align-items: center;
  border: 1px solid rgba(103, 103, 103, 0.525);
  border-radius: 10px;

  flex-wrap: wrap;
  position: relative;
  width: 90%;
}
.ingredient-section svg,
.ingredient-section button {
  transition: all 0.5s ease;
}
.ingredient-section svg:hover {
  transform: scale(1.1);
  filter: brightness(0.9);
}
.ingredient-section svg:active {
  transform: scale(1.4);
}
.ingredient-section button:active {
  transform: scale(1.2);
}
.ingredient-menu__list {
  position: relative;
  flex-basis: 100%;
}
.ingredient-menu__functionality {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
}
ul {
  display: grid;
  gap: 10px;
}
ul li {
  margin: 0px;
  padding: 5px;
  width: 80%;
  list-style: none;
}

.content__card-info {
  display: flex;
  flex-direction: row;
}
.content__ingredients-list {
  flex: 1;
}
.page--desktop .card {
  margin-top: 0;
  margin-bottom: 20px;
  margin-left: 20px;
}
.ingredient-menu__functionality input {
  text-align: center;
}

@media (max-width: 1100px) {
  .ingredient-menu {
    position: static !important;
    height: auto;
  }
  .ingredient-section {
    left: 50%;
  }
  .content {
    position: static !important;
    display: grid;
    justify-content: center;
    justify-items: center;
  }
  .ingredient-section {
    width: 70vw;
    top: 0px;
  }
  .ingredient-menu__functionality {
    justify-content: space-evenly;
  }
  .ingredient-menu__functionality input {
    width: 30vw;
    height: 35px;
  }
  .ingredient-menu__functionality svg {
    width: 35px;
    height: 35px;
  }
  .card {
    width: 90%;
  }
  .card-body {
    display: grid;
    justify-items: center;
  }

  .card-body .rounded-4 {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .content__card-info {
    flex-direction: column;
  }
  .content__ingredients-list {
    position: relative;
  }
  input {
    text-align: center;
  }
  input::placeholder {
    font-size: 18px;
    text-align: center;
  }
}
@media (max-width: 468px) {
  input::placeholder {
    font-size: 12px;
  }
}
</style>
