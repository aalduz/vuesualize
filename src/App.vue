<template>
    <div id="app">
        <!-- <div class="container-fluid header-container--top">
            <div class="row">
                <div class="col-12">
                    <router-view name="header-top"></router-view>
                </div>
            </div>
        </div> -->
        <transition name="slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    // Components
    import Header from './Components/Header/Header.vue'

    
    // let projectsRef = db.ref('projects');
    // let journeysRef = db.ref('journeys');
    // let storageRef = app.storage().ref();
    // let imagesRef = storageRef.child('images');

    export default {
        name: 'app',
        methods: {
            goToJourney(journey) {
                console.log(journey);
            },
        },
        components: {
            appHeader: Header,
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

    .page-heading > h1,
    .page-heading > h2,
    .page-heading > h3,
    .page-heading > h4 {
        color: white;
        text-align: center;
    }

    .page-heading > h3,
    .page-heading > h4 {
        color: #2a9fda;
        text-align: center;
    }



    .page-heading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin: 2rem 0;
        padding-bottom: 2rem;

        border-bottom: 1px solid white;
    }

    .page-heading button {
        margin-top: 2rem;
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
 
