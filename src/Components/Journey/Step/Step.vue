<template>
    <transition
        enter-active-class="animated rubberBand">
        <div class="user-journey-step-container"
            :class="userJourneyStepContainerClasses">
            <template v-if="!isEditMode">
                <div class="card user-journey-step">
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
                        <p class="card-text">{{step.description}}</p>
                    </div>
                    <img 
                        v-if="step.imageSrc"
                        :src="step.imageSrc"
                        class="card-img-bottom">
                </div>
            </template>
            <template v-else>

            </template>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['step', 'index'],
    computed: {
        userJourneyStepContainerClasses () {
            return {
                no_children : !this.step.childs,
                with_children : this.step.childs
            }
        }
    },
    data () {
        return {
            isEditMode : false,
        }
    }
}
</script>

<style>

</style>
