import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        journeys: []
    },
    getters: {
        journeysByUser: (state) => {

            return state.journeys;
        }
    },
    mutations: {
        increment: state => {
            let count = state.journeys.length;
            state.journeys.push(count + 1);
        },
        decrement: state => {
            state.journeys.pop();
            console.log(state.journeys);
        }
    }
})