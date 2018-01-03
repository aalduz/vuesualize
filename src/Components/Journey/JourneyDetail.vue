<template>
    <transition enter-active-class="animated bounceInDown" mode="in-out">
        <div class="container">
            <div class="row justify-content-lg-center">
                <div class="col-12 col-lg-10">
                    <div class="action-btn-container">
                        <router-link 
                            to="/journey"
                            tag="button"
                            class="btn btn-link">
                            <i class="fa fa-chevron-left"></i>
                            <span>Back</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="row journey-container justify-content-lg-center">
                <section class="col-12 col-lg-10 page-heading">
                    <div class="journey-avatar">
                        <img :src="journey.imageSrc == '' 
                                ? 'https://firebasestorage.googleapis.com/v0/b/vuesualize-5ec29.appspot.com/o/images%2Finviqa-02.svg?alt=media&token=ad629fc3-6bac-4022-9d36-ee1255e4d9f2'
                                : journey.imageSrc">
                    </div>
                    <h1 class="justify-content-lg-center">{{ journey.name }}</h1>
                    <template v-if="journey.tags">
                        <div class="tags-container">
                            <span v-for="tag in journey.tags" class="badge badge-pill badge-warning">{{ tag }}</span>
                        </div>
                    </template>
                    <hr class="page-heading">
                </section>
                <div v-if="!journey.steps" class="col-12 col-lg-10">
                    <transition
                        name="component-fade"
                        mode="out-in">
                        <template v-if="!addStepStarted">
                            <div class="empty-item">
                                <h3 class="color--primary">It seems you dont have any steps defined on your user journey.</h3>
                                <h4 class="color">Why dont you start creating the first one?</h4>
                                <button v-on:click="addStepStarted = true;" class="btn btn-primary">Add step</button>
                            </div>
                        </template>
                    </transition>
                    <transition
                        name="component-fade"
                        mode="out-in">
                        <template v-if="addStepStarted">
                            <div class="first-step">
                                <step-new
                                @view="addStepStarted = false"
                                @created="updateJourney"></step-new>
                            </div>
                        </template>
                    </transition>
                </div>
                <div v-else class="col-12">
                    <div class="steps-container row justify-content-lg-center">
                        <div v-for="(step, index) in journey.steps" class="col-12 col-lg-10 ">
                            <transition name="component-fade" mode="out-in">
                                <step
                                    :step="step"
                                    :index="index"
                                    :last="index == journey.steps.length - 1"
                                    :addStepStarted="addStepStarted"
                                    @delete="deleteStep(index)"
                                    @add="addStep"></step>
                            </transition>
                        </div>
                    </div>
                    <div class="row justify-content-lg-center">
                        <div class="col-12 col-lg-10">
                            <hr v-if="addStepStarted" class="new-step">
                            <transition
                                name="component-fade"
                                mode="out-in">
                                <template v-if="addStepStarted">
                                    <step-new
                                        @view="addStepStarted = false"
                                        @created="updateJourney"></step-new>
                                </template>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { 
        mapGetters,
        mapMutations
    } from 'vuex';

    import Step from './Step/Step';
    import StepNew from './Step/StepNew';

    export default {
        components: {
            step: Step,
            stepNew: StepNew
        },

        data () {
            return {
                addStepStarted: false,
                journey: this.$store.getters.journey
            }
        },
        methods: {
            updateJourney: function() {
                this.addStepStarted = false;
                let journeyUpdated = this.$store.getters.journey;
                this.journey = {...journeyUpdated};
            },
            deleteStep: function (stepIndex) {
                let stepToDelete = this.journey.steps[stepIndex];
                this.journey.steps = this.journey.steps.filter(step => step !== stepToDelete);

                this.$store.dispatch('udpateJourney', this.journey)
                    .then(() => {
                        // Update step
                        this.$store.dispatch('journey', this.journey);
                        this.updateJourney();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            addStep: function () {
                this.addStepStarted = true;
            }
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
