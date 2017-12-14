<template>
    <div id="app">
        <transition name="slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    // Components
    import Header from './Components/Header/Header.vue'

    export default {
        name: 'app',
        methods: {
            goToJourney(journey) {
                console.log(journey);
            },
        },
        components: {
            appHeader: Header
        },
        data () {
            return {

            }
        }
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

    .slide-leave-active {
        transition: opacity 0.3s ease;
        opacity: 0;
        animation: slide-out 0.3s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in 0.3s ease-out forwards;
    }

    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }

</style>
 
