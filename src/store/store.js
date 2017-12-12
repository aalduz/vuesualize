import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        id: null,
        journeys: {},
        journey: {}
    },
    getters: {

        journey(state) {
            return state.journey;
        }
    },
    mutations: {
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
    }
})