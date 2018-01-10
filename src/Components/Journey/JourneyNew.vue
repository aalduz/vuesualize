<template>
    <transition name="slide-y" mode="out-in">
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
            <div class="row justify-content-lg-center">
                <div class="col-12 col-lg-10">
                    <modal v-if="showModalPreventLeave" 
                            @cancel="showModalPreventLeave = false"
                            @confirm="confirmChanges"
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
                    <div class="page-heading">
                        <h1 class="justify-content-lg-center">New Journey</h1>
                        <hr class="page-heading">
                    </div>
                    <div class="card empty-journey">
                        <div v-if="!savingJourney" class="container edit-mode-container" id="journeyForm">
                            <div class="form-group">
                                <label for="journeyName">Journey Name *</label>
                                <input v-model="newJourney.name"
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
                                :tags="newJourney.tags"
                                @newTag="newTag(...arguments)"
                                @removeTag="removeTag(...arguments)"
                                >
                            </tags-input>
                            <div class="form-group">
                                <label for="stepImage">Journey image</label>
                                <div class="input-group">
                                    <input v-model="newJourney.imageSrc"
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
                                    <router-link to="/journey" tag="button" class="btn btn-dismiss">Cancel</router-link>
                                </div>
                            </div>
                        </div>
                        <div v-else class="row">
                            <div class="col-12">
                                <loader></loader>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { db, storageRef, imagesRef } from '../../firebase';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import TagsInput from '../TagsInput/TagsInput';
import { 
        mapGetters,
} from 'vuex';

export default {
    components: {
        loader: Loader,
        modal: Modal,
        tagsInput: TagsInput
    },
    data () {
        return {
            newJourney: {
                name: '',
                imageSrc: '',
                tags: [],
                steps: [],
                uid: null
            },
            tagsInput: '',
            file: null,
            imageData: '',
            savingJourney: false,
            nameIsDirty: false,
            showModalPreventLeave: false,
            showModalNameEmpty: false,
            preventLeave: false
        }
    },
    beforeRouteLeave(to, from, next) {
        
        if (this.newJourney.name || this.file || this.tagsInput) {
            console.log('prevent')
        }
        
        if(this.preventLeave) {
            this.showModalPreventLeave = true;
        } else {
            next();
        }
    },
    computed: {
        ...mapGetters([
            'journey'
        ]),
        nameInputClasses: function() {
            return {
                valid: this.newJourney.name != '' && this.nameIsDirty,
                invalid: this.newJourney.name == '' && this.nameIsDirty
            }
        }
    },
    props: ['isViewMode'],
    methods: {
        confirmChanges: function() {
            this.showModalPreventLeave = false;
            this.preventLeave = false;
            this.$router.push('/journey');
        },
        newTag (processedTag) {
            this.newJourney.tags.push(processedTag);
            console.log(processedTag);
        },
        removeTag (index) {
            console.info(this.newJourney.tags, index);
            this.newJourney.tags.splice(index,1);
        },
        processFile: function(event) {
            var file = event.target.files[0];

            this.newJourney.imageSrc = file.name;
            this.file = file;
            this.preventLeave = true;

            var reader = new FileReader();

            reader.onload = (event) => {
                this.imageData = event.target.result;
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(file);
        },
        storeJourney: function() {
            this.newJourney['uid'] = this.$store.state.currentUser.uid;
            let journeysRef = db.ref('journeys');

            journeysRef.push(this.newJourney).then(snapshot => {
                this.showModalNameEmpty = false;
                this.preventLeave = false;

                let journeyKey = snapshot['key'];
                let journey = this.journeys.filter(journey => journey['.key'] == journeyKey)[0];

                journey.key =  journey['.key'];
                delete journey['.key'];

                console.log(journey);
                this.$store.commit('journey', journey);
                this.$store.dispatch('fetchUserJourneys');
                this.$router.push('/journey/' + journeyKey);
            });
        },
        saveJourney: function() {
            if (this.newJourney.name == '') {
                this.showModalNameEmpty = true;
            } else {
                this.savingJourney = true;
                if (this.file != null) {
                    // upload Picture
                    let fileRef = storageRef.child(this.file.name);

                    let fileImagesRef = storageRef.child('images/' + this.file.name);

                    let vm = this;
                    fileImagesRef.put(this.file).then(function(snapshot) {

                        vm.newJourney.imageSrc = snapshot.downloadURL;
                        vm.preventLeave = false;
                        vm.storeJourney();
                    });
                } else {
                    this.storeJourney();
                }
            }
        },
        discardImage () {
            this.file = null;
            this.imageData = null;
            this.newJourney.imageSrc = null;
        },
    },
    firebase: {
        journeys: {
            source: db.ref('journeys'),
            cancelCallback(err) {
                console.error(err);
            }
        },
    }
}
</script>

<style lang="scss">
    @import "../../styles/index";
    .empty-journey {
        margin-top: 2rem;
    }
    .input-group > .input-group-btn > label.btn {
        margin-bottom: 0;
    }
</style>

