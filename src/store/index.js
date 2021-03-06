import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { format } from 'date-fns'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    token: localStorage.getItem('user-token') || null,
    loading: false,
    user: {},
    snackbar: {
      show: false,
      text: ''
    },
    START: process.env.VUE_APP_TIME_START,
    END: process.env.VUE_APP_TIME_END,
    mock: {
      day: null,
      hour: null
    },
    admin: false,
    day: 0,
    hour: 0,
    minute: 0
  },
  getters: {
    getToken: state => state.token,
    isAuthenticated: state => !!state.token,
    isLoading: state => state.loading,
    getHeader(state) {
      return { headers: { 'Authorization': 'Bearer ' + state.token }}
    },
    getUser: state => state.user,
    getMock: state => state.mock,
    isAdmin: state => state.admin,
    getDay: state => state.day,
    getHour: state => state.hour,
    getMinute: state => state.minute
  },
  mutations: {
    login: (state, token) => state.token = token,
    logout: state => state.token = null,
    toggleLoading: state => state.loading = !state.loading,
    setUser: (state, user) => state.user = user,
    showSnackbar: (state, text) => {
      state.snackbar.show = true
      state.snackbar.text = text
    },
    setMock: (state, payload) => state.mock = payload,
    setAdmin: (state, admin) => state.admin = admin,
    setDay: (state, day) => state.day = day,
    setHour: (state, hour) => state.hour = hour,
    setMinute: (state, minute) => state.minute = minute
  },
  actions: {
    async verifyLogin ({ commit }, credentials) {
      try {
        const response = await axios.post(process.env.VUE_APP_BASEURL + '/users/login', credentials)
        if (response.data.token) {
          localStorage.setItem('user-token', response.data.token);
          commit('login', response.data.token)
          commit('setUser', response.data.user)
          commit('setAdmin', response.data.user.role === 'ADMIN')
        }
        return response
      } catch (e) {
        localStorage.removeItem('user-token');
      }
    },
    async validateToken ({commit}, token) {
      console.log('validate token')
      try {
        const response = await axios.post(process.env.VUE_APP_BASEURL + '/users/me', {token})
        commit('setUser', response.data)
        commit('setAdmin', response.data.role === 'ADMIN')
      } catch (error) {
        console.error(error)
        commit('logout')
        localStorage.removeItem('user-token')
      }
    },
    async registerUser({commit}, payload) {
      try {
        await axios.post(process.env.VUE_APP_BASEURL + '/users', payload)
        commit('showSnackbar', `Benutzer ${payload.username} angelegt!`)
      } catch (error) {
        console.error(error)
      }
    },
    async updateUser({commit}, payload) {
      try {
        const response = await axios.put(process.env.VUE_APP_BASEURL + '/users/me', payload, this.getters.getHeader)
        commit('setUser', response.data)        
      } catch (error) {
        console.error(error)
      }
    },
    async startGame({commit}) {
      const result = await axios.post(process.env.VUE_APP_BASEURL + '/scores/start', {}, this.getters.getHeader)
      commit('showSnackbar', result.data)
    },
    async stopGame({commit}) {
      const result = await axios.delete(process.env.VUE_APP_BASEURL + '/scores/', this.getters.getHeader)
      commit('showSnackbar', result.data)
    },
    async submitSolution({ commit }, payload) {
      try {
        commit('toggleLoading')
        await axios.post(process.env.VUE_APP_BASEURL + `/tasks/${payload.day}`, payload.data, this.getters.getHeader)        
        commit('showSnackbar', 'Antwort abgegeben')
      } catch (error) {
        console.error(error)
        commit('showSnackbar', 'Hoppla...Da ist was schief gelaufen')
      } finally {
        commit('toggleLoading')
      }
    },
    async getScores({ commit }){
      try {
        commit('toggleLoading')
        const response = await axios.get(process.env.VUE_APP_BASEURL + '/scores')
        return response
      } catch (error) {
        console.error(error)
      } finally {
        commit('toggleLoading')
      }
    },
    async getScoreForPlayer({ commit }){
      try {
        commit('toggleLoading')
        const response = await axios.get(process.env.VUE_APP_BASEURL + `/scores/player?name=${this.getters.getUser.username}`, this.getters.getHeader)
        return response
      } catch (error) {
        console.error(error)
      } finally {
        commit('toggleLoading')
      }
    },
    setTime: ({ commit }) => {
      commit('setDay', parseInt(format(new Date(), 'i')))
      commit('setHour', parseInt(format(new Date(), 'H')))
      commit('setMinute', format(new Date(), 'mm'))
    },
    logout: ({ commit }) => {
      commit('logout')
      localStorage.removeItem('user-token')
    }
  }
})
