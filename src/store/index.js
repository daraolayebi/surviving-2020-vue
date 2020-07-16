import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
const BASE_URL = 'https://surviving-2020.herokuapp.com/api/v1'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        responses: [],
        count: '',
        formLoading: false,
        formSubmitted: null
    },
    getters: {
        responses: state => state.responses,
        count: state => state.count,
        formLoading: state => state.formLoading,
        formSubmitted: state => state.formSubmitted
    },
    actions: {
        SubmitResponse({ commit }, payload) {
            commit('FORM_LOADING')
            Axios.post(`${BASE_URL}/response`, payload)
                .then((response) => {
                    commit('RESPONSE_SUBMITTED', response)
                }).catch((error) => {
                    commit('RESPONSE_SUBMITTED_ERROR', error)
                })
        },
        FetchResponses({ commit }) {
            Axios.get(`${BASE_URL}/responses`)
                .then((response) => {
                    commit('ALL_RESPONSES', response.data.data)
                }).catch((error) => {
                    commit('ALL_RESPONSES_ERROR', error)
                })
        },
        FetchResponsesCount({ commit }) {
            Axios.get(`${BASE_URL}/responses/count`)
                .then((response) => {
                    commit('RESPONSES_COUNT', response.data.data)
                }).catch((error) => {
                    commit('ALL_RESPONSES_ERROR', error)
                })
        },
    },
    mutations: {
        FORM_LOADING: (state, payload) => {
            state.formLoading = true
        },
        RESPONSE_SUBMITTED: (state) => {
            state.formLoading = false
            state.formSubmitted = true
        },
        RESPONSE_SUBMITTED_ERROR: (state) => {
            state.formLoading = false
            state.formSubmitted = false
        },
        ALL_RESPONSES: (state, payload) => {
            state.responses = payload
        },
        RESPONSES_COUNT: (state, payload) => {
            state.count = payload
        },
        RESET_STATE: (state) => {
            state.formLoading = false
            state.formSubmitted = null
        }
    }
})

export default store
