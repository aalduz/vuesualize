<template>
    <div id="app">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <app-header></app-header> 
                </div>
            </div>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    // Components
    import Header from './Components/Header/Header.vue'

    // Firebase
    import Firebase from 'firebase';

    let config = {
        apiKey: "AIzaSyDHRi9CfrPeGOUOleV787rUbI-lYI5qOb0",
        authDomain: "vuesualize-5ec29.firebaseapp.com",
        databaseURL: "https://vuesualize-5ec29.firebaseio.com",
        projectId: "vuesualize-5ec29",
        storageBucket: "vuesualize-5ec29.appspot.com",
        messagingSenderId: "716786171870"
    };

    let app = Firebase.initializeApp(config);
    let db = app.database();
    let projectsRef = db.ref('projects');
    let journeysRef = db.ref('journeys');
    let storageRef = app.storage().ref();
    let imagesRef = storageRef.child('images');

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
        margin-top: 15px;
    }

    .page-heading > h1,
    .page-heading > h2 {
        color: white;
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
</style>

