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
        userEmail: null,
        userData: null,
        project: null,
        journeys: null,
        journey: null
    },
    mutations: {
        authUser (state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
            state.userEmail = userData.email;
        },
        userData (state, user) {
            state.userData = user;
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
                    dispatch('storeUserInDB', authData)
                })
                .catch(error => console.log(error))
        },
        login ({commit}, authData) {
            return new Promise((resolve, reject) => {
                axios.post('/verifyPassword?key=' + firebaseConfig.apiKey, authData)
                .then(res => {
                    console.log(res);
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        email: authData.email
                    })
                    resolve(res);
                })
                .catch(error => reject(error))
            });
        },
        storeUserInDB ({commit, state}, userData) {
            console.log('storeUser action');
            if (!state.idToken) {
                return
            }
            globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
                .then(res => {
                    console.log(res)
                    commit('userData', userData);
                })
                .catch(error => console.log(error))
        },
        fetchUser ({commit, state}) {
            return new Promise((resolve, reject) => {
                console.log(state);
                globalAxios.get('/users.json?auth=' + state.idToken)
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
                        let user = users.filter(user => user['email'] == state.userEmail)[0];
                        console.log(user);
                        commit('userData', user);
                        resolve(user);
                    })
                    .catch(error => console.log(error))
            });
        }
    },
    getters: {
        user (state) {
            return state.userData
        },
        
        // To review
        journey(state) {
            return state.journey;
        }
    },
})