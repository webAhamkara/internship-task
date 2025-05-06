import { defineStore } from 'pinia'
export const useRecipesStore = defineStore('recipesStore', {
  state: () => ({
    recipes: { results: [] },
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchRecipes(dish) {
      try {
        this.isLoading = true
        this.error = null
        const url = `/api/recipes?dish=${encodeURIComponent(dish)}`
        const response = await fetch(url)
        if (!response.ok) throw new Error('Ошибка:' + response.status)
        const data = await response.json()
        this.recipes = data
      } catch (err) {
        this.error = err.message
        this.recipes = { results: [] }
      } finally {
        this.isLoading = false
      }
    },
  },
})

export const useIngredientsStore = defineStore('ingredientsStore', {
  state: () => ({
    dishes: { results: [] },
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchDishes(ingredients) {
      try {
        this.isLoading = true
        this.error = null
        const ingredientsString = ingredients.join(',')
        const url = `/api/ingredients?ingredients=${encodeURIComponent(ingredientsString)}`
        const response = await fetch(url)
        if (!response.ok) throw new Error('Ошибка:' + response.status)
        const data = await response.json()
        this.dishes = { results: data }
      } catch (err) {
        this.error = err.message
        this.dishes = { results: [] }
      } finally {
        this.isLoading = false
      }
    },
  },
})

export const useJokes = defineStore('joke', {
  state: () => ({
    joke: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchRandomJoke() {
      try {
        this.isLoading = true
        this.error = null
        const url = `/api/jokes`

        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

        const data = await response.json()
        this.joke = data.text
      } catch (err) {
        this.error = err.message
        this.joke = null
      } finally {
        this.isLoading = false
      }
    },
  },
  hydrate(state, initialState) {
    this.fetchRandomJoke()
  },
})

export const useSimilarDishes = defineStore('similarDishes', {
  state: () => ({
    similarDishes: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchSimilarDishes(id) {
      try {
        this.isLoading = true
        this.error = null
        const url = `/api/similarDishes?id=${id}`
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        this.similarDishes = await response.json()
      } catch (err) {
        this.error = err.message
        this.similarDishes = { results: [] }
      } finally {
        this.isLoading = false
      }
    },
  },
})

export const useInfoWine = defineStore('infoWine', {
  state: () => ({
    description: '',
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchWineDescription(wine) {
      try {
        this.isLoading = true
        this.error = null
        const url = `/api/wineDescription?wine=${encodeURIComponent(wine)}`
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        this.description = await response.json()
      } catch (err) {
        this.error = err.message
        this.description = ''
      } finally {
        this.isLoading = false
      }
    },
  },
})

export const useWineRecommendations = defineStore('wineRecommendations', {
  state: () => ({
    recommendations: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchWineRecommendations(wine) {
      try {
        this.isLoading = true
        this.error = null
        const url = `/api/wineRecommendations?wine=${encodeURIComponent(wine)}`
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        this.recommendations = data.recommendedWines || []
      } catch (err) {
        this.error = err.message
        this.recommendations = []
      } finally {
        this.isLoading = false
      }
    },
  },
})
