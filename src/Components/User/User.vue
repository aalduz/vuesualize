<template>
    <transition name="slide-y" mode="out-in">
        <div class="container">
            <div class="row">
                <div class="col-12 page-heading">
                    <h1 class="justify-content-lg-center">User Profile</h1>
                </div>
            </div>
            <transition
                enter-active-class="animated flip" mode="out-in">
                <div v-if="currentUser && isViewMode" class="row">
                    <div
                        @click="isViewMode = false"
                        class="col-12 page-heading content-view">
                        <div class="avatar">
                            <img :src="currentUser.photoURL
                                ? currentUser.photoURL
                                : 'https://firebasestorage.googleapis.com/v0/b/vuesualize-5ec29.appspot.com/o/images%2Finviqa-02.svg?alt=media&token=ad629fc3-6bac-4022-9d36-ee1255e4d9f2'" />
                        </div>
                        <h3 class="justify-content-lg-center">{{ currentUser.displayName }}</h3>
                        <p class="color justify-content-center">{{ currentUser.email }}</p>
                    </div>
                </div>
            </transition>
            <transition
                enter-active-class="animated flip" mode="out-in">
                <div v-if="currentUser && !isViewMode"
                    id="user-profile" class="row justify-content-center">
                    <div class="col-12 col-lg-10">
                        <transition
                            enter-active-class="animated flip" mode="out-in">
                            <div class="form-container">
                                <transition enter-active-class="animated shake" leave-active-class="fade">
                                    <div v-if="updateProfileError" class="alert alert-danger" role="alert">
                                        <strong>Oh snap!</strong> {{ updateProfileError }}
                                    </div>
                                </transition>
                                <transition enter-active-class="animated bounce" leave-active-class="animated bounce">
                                    <modal v-if="updateProfileSuccess"
                                            @ok="updateProfileSuccess = false; isViewMode = true"
                                            @dismiss="updateProfileSuccess = false; isViewMode = true"
                                            :autoDismiss="true"
                                            :confirmCancel="false">
                                        <h3 slot="header">Your profile has been successfully updated</h3>
                                        <div slot="body" class="row justify-content-center">
                                            <i class="fa fa-check color--primary"></i>
                                        </div>
                                    </modal>
                                </transition>
                                <div class="card">
                                    <div v-if="!profileIsSaving" class="edit-mode-container">
                                        <div class="form-group">
                                            <label for="userDisplayName">Display Name</label>
                                            <input
                                                type="name"
                                                id="userDisplayName"
                                                v-model="userDisplayName"
                                                class="form-control"
                                                placeholder="You have not defined a user yet">
                                        </div>
                                        <div class="form-group">
                                            <label for="stepImage">User Image</label>
                                            <div class="input-group">
                                                <input v-model="imageSrc"
                                                    type="text" class="form-control"
                                                    id="userImg"
                                                    aria-describedby="userImg"
                                                    placeholder="Image src"
                                                    readonly>
                                                <div class="input-group-btn">
                                                    <label class="btn btn-info">
                                                        Browse <input @change="processFile($event)" type="file"  id="userImageUploadBtn" aria-describedby="userImageUploadButton" hidden>
                                                    </label>
                                                </div>
                                            </div>
                                            <small
                                                v-if="!imageData"
                                                id="imageSrcHelp" class="form-text text-muted">Is there any image you would like to attach to your Profile.</small>
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
                                                <button @click="saveProfile" class="btn btn-primary">Submit</button>
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
                            </div>
                        </transition>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    import { 
        mapGetters,
        mapActions
    } from 'vuex';

    import { auth } from '@/firebase';
    import Header from '@/Components/Header/Header';
    import Modal from '../Modal/Modal';
    import Loader from '../Loader/Loader';

    export default {
        components: {
            appHeader: Header,
            modal: Modal,
            loader: Loader
        },
        computed: {
            ...mapGetters([
                'userData',
                'currentUser'
            ]),
        },
        data () {
            return {
                userDisplayName: null,
                imageSrc: null,
                file: null,
                imageData: '',
                isViewMode: true,
                updateProfileError: false,
                updateProfileSuccess: false,
                profileIsSaving: false,
            }
        },
        methods: {
            cancel () {
                this.discardImage();
                this.displayName = this.currentUser.displayName;
                this.isViewMode = true;
            },
            saveProfile () {
                this.profileIsSaving = true;
                if (this.file != null) {
                    this.$store.dispatch('storeImage', this.file)
                        .then(snapshot => {
                            console.log(snapshot);
                            this.imageSrc = snapshot.downloadURL;
                            this.updateUserProfile();
                        })
                        .catch(error => {
                            console.error(error);
                        })
                } else {
                    this.updateUserProfile();
                }
            },
            updateUserProfile () {
                console.log('updateUserProfile');
                const formData = {
                    name: this.userDisplayName,
                }
                this.$store.dispatch('updateUserProfile', {
                    displayName: formData.name,
                    photoURL: this.imageSrc,
                })
                .then(res => {
                    this.updateProfileSuccess = true;
                    this.profileIsSaving = false;
                })
                .catch(error => {
                    this.updateProfileError = error.message;
                    this.profileIsSaving = false;
                });
            },
            processFile (event) {
                var file = event.target.files[0];

                this.imageSrc = file.name;
                this.file = file;

                var reader = new FileReader();

                reader.onload = (event) => {
                    this.imageData = event.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(file);
            },
            discardImage () {
                this.file = null;
                this.imageData = null;
                this.imageSrc = null;
            },
            ...mapActions([
                'signOut',
            ]),
        },
        mounted() {
            auth.onAuthStateChanged( user => {
                if (!user && !this.currentUser) {
                    this.$router.push('/signin');
                } else {
                    this.userDisplayName = this.currentUser.displayName;
                    this.imageSrc = this.currentUser.photoURL;
                }
            });
        },
    }
</script>

<style lang="scss">
    @import "../../styles/index";
    .content-view {
        cursor: pointer;
        margin-top: 1rem;
        padding-top: 1rem;
        border: 1px solid map-get($brand-palette, main-background);

        &:hover {
            border: 1px solid map-get($brand-palette, secondary);
            border-radius: 3px;
        }
    }
</style>
