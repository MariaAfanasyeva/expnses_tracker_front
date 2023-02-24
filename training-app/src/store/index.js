import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`https://api.apilayer.com/fixer/latest&symbols=USD,EUR,BYN`, {
        headers: {
          'apikey': key
      }})
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category
  }
})
