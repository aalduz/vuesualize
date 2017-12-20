<template>
    <div id="app">
        <div class="page-wrapper">
            <app-header></app-header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    // Components
    import Header from './Components/Header/Header.vue'
    import { auth }  from './firebase';
    import { mapGetters } from 'vuex';

    export default {
        name: 'app',
        components: {
            appHeader: Header
        },
        methods: {
            goToJourney(journey) {
                console.log(journey);
            },
        },
        computed: {
            ...mapGetters([
                'currentUser',
                'userData'
            ]),
        },
        mounted() {
            auth.onAuthStateChanged( user => {
                if (user && !this.$store.getters.currentUser) {
                    this.$store.dispatch('currentUser', user);
                }
                if (user && !this.$store.getters.userData) {
                    this.$store.dispatch('fetchUserData', user.uid);
                }
            });

        },
    }
</script>

<style lang="scss">
    
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }


    @import "styles/index";

    .slide-y-leave-active {
        transition: opacity 0.3s ease;
        opacity: 0;
        animation: slide-y-out 0.3s ease-out forwards;
    }

    .slide-y-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-y-enter-active {
        animation: slide-y-in 0.3s ease-out forwards;
    }

    @keyframes slide-y-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-y-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }

    .slide-x-leave-active {
        transition: opacity 0.3s ease;
        opacity: 0;
        animation: slide-x-out 0.3s ease-out forwards;
    }

    .slide-x-leave {
        opacity: 1;
        transform: translateY(0);
    }

    .slide-x-enter-active {
        animation: slide-x-in 0.3s ease-out forwards;
    }

    @keyframes slide-x-out {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-30px);
        }
    }

    @keyframes slide-x-in {
        0% {
            transform: translateX(-30px);
        }
        100% {
            transform: translateX(0);
        }
    }

</style>
 
