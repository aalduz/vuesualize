<template>
    <div id="app">
        <template>
            <div class="container">
                <div class="row">
                    <div class="col-12 page-heading">
                        <h1 class="justify-content-lg-center">These are your projects</h1>
                        <button class="btn btn-primary">Add Project</button>
                    </div>
                </div>
                <div class="row">
                    <template v-for="journey in journeys">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3 cols">
                            <thumbnail :item="journey" :imageSrc="''"></thumbnail>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    // Components
    import Thumbnail from './components/Thumbnail/Thumbnail.vue';

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
            'thumbnail': Thumbnail,
        },
        data () {
            return {

            }
        },
        firebase: {
            projects: projectsRef,
            journeys: journeysRef
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

