<template>
    <div class="row journey-container">
        <div class="col-12 page-heading">
            <h1 class="justify-content-lg-center">{{ journey.name }}</h1>
            <template v-if="journey.tags">
                <div class="tags-container">
                    <span v-for="tag in journey.tags" class="badge badge-pill badge-warning">{{ tag }}</span>
                </div>
            </template>
        </div>
        <div v-if="steps.length == 0" class="col-12 page-heading">
                <h3 class="color--primary">It  seems you dont have any steps defined on your user journey.</h3>
                <h4 class="color--primary">Why dont you start creating the first one?</h4>
                <button v-on:click="addStepStarted = true" class="btn btn-primary">Add step</button>
        </div>
        <div v-else class="col-12">
            <div class="steps-container row justify-content-lg-center">
                <div v-for="(step, index) in steps" class="col-12 col-lg-10 ">
                    <div class="user-journey-step-container">
                        <div class="card user-journey-step">
                      <template v-if="step.nameInViewMode">
                        <h4 v-on:click="step.nameInViewMode = !step.nameInViewMode"  class="card-header"><span class="step-number">{{ step.number }}</span>{{ step.name }}</h4>
                      </template>
                      <template v-else>
                        <div class="card-header edit-mode-container">
                          <div class="row justify-content-center form-inline">
                            <div class="col-10">
                              <input type="text" v-model="step.name" class="form-control full">
                            </div>
                            <div class="col-2">
                              <button v-on:click="updateJourney(step, 'name')" class="btn btn-primary  btn-block">Save</button>
                            </div>
                          </div>
                        </div>
                      </template>
                      <div class="card-body">
                        <template v-if="step.descriptionInViewMode">
                          <p v-on:click="step.descriptionInViewMode = !step.descriptionInViewMode" class="card-text">{{ step.description }}</p>
                        </template>
                        <template v-else>
                          <textarea type="text" v-model="step.description" class="form-control"></textarea>
                          <br>
                          <button v-on:click="updateJourney(step, 'description')" class="btn btn-primary">Save</button>
                        </template>
                      </div>
                      <template v-if="step.imageInViewMode">
                        <div class="card-block">
                          <img v-if="step.imageSrc != ''" v-on:click="step.imageInViewMode = !step.imageInViewMode" :src="step.imageSrc" class="card-img-bottom">
                          <p v-else v-on:click="step.imageInViewMode = !step.imageInViewMode" class="image-src"><i>Click here to provide an image</i></p>
                        </div>
                      </template>
                      <template v-else>
                        <div class="edit-mode-container">
                          <div v-if="!fileUploading" class="row form-inline">
                            <div class="col-10">
                              <input type="text" v-model="step.imageSrc" class="form-control full">
                              <input @change="uploadFile($event, step)" type="file">
                            </div>
                            <div class="col-2">
                              <button v-on:click="updateJourney(step, 'image')" class="btn btn-primary btn-block">Save</button>
                            </div>
                          </div>
                          <div v-else class="row form-inline">
                            <div class="col-12">
                              <loader></loader>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-if="(!step.nameInViewMode || !step.descriptionInViewMode || !step.imageInViewMode)">
                          <button @click="deleteStep(index)" class="btn btn-danger btn-sm">Delete step</button>
                      </template>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { 
        mapGetters,
        mapMutations
    } from 'vuex';
    
    export default {
        computed: {
            ...mapGetters([
                'journey'
            ]),
            steps: function() {
                if (this.journey.steps) {
                    let stepsWithControlProperties = this.journey.steps;

                    stepsWithControlProperties.forEach(step => {
                        step.nameInViewMode = true;
                        step.descriptionInViewMode = true;
                        step.imageInViewMode = true;
                        step.tagsInViewMode = true;
                    });

                    return stepsWithControlProperties;
                }

               return [];

            }
        },
        data () {
            return {
            }
        },
        methods: {
            ...mapMutations([
                'journey'
            ]),
            updateJourney: function(step, field) {
                let journey = this.journey;
                let journeyKey = journey['.key'];

                // create a copy of the journey
                journey = {...journey};
                // remove the .key attribute
                delete journey['.key'];

                // update the object in firebase
                this.$firebaseRefs.journeys.child(journeyKey).set(journey);

                // Set back to viewMode the field that was just edited
                if (field === 'name') {
                    step.nameInViewMode = true;
                } else if (field === 'description') {
                    step.descriptionInViewMode = true;
                } else {
                    step.imageInViewMode = true;
                }
            },
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('journey', {});
            next();
        }
    }
</script>

<style lang="scss">
    .tags-container {
        span.badge.badge-pill {
            margin: 0 2px;
        }
    }
</style>
