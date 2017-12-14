import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import { firebaseConfig }  from '../firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        journeys: {},
        journey: {}
    },
    mutations: {
        authUser (state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
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
        signup ({commit}, authData) {
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
                })
                .catch(error => console.log(error))
        },
        login ({commit}, authData) {
            axios.post('/verifyPassword?key=' + firebaseConfig.apiKey, authData)
                .then(res => {
                    console.log(res);
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    })
                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        
        
        // To review
        journey(state) {
            return state.journey;
        }
    },
})