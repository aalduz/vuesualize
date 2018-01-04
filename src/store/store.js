import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { db } from '../firebase'; 

const state = {
    currentUser: null,
    userData: null,
    project: null,
    journeys: null,
    journey: null,
    step: null,
    isPrintView: false,
}

const mutations = {
    authUser (state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
        state.userEmail = userData.email;
    },
    userData (state, userData) {
        state.userData = userData;
    },

    currentUser (state, user) {
        state.currentUser = user;
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

    journeys(state, journeys) {
        state.journeys = journeys;
    },

    journey(state, journey) {
        state.journey = journey;
    },

    step(state, step) {
        state.step = step;
    },

    isPrintView(state, value) {
        state.isPrintView = value;
    },

    clearState(state) {
        state.currentUser = null;
        state.userData =  null;
        state.project =  null;
        state.journeys =  null;
        state.journey =  null;
        state.step = null;
    }
}

const actions = {
    signUp ({commit, dispatch}, authData) {
        return new Promise((resolve,reject) => {
            firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
                .then(res => {
                    dispatch('storeUserInDB', res);
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    storeUserInDB({commit, dispatch}, userData) {
        console.log(userData);
        let usersRef = db.ref('users');
        let user = {
            email: userData.email,
            uid: userData.uid
        }

        usersRef.push(user).then(snapshot => {
            console.log(snapshot);
            commit('userData', user);
        });
    },
    signIn ({commit, dispatch, store}, authData) {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    signOut ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut()
                .then(res  => {
                    // Sign-out successful.
                    commit('userData', null);
                    commit('currentUser', null);
                    resolve(res);
                }).catch(function(error) {
                    // An error happened.
                    reject(error);
                });
        });
    },
    currentUser ({commit}, user) {
        commit('currentUser', user);
    },
    userData ({commit}, userData) {
        commit('userData', userData);
    },
    fetchUserData ({commit}, uid) {
        db.ref('users').orderByChild('uid').equalTo(uid).once('value', snap =>{
            let user = snap.val();
            let userData = Object.values(user)[0];

            commit('userData', userData);
        });
    },

    fetchUserJourneys ({commit, state}) {
        // return new Promise((resolve, reject) => {
        let uid = state.currentUser.uid;
            db.ref('journeys')
                .orderByChild('uid')
                .equalTo(uid)
                .once('value', snap => {
                    let journeys = null;
                    let value = snap.val();
                    if (value) {
                        let index = 0;

                        journeys = Object.values(value);

                        snap.forEach((snapData) => {
                            journeys[index].key = snapData.key;
                            index++;
                        });
                    }
                    commit('journeys', journeys);
            })
                // .then(res => resolve(res))
                // .catch(error => reject(error))
        // });
    },

    deleteJourney ({commit, dispatch, state}, journey) {
        db.ref('journeys')
            .child(journey.key).remove(function(){
                dispatch('fetchUserJourneys');
            });
    },

    udpateJourney ({dispatch}, journeyUpdated) {
        return new Promise((resolve, reject) => {
            let journeysRef = db.ref('journeys');

            journeysRef.child(journeyUpdated.key).set(journeyUpdated, err => {
                if (err) {
                    reject(err);
                } else {
                    dispatch('fetchUserJourneys');
                    resolve();
                }
            });
        });
    },

    journey ({commit}, journey) {
        commit('journey', journey);
    },

    step ({commit}, step) {
        commit('step', step);
    },

    printView({commit}, value) {
        commit('isPrintView', value);
    },

    clearState ({commit} ) {
        commit('clearState');
    }

}

const getters = {
    currentUser (state) {
        return state.currentUser
    },

    userData (state) {
        return state.userData
    },

    // To review
    journey (state) {
        return state.journey;
    },

    journeys (state) {
        return state.journeys;
    },

    step (state) {
        return state.step;
    },

    isPrintView (state) {
        return state.isPrintView;
    }
}

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
});
