<template>
    <div class="journey-content-edit">
        <div class="card">
            <modal v-if="showModalPreventLeave" 
                    @cancel="confirmChanges"
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
                <h3 slot="header">The name of your journey is empty</h3>
                <p slot="body">In order to save it, you need to provide some value</p>
            </modal>

            <div v-if="!savingJourney" class="container edit-mode-container" id="journeyForm">
                <div class="form-group">
                    <label for="journeyName">Journey Name *</label>
                    <input v-model="journeyData.name"
                        :class="nameInputClasses"
                        @click="nameIsDirty = true; preventLeave = true"
                        type="text"
                        class="form-control"
                        id="journeyName"
                        aria-describedby="journeyName"
                        placeholder="Enter the name of the journey">
                    <small id="journeyHelp" 
                        class="form-text text-muted">It can also be the name of the page where the journey is happening</small>
                </div>
                <tags-input
                    :tags="journeyData.tags"
                    @newTag="newTag(...arguments)"
                    @removeTag="removeTag(...arguments)"
                    >
                </tags-input>
                <div class="form-group">
                    <label for="stepImage">Journey image</label>
                    <div class="input-group">
                        <input v-model="journeyData.imageSrc"
                            type="text" class="form-control"
                            id="journeyImg"
                            aria-describedby="journeyImg"
                            placeholder="Image src"
                            readonly>
                        <div class="input-group-btn">
                            <label class="btn btn-info">
                                Browse <input @change="processFile($event)" type="file"  id="journeyImgUploadBtn" aria-describedby="journeyImgageUploadButton" hidden>
                            </label>
                        </div>
                    </div>
                    <small
                        v-if="!imageData"
                        id="imageSrcHelp" class="form-text text-muted">Is there any image you would like to attach to your Journey.</small>
                    <div
                        v-if="file">
                            <div class="image-preview">
                                <img
                                :src="imageData"
                                alt="Journey Image">
                                <button
                                    @click="discardImage"
                                    class="btn btn-secondary">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                    </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col-12">
                        <button @click="saveJourney" class="btn btn-primary">Save Journey</button>
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
        <hr class="page-heading">
    </div>
</template>

<script>
    import Loader from '../Loader/Loader';
    import Modal from '../Modal/Modal';
    import _ from 'lodash';
    import { helpers } from '@/main'
    import TagsInput from '../TagsInput/TagsInput';
    import { 
        mapGetters,
        mapActions
    } from 'vuex';

    export default {
        components: {
            loader: Loader,
            modal: Modal,
            tagsInput: TagsInput
        },
        computed: {
            ...mapGetters([
                'journey'
            ]),
            nameInputClasses: function() {
                return {
                    valid: this.journeyData.name != '' && this.nameIsDirty,
                    invalid: this.journeyData.name == '' && this.nameIsDirty
                }
            }
        },
        data () {
            return {
                journeyData: {
                    name: null,
                    imageSrc: null,
                    tags: [],
                    steps: [],
                    uid: null
                },
                initialData: null,
                file: null,
                imageData: '',
                savingJourney: false,
                nameIsDirty: false,
                showModalPreventLeave: false,
                showModalNameEmpty: false,
            }
        },
        mounted () {
            if (this.journey) {
                this.journeyData = helpers.object.copy(this.journey);
            }
            this.initialData = helpers.object.copy(this.journeyData);
        },
        methods: {
            ...mapActions([
                'updateJourney',
            ]),
            discardChanges () {
                this.$emit('view');
            },
            confirmChanges () {
                this.showModalPreventLeave = false;
            },
            cancel () {
                if (_.isEqual(this.initialData, this.journeyData)) {
                    this.discardChanges();
                } else {
                    this.showModalPreventLeave = true;
                }
            },
            newTag (processedTag) {
                this.journeyData.tags.push(processedTag);
            },
            removeTag (index) {
                this.journeyData.tags.splice(index,1);
            },
            processFile (event) {
                var file = event.target.files[0];

                this.journeyData.imageSrc = file.name;
                this.file = file;

                var reader = new FileReader();

                reader.onload = (event) => {
                    this.imageData = event.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(file);
                console.log(this.file);
            },
            storeJourney () {
                this.$store.dispatch('udpateJourney', this.journeyData)
                    .then(() => {
                        
                        this.$store.dispatch('journey', this.journeyData);
                        this.$emit('view');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            saveJourney () {
                if (this.journeyData.name == '') {
                    this.showModalNameEmpty = true;
                } else {
                    this.savingJourney = true;
                    if (this.file != null) {
                        this.$store.dispatch('storeImage', this.file)
                            .then(snapshot => {
                                console.log(snapshot);
                                this.journeyData.imageSrc = snapshot.downloadURL;
                                this.storeJourney();
                            })
                            .catch(error => {
                                console.error(error);
                            })
                    } else {
                        this.storeJourney();
                    }
                }
            },
            discardImage () {
                this.file = null;
                this.imageData = null;
                this.journeyData.imageSrc = null;
            },
        }
    }
</script>

<style lang="scss">

</style>