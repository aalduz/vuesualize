<template>
<div class="card user-journey-step">
    <modal v-if="showModalPreventLeave" 
            @cancel="showModalPreventLeave = false"
            @confirm="discardChanges"
            :autoDismiss="false"
            :confirmCancel="true">
        <h3 slot="header">Unsaved changes!</h3>
        <p slot="body">Are you sure you want to leave?</p>
        <span slot="confirm-text">Discard changes</span>
    </modal>
    <modal v-if="showModalNameEmpty"
            @ok="showModalNameEmpty = false"
            @dismiss="showModalNameEmpty = false"
            :autoDismiss="true"
            :confirmCancel="false">
        <h3 slot="header">The name of your Step is empty</h3>
        <p slot="body">In order to save it, you need to provide some value</p>
    </modal>
    <div v-if="!savingStep" class="container edit-mode-container" id="stepForm">
        <div class="form-group">
            <label for="stepName">Step Name *</label>
            <input v-model="stepData.name"
                :class="nameInputClasses"
                @click="nameIsDirty = true; preventLeave = true"
                type="text"
                class="form-control"
                id="stepName"
                aria-describedby="stepName"
                placeholder="Enter the name of the Step">
            <small id="stepNameHelp" 
                class="form-text text-muted">Think of it as the Subject of an email.</small>
        </div>
        <div class="form-group">
            <label for="stepDescription">Step Description</label>
            <textarea v-model="stepData.description"
                class="form-control"
                id="stepDescription"
                aria-describedby="stepDescription"
                placeholder="Type the key aspects of the step."
                @change="preventLeave = true"></textarea>
            <small id="stepDescriptionHelp"
                class="form-text text-muted">Brief description of what happens on the step</small>
        </div>
        <div class="form-group">
            <label for="stepImage">Step image</label>
            <div class="input-group">
                <input v-model="stepData.imageSrc"
                    type="text" class="form-control"
                    id="stepImg"
                    aria-describedby="stepImg"
                    placeholder="Image src"
                    @change="preventLeave = true"
                    readonly>
                <div class="input-group-btn">
                    <label class="btn btn-info">
                        Browse <input @change="processFile($event)" type="file"  id="stepImgUploadBtn" aria-describedby="stepImageUploadButton" hidden>
                    </label>
                </div>
            </div>
            <small id="imageSrcHelp" class="form-text text-muted">Is there any image you would like to attach to your Step.</small>
        </div>
        <div class="row justify-content-end">
            <div class="col-12">
                <button @click="saveStep" class="btn btn-primary">Save Step</button>
                <button @click="cancel" class="btn btn-default">Cancel</button>
            </div>
        </div>
    </div>
    <div v-else class="row">
        <div class="col-12">
            <loader></loader>
        </div>
    </div>
</div>
</template>

<script>
    import { 
        mapGetters,
    } from 'vuex';

    import { db, storageRef, imagesRef } from '@/firebase';
    import Loader from '@/Components/Loader/Loader';
    import Modal from '@/Components/Modal/Modal';
    export default {
        props: ['step', 'index'],
        components: {
            loader: Loader,
            modal: Modal
        },
        methods: {
            discardChanges () {
                console.info(this.step,this.stepData);
                this.$emit('view');
            },
            cancel () {
                if (this.preventLeave) {
                    this.showModalPreventLeave = true;
                } else {
                    this.preventLeave = false;
                    this.$emit('view');
                }
            },
            processFile: function(event) {
                var file = event.target.files[0];

                this.stepData.imageSrc = file.name;
                this.file = file;
                this.preventLeave = true;

            },
            storeJourney() {
                let journeyUpdated = {...this.journey};
                    journeyUpdated.steps[this.index] = {...this.stepData};

                let journeysRef = db.ref('journeys');
                journeysRef.child(this.journey.key).set(journeyUpdated, res => {
                    // to the callback
                    this.$store.commit('step', this.stepData);
                    // Update step
                    this.$emit('update');
                });
            },
            saveStep () {
                if (this.stepData.name == '') {
                    this.showModalNameEmpty = true;
                } else {
                    this.savingStep= true;
                    if (this.file['name'] != null) {
                        // upload Picture
                        let fileRef = storageRef.child(this.file.name);

                        let fileImagesRef = storageRef.child('images/' + this.file.name);

                        let vm = this;
                        fileImagesRef.put(this.file).then(function(snapshot) {

                            vm.stepData.imageSrc = snapshot.downloadURL;
                            vm.preventLeave = false;
                            vm.storeJourney();
                        });
                    } else {
                        this.storeJourney();
                    }
                }
            }
        },
        computed: {
            nameInputClasses: function() {
                return {
                    valid: this.step.name != '' && this.nameIsDirty,
                    invalid: this.step.name == '' && this.nameIsDirty
                }
            },
            ...mapGetters([
                'journey'
            ]),
        },
        data () {
            return {
                stepData: {...this.step},
                file: {},
                showModalPreventLeave: false,
                showModalNameEmpty: false,
                preventLeave: false,
                savingStep: false,
                nameIsDirty: false,
            }
        }

    }
</script>

<style lang="scss">

</style>