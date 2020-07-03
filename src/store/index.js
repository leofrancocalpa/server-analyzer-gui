import Vue from 'vue'
import Vuex from 'vuex'
import analyzer from './modules/analyzer.js'



Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    analyzer
  },
  strict: debug,
})
