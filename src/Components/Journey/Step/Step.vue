<template>
    <div class="user-journey-step-container"
        :class="userJourneyStepContainerClasses">
        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated bounceOut"
            mode="in-out">
            <template v-if="!isEditMode">
                <div class="card user-journey-step"
                    :class="modeButtonsEngaged"
                    @click="showModeButtons = !showModeButtons">
                    <transition enter-active-class="animated zoomInRight"
                                leave-active-class="animated zoomOutRight">
                        <template v-if="showModeButtons">
                            <div class="mode-buttons-container">
                                <button
                                    @click="toEditMode($event)"
                                    class="btn btn-primary">
                                    <i class="fa fa-pencil"></i>
                                    <small class="action-item-text">Edit</small>
                                </button>
                                <button 
                                    @click="deleteStep($event)"
                                    class="btn btn-danger">
                                    <i class="fa fa-trash"></i>
                                    <small class="action-item-text">Delete</small>
                                </button>
                            </div>
                        </template>
                    </transition>
                    <div class="card-header">
                        <h4>
                            <span class="step-number">{{ index + 1 }}</span>
                            {{step.name}}
                        </h4>
                        <template v-if="step.tags">
                            <div class="tags-container">
                                <span v-for="(tag,index) in step.tags"
                                    v-if="index < 3"
                                    class="badge badge-pill badge-warning">{{ tag }}</span>
                                <span v-if="step.tags.length > 3">...</span>
                            </div>
                        </template>
                    </div>
                    <div class="card-body">
                        <p class="card-text multiline">{{ step.description }}</p>
                    </div>
                    <img 
                        v-if="step.imageSrc"
                        :src="step.imageSrc"
                        class="card-img-bottom">
                    <!-- <div
                        v-else
                        class="card-img-bottom"><i>No image for this step.</i></div> -->
                </div>
            </template>
        </transition>
        <transition
            enter-active-class="animated bounceIn"
            leave-active-class="animated bounceOut"
            mode="in-out">
            <template v-if="isEditMode">
                <step-edit
                    :step="step"
                    :index="index"
                    @view="isEditMode = false"
                    @update="updatedStep"></step-edit>
            </template>
        </transition>
        <div 
            v-if="last && !isEditMode && !addStepStarted && !isPrintView"
            class="action-buttons-container"
            :class="lastStepClasses">
            <button
                @click="$emit('add')"
                class="btn btn-primary">
                <i class="fa fa-plus"></i>
                <span>Add Step</span>
            </button>
            <button
                @click="print(true)"
                class="btn btn-secondary print">
                <i class="fa fa-print"></i>
                <span>Print Journey</span>
            </button>
        </div>
    </div>
</template>

<script>
import StepEdit from './StepEdit';
import { 
    mapGetters,
} from 'vuex';

export default {
    components: {
        stepEdit: StepEdit
    },
    props: [ 'step', 'index', 'last', 'addStepStarted'],
    computed: {
        ...mapGetters([
            'isPrintView'
        ]),
        userJourneyStepContainerClasses () {
            return {
                no_children : !this.step.childs,
                with_children : this.step.childs,
                last_step: this.last
            }
        },
        modeButtonsEngaged () {
            return {
                mode_buttons_on: this.showModeButtons
            }
        },
        lastStepClasses () {
            return {
                last_step: this.last
            }
        }

    },
    methods: {
        toEditMode (event) {
            event.stopPropagation();
            this.isEditMode = true;
            this.showModeButtons = false;
        },
        deleteStep (event) {
            event.stopPropagation();
            this.showModeButtons = false;
            this.$emit('delete');
        },
        updatedStep () {
            this.$emit('update');
            this.isEditMode = false;
            this.step = this.$store.getters.step;

            // update journey
            let journey = this.$store.getters.journey;
            journey.steps[this.index] = this.step;
            this.$store.commit('journey', journey);
        },
        print (value) {
            this.$store.dispatch('printView', value);
        }
    },
    data () {
        return {
            isEditMode : false,
            showModeButtons: false,
        }
    }
}
</script>

<style>

</style>
