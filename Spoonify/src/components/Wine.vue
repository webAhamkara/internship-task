<template>
  <div class="wine-app d-flex flex-column">
    <section class="wine-selector">
      <h5 class="wine-selector__heading ms-3"><b>Wine classification</b>:</h5>
      <div class="wine-selector__dropdown dropdown ms-1">
        <button
          class="wine-selector__dropdown-btn btn btn-danger dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ userChoiceOne || 'Select type' }}
        </button>
        <ul class="wine-selector__dropdown-menu dropdown-menu">
          <li
            v-for="category in Object.keys(wineMap)"
            :key="category"
            class="wine-selector__dropdown-item"
            @click="selectCategory(category)"
          >
            <a class="wine-selector__dropdown-link dropdown-item">{{ formatLabel(category) }}</a>
          </li>
        </ul>
      </div>
      <div
        v-if="userChoiceOne && currentSubCategories.length"
        class="wine-selector__dropdown dropdown ms-1"
      >
        <button
          class="wine-selector__dropdown-btn btn btn-danger dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ userChoiceTwo || 'Choose a wine' }}
        </button>
        <ul class="wine-selector__dropdown-menu dropdown-menu">
          <li
            v-for="subCategory in currentSubCategories"
            :key="subCategory"
            @click="selectSubCategory(subCategory)"
          >
            <a class="wine-selector__dropdown-link dropdown-item">{{ formatLabel(subCategory) }}</a>
          </li>
        </ul>
      </div>
      <button
        v-if="userChoiceOne && userChoiceTwo"
        class="wine-selector__confirm-btn btn btn-wine ms-1"
        @click="handleClick"
      >
        Info
      </button>
    </section>
    <div v-if="confirmedWine" class="wine-info mt-3 position-relative">
      <div v-if="infoWine.isLoading" class="wine-info__loading">Loading wine information...</div>
      <div v-else-if="infoWine.error" class="wine-info__error">Error: {{ infoWine.error }}</div>
      <div v-else-if="infoWine.description" class="wine-info__description">
        <h1 class="wine-info__title">
          {{ formatLabel(confirmedWine) }}
        </h1>
        <p class="wine-info__text">{{ infoWine.description.wineDescription }}</p>
      </div>
    </div>
    <div class="wine-recommendations">
      <div v-if="wineRecommendations.isLoading" class="wine-recommendations__loading">
        Loading recommendations...
      </div>
      <div v-else-if="wineRecommendations.error" class="wine-recommendations__error text-danger">
        Error: {{ wineRecommendations.error }}
      </div>
      <div v-else-if="wineRecommendations.recommendations.length">
        <h3 class="wine-recommendations__heading mt-3">Recommended wines:</h3>
        <div
          v-for="wine in wineRecommendations.recommendations"
          :key="wine.id"
          class="wine-recommendations__card card shadow mb-4"
        >
          <div class="wine-recommendations__card-body card-body">
            <h4 class="wine-recommendations__card-title card-title">{{ wine.title }}</h4>
            <div
              class="wine-recommendations__content d-flex"
              :class="{
                'flex-row': screenWidth >= 576,
                'flex-column': screenWidth < 576,
              }"
            >
              <img
                :src="wine.imageUrl"
                alt="wine"
                width="300"
                class="wine-recommendations__image"
                :class="{ 'mx-auto': screenWidth < 576 }"
              />
              <div class="wine-recommendations__details d-flex flex-column ms-2">
                <p class="wine-recommendations__description card-text" style="font-size: 20px">
                  {{ wine.description }}
                </p>
                <p class="wine-recommendations__price card-text" style="font-size: 16px">
                  Price: {{ wine.price }}
                </p>
                <p class="wine-recommendations__rating card-text" style="font-size: 16px">
                  Rating: {{ formatRating(wine.averageRating) }}
                </p>
                <a
                  target="_blank"
                  :href="wine.link"
                  class="wine-recommendations__link position-absolute end-0 bottom-0 mb-3 me-3"
                  >Link</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWineSelectionStore } from '@/stores/WineStore'
import { useWineRecommendations, useInfoWine } from '@/stores/RecipesStore'
import { useScreenWidth } from '@/composables/useScreenWidth'
const { screenWidth } = useScreenWidth()
const wineSelectionStore = useWineSelectionStore()
const userChoiceOne = ref(wineSelectionStore.userChoiceOne)
const userChoiceTwo = ref(wineSelectionStore.userChoiceTwo)
const confirmedWine = ref(wineSelectionStore.confirmedWine)
const infoWine = useInfoWine()
const wineRecommendations = useWineRecommendations()
onMounted(() => {
  if (wineSelectionStore.confirmedWine) {
    infoWine.fetchWineDescription(wineSelectionStore.confirmedWine)
    wineRecommendations.fetchWineRecommendations(wineSelectionStore.confirmedWine)
  }
})
const wineMap = {
  white_wine: [
    'assyrtiko',
    'pinot_blanc',
    'cortese',
    'roussanne',
    'moschofilero',
    'muscadet',
    'viognier',
    'verdicchio',
    'greco',
    'marsanne',
    'white_burgundy',
    'chardonnay',
    'gruener_veltliner',
    'white_rioja',
    'frascati',
    'gavi',
    'l_acadie_blanc',
    'trebbiano',
    'sauvignon_blanc',
    'catarratto',
    'albarino',
    'arneis',
    'verdejo',
    'vermentino',
    'soave',
    'pinot_grigio',
    'dry_riesling',
    'torrontes',
    'mueller_thurgau',
    'grechetto',
    'gewurztraminer',
    'chenin_blanc',
    'white_bordeaux',
    'semillon',
    'riesling',
    'sauternes',
    'sylvaner',
    'lillet_blanc',
  ],
  red_wine: [
    'petite_sirah',
    'zweigelt',
    'baco_noir',
    'bonarda',
    'cabernet_franc',
    'bairrada',
    'barbera_wine',
    'primitivo',
    'pinot_noir',
    'nebbiolo',
    'dolcetto',
    'tannat',
    'negroamaro',
    'red_burgundy',
    'corvina',
    'rioja',
    'cotes_du_rhone',
    'grenache',
    'malbec',
    'zinfandel',
    'sangiovese',
    'carignan',
    'carmeniere',
    'cesanese',
    'cabernet_sauvignon',
    'aglianico',
    'tempranillo',
    'shiraz',
    'mourvedre',
    'merlot',
    'nero_d_avola',
    'bordeaux',
    'marsala',
    'port',
    'gamay',
    'dornfelder',
    'concord_wine',
    'sparkling_red_wine',
    'pinotage',
    'agiorgitiko',
  ],
  dessert_wine: [
    'pedro_ximenez',
    'moscato',
    'late_harvest',
    'ice_wine',
    'white_port',
    'lambrusco_dolce',
    'madeira',
    'banyuls',
    'vin_santo',
    'port',
  ],
  rose_wine: ['sparkling_rose'],
  sparkling_wine: ['cava', 'cremant', 'champagne', 'prosecco', 'spumante', 'sparkling_rose'],
  sherry: ['cream_sherry', 'dry_sherry'],
  vermouth: ['dry_vermouth'],
  fruit_wine: [],
  mead: [],
}
const currentSubCategories = computed(() => wineMap[userChoiceOne.value] || [])
const formatRating = (rating) => {
  if (!rating) return 'N/A'
  return (rating * 10).toFixed(1) + '/10'
}
const formatLabel = (str) =>
  str
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')

const selectCategory = (category) => {
  userChoiceOne.value = category
  userChoiceTwo.value = ''
}

const selectSubCategory = (subCategory) => {
  userChoiceTwo.value = subCategory
}

const handleClick = () => {
  infoWine.$reset()
  wineRecommendations.$reset()
  confirmedWine.value = userChoiceTwo.value
  wineSelectionStore.setSelections(userChoiceOne.value, userChoiceTwo.value, confirmedWine.value)
  infoWine.fetchWineDescription(confirmedWine.value)
  wineRecommendations.fetchWineRecommendations(confirmedWine.value)
}
</script>
<style scoped>
.wine-selector {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
.wine-selector,
h1,
h3,
p {
  font-family: 'Tinos', serif;
  font-weight: 400;
  font-style: normal;
}
.wine-selector h5 {
  text-align: center;
  margin: 0;
}
.btn-wine {
  font-family: 'Arial', sans-serif;
  background-color: #a13844;
  color: white;
  font-weight: bold;
  transition: transform 0.2s ease;
}
.btn-wine:hover {
  background-color: #bb4150;
}
.btn-wine:active {
  transform: scale(1.1);
  color: white;
  outline: none;
}
.wine-info {
  width: 50%;
  border-radius: 10px;
  padding: 5px;
  display: block;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background-color: rgba(216, 216, 216, 0.619);
  box-shadow:
    rgba(58, 3, 21, 0.15) 0px 25px 50px -12px,
    rgba(94, 40, 34, 0.1) 0px -15px 30px,
    rgba(78, 12, 45, 0.2) 0px 8px 16px,
    rgba(34, 2, 19, 0.12) 0px 4px 8px;
}
.wine-info__description {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  background-color: rgba(216, 216, 216, 0.619);
}
.wine-recommendations {
  width: 90%;
  margin: 0 auto;
}

@media (max-width: 576px) {
  .wine-info {
    width: 80vw;
  }
  h5 {
    font-size: 14px;
  }
}
</style>
