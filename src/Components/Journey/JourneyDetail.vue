<template>
    <transition enter-active-class="animated bounceInDown" mode="in-out">
        <div class="container">
            <div class="action-btn-container">
                <router-link 
                    to="/journey"
                    tag="button"
                    class="btn btn-link">
                    <i class="fa fa-chevron-left"></i>
                    <span>Back</span>
                </router-link>
            </div>
            <div class="row journey-container">
                <div class="col-12 page-heading">
                    <h1 class="justify-content-lg-center">{{ journey.name }}</h1>
                    <template v-if="journey.tags">
                        <div class="tags-container">
                            <span v-for="tag in journey.tags" class="badge badge-pill badge-warning">{{ tag }}</span>
                        </div>
                    </template>
                </div>
                <div v-if="!journey.steps" class="col-12 page-heading">
                    <transition
                        name="component-fade"
                        mode="out-in">
                        <template v-if="!addStepStarted">
                            <div>
                                <h3 class="color--primary">It  seems you dont have any steps defined on your user journey.</h3>
                                <h4 class="color--primary">Why dont you start creating the first one?</h4>
                                <button v-on:click="addStepStarted = true;" class="btn btn-primary">Add step</button>
                            </div>
                        </template>
                    </transition>
                </div>
                <div v-else class="col-12">
                    <div class="steps-container row justify-content-lg-center">
                        <div v-for="(step, index) in journey.steps" class="col-12 col-lg-10 ">
                            <transition name="component-fade" mode="out-in">
                                <step
                                    :index="index"
                                    :last="index == journey.steps.length - 1"
                                    :addStepStarted="addStepStarted"
                                    @delete="deleteStep(index)"
                                    @add="addStep()"></step>
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
                this.journey = null;
                this.journey = this.$store.getters.journey;
            },
            deleteStep: function (stepIndex) {
                let stepToDelete = this.journey.steps[stepIndex];
                this.journey.steps = this.journey.steps.filter(step => step !== stepToDelete);

                this.$store.dispatch('udpateJourney', this.journey)
                    .then(() => {
                        // Update step
                        this.$store.commit('journey', this.journey);
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
