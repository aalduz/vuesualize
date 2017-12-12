<template>
    <div  class="row">
        <template>
            <div class="col-12 page-heading">
                <h1 class="justify-content-lg-center">These are your Journeys</h1>
                <button @click="navigateToNewJourney" class="btn btn-primary">Add Journey</button>
            </div>
            <div v-for="journey in journeys" @click="navigateToJourney(journey)" class="col-12 col-sm-6 col-md-4 col-lg-3">
                <thumbnail :item="journey" :imageSrc="journey.imageSrc ? journey.imageSrc : ''"></thumbnail>
            </div>
        </template>
    </div>
</template>

<script>
    import { 
        mapMutations
    } from 'vuex';

    import { db } from '../../firebase';
    import Thumbnail from '../Thumbnail/Thumbnail';
    import JourneyNew from './JourneyNew';

    export default {
        components: {
            thumbnail: Thumbnail,
            journeyNew: JourneyNew
        },
        data () {
            return {
                isViewMode: true,
                journeys: {},
            }
        },
        firebase: {
            journeys: {
                source: db.ref('journeys'),
                cancelCallback(err) {
                    console.error(err);
                }
            }
        },
        methods: {
            ...mapMutations([
                'addJourney',
                'updateJourney',
                'journey'
            ]),
            navigateToNewJourney: function() {
                this.$router.push('/journey/new')
            },
            navigateToJourney: function(journey) {
                let journeyId = journey['.key'];
                this.$store.commit('journey', journey);

                this.$router.push('/journey/'+journeyId);
            },
        },
        watch: {
            '$route'(to, from) {
                this.id = to.params.id;
            }
        }
    }
</script>
