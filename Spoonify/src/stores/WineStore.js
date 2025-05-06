import { defineStore } from 'pinia'
export const useWineSelectionStore = defineStore('wineSelection', {
  state: () => ({
    userChoiceOne: '',
    userChoiceTwo: '',
    confirmedWine: null,
  }),
  actions: {
    setSelections(category, subCategory, confirmed) {
      this.userChoiceOne = category
      this.userChoiceTwo = subCategory
      this.confirmedWine = confirmed
    },
  },
})
