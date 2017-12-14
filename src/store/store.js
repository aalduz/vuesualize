import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import globalAxios from 'axios';
import { firebaseConfig }  from '../firebase';

globalAxios.defaults.baseURL = 'https://vuesualize-5ec29.firebaseio.com';
// globalAxios.defaults.headers.common['Authorization'] = 'fasfdsa'
globalAxios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = globalAxios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const resInterceptor = globalAxios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

globalAxios.interceptors.request.eject(reqInterceptor)
globalAxios.interceptors.response.eject(resInterceptor)

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        user: null,
        journeys: {},
        journey: {}
    },
    mutations: {
        authUser (state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
        },
        storeUser (state, user) {
            state.user = user;
        },
        // To review 
        addJourney(state, journey) {
            state.journeys.push(journey);
        },
        updateJourney(state, journey) {
            let journeyKey = journey['.key'];
            state.journeys[journeyKey] = journey;
            state.journey = journey;
        },

        journey(state, journey) {
            state.journey = journey;
        }
    },
    actions: {
        signup ({commit, dispatch}, authData) {
            axios.post('/signupNewUser?key=' + firebaseConfig.apiKey, {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res);
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    })
                    dispatch('storeUser', authData)
                })
                .catch(error => console.log(error))
        },
        login ({commit, dispatch}, authData) {
            axios.post('/verifyPassword?key=' + firebaseConfig.apiKey, authData)
                .then(res => {
                    console.log(res);
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    })
                    dispatch('fetchUser')
                })
                .catch(error => console.log(error))
        },
        storeUser ({commit, state}, userData) {
            console.log('storeUser action');
            if (!state.idToken) {
                return
            }
            globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
                .then(res => {
                    console.log(res)
                    commit('storeUser', userData);
                })
                .catch(error => console.log(error))
        },
        fetchUser ({commit, state}) {
            console.log(state);
            if (!state.idToken) {
                return
            }
            globalAxios.get('/users.json' + '?auth=' + state.idToken)
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    const users = [];

                    for (let key in data) {
                        const user = data[key];
                        user.id = key;
                        users.push(user);
                    }
                    console.log(users);
                    // commit('storeUser', users.filter(user => user['id'] == state.user.userId)[0]);
                    commit('storeUser', users[0]);
                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        
        // To review
        journey(state) {
            return state.journey;
        }
    },
})