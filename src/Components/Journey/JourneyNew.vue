<template>
    <div class="row justify-content-lg-center">
        <div class="col-12 col-lg-10 empty-item-form">
            <modal v-if="showModalPreventLeave" 
                    @cancel="showModalPreventLeave = false"
                    @discard="discardChanges"
                    :autoDismiss="false"
                    :discardCancel="true">
                <h3 slot="header">Unsaved changes!</h3>
                <p slot="body">Are you sure you want to leave?</p>
            </modal>
            <modal v-if="showModalNameEmpty"
                    @ok="showModalNameEmpty = false"
                    @dismiss="showModalNameEmpty = false"
                    :autoDismiss="true"
                    :discardCancel="false">
                <h3 slot="header">The name of your journey is empty</h3>
                <p slot="body">In order to save it, you need to provide some value</p>
            </modal>
            <div class="page-heading">
                <h1 class="justify-content-lg-center">New Journey</h1>
            </div>
            <div class="card">
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
                    <div @click="focusOnInput" class="form-group">
                        <label for="journeyTags">Journey Tags</label>
                        <div class="tags-input">
                            <span v-for="(tag, index) in newJourney.tags" @click="removeTag(index)" :class="badgeColor(index)" class="badge badge-pill">{{ tag }}<span class="close-x">x</span></span>
                            <input v-model="tagsInput" 
                                ref="tagsInput"
                                @keyup.space="getTag"
                                @keyup.comma="getTag"
                                type="text" class="form-control"
                                id="journeyTags"
                                aria-describedby="journeyTags"
                                placeholder="You can attach tags">
                        </div>
                        <small id="journeyTagsHelp" class="form-text text-muted">Tags are useful to filter between your journeys.(Use spaces or ',' as delimiters)</small>
                    </div>
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
                        <small id="imageSrcHelp" class="form-text text-muted">Is there any image you would like to attach to your Journey.</small>
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
</template>

<script>
import { db, storageRef, imagesRef } from '../../firebase';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

export default {
    components: {
        loader: Loader,
        modal: Modal
    },
    data () {
        return {
            newJourney: {
                name: '',
                imageSrc: '',
                tags: [],
                steps: []
            },
            tagsInput: '',
            file: {},
            savingJourney: false,
            nameIsDirty: false,
            showModalPreventLeave: false,
            showModalNameEmpty: false,
            preventLeave: false
        }
    },
    beforeRouteLeave(to, from, next) {
        
        if(this.preventLeave) {
            this.showModalPreventLeave = true;
        } else {
            next();
        }
    },
    computed: {
        nameInputClasses: function() {
            return {
                valid: this.newJourney.name != '' && this.nameIsDirty,
                invalid: this.newJourney.name == '' && this.nameIsDirty
            }
        }
    },
    props: ['isViewMode'],
    methods: {
        badgeColor: function(index) {
            let colors = [
                'badge-primary',
                'badge-secondary',
                'badge-success',
                'badge-danger',
                'badge-info',
                'badge-light',
                'badge-dark'
            ];
            let numberOfColors = colors.length;

            return colors[index % numberOfColors];
        },
        discardChanges: function() {
            this.showModalPreventLeave = false;
            this.preventLeave = false;
            this.$router.push('/journey');
        },
        getTag: function() { 
            let tagsInput = this.tagsInput;

            tagsInput = tagsInput.replace(/ +/g,"_").slice(0, -1);

            let tags = tagsInput.split('_');

            tags.forEach(tag => {
                this.newJourney.tags.push(tag);
            });

            this.tagsInput = '';

            if (this.newJourney.tags.length > 0) {
                this.preventLeave = true;
            }

        },
        removeTag: function(index) {
            this.newJourney.tags.splice(index,1);
        },
        focusOnInput: function() {
            this.$refs.tagsInput.focus();
        },
        processFile: function(event) {
            var file = event.target.files[0];

            this.newJourney.imageSrc = file.name;
            this.file = file;
            this.preventLeave = true

        },
        storeJourney: function() {
            // this.savingJourney = true;
            console.log(this.newJourney);
            // let journeysRef = db.ref('journeys');
            // let vm = this;

            // journeysRef.push(this.newJourney).then(function(snapshot){
            //     vm.$router.push('/journey');
            // });
        },
        saveJourney: function() {
            if (this.newJourney.name == '') {
                this.showModalNameEmpty = true;
            } else {
                console.log(this.file, this.file['name'] == null);
                if (this.file['name'] != null) {
                    // upload Picture
                    console.log(this.file.name);
                    // let fileRef = storageRef.child(this.file.name);

                    // let fileImagesRef = storageRef.child('images/' + this.file.name);

                    // let vm = this;
                    // fileImagesRef.put(this.file).then(function(snapshot) {
                    //     console.log('Uploaded a file!', snapshot);

                    //     vm.newJourney.imageSrc = snapshot.downloadURL;
                    //     vm.storeJourney();
                    // });
                } else {
                    this.storeJourney();
                }
            }
        }
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
    .empty-item-form {
        margin-top: 2rem;
    }

    .input-group > .input-group-btn > label.btn {
        margin-bottom: 0;
    }

    .tags-input {
        background-color: #383f4a;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        display: inline-block;
        padding: 6px 12px;
        color: #ccc;
        vertical-align: middle;
        border-radius: 4px;
        width: 100%;
        max-width: 100%;
        line-height: 22px;
        cursor: text;
    }
    .tags-input span.badge {
        margin-right: 5px;
        cursor: pointer;
    }
    .tags-input span.badge span.close-x {
        padding-left: 3px;
        color: lightgray;
    }
    .tags-input input {
        border: none;
        box-shadow: none;
        outline: none;
        background-color: transparent;
        padding: 0 6px;
        margin: 0;
        width: auto;
        max-width: inherit;
        display: inline-block;
        color: #ccc;
    }
    .tags-input input:focus {
        outline: 0;
        border:none;
        box-shadow:none;
        background-color: transparent;
        color: #ccc;
    }
</style>

