<template>
    <transition name="slide-y" mode="out-in">
        <div class="container">
            <div class="row">
                <div class="col-12 page-heading">
                    <h1 class="justify-content-lg-center">These are your Journeys</h1>
                    <div 
                        class="action-buttons-container">
                        <div class="left">
                            <div
                                v-if="journeys"
                                class="btn-group">
                                <button
                                    @click="isListView = true"
                                    class="btn btn-link"
                                    :class="isListViewActiveClass">
                                        <i class="fa fa-list-alt"></i>
                                        <span class="action-item-text">Table</span>
                                </button>
                                <button
                                    @click="isListView = false"
                                    class="btn btn-link"
                                    :class="isListViewNotActiveClass">
                                        <i class="fa fa fa-picture-o"></i>
                                        <span class="action-item-text">Thumbnails</span>
                                </button>
                            </div>
                        </div>
                        <div class="right">
                            <transition
                                enter-active-class="animated rubberBand" mode="in-out">
                                    <button
                                        v-if="!isDeleteMode && journeys"
                                        @click="isDeleteMode = !isDeleteMode"
                                        class="btn btn-danger">
                                            <i class="fa fa-trash-o"></i>
                                            <span class="action-item-text">Delete Journey(s)</span>
                                    </button>
                            </transition>
                            <transition
                                enter-active-class="animated rubberBand" mode="in-out">
                                    <button
                                        v-if="!isDeleteMode"
                                        @click="navigateToNewJourney"
                                        class="btn btn-primary">
                                            <i class="fa fa-plus"></i>
                                            <span class="action-item-text">Add Journey</span>
                                    </button>
                            </transition>
                            <transition
                                enter-active-class="animated rubberBand" mode="out-in">
                                    <button
                                        v-if="isDeleteMode "
                                        @click="isDeleteMode = !isDeleteMode"
                                        class="btn btn-default">
                                            <i class="fa fa-times"></i>
                                            <span class="action-item-text">Stop deleting</span>
                                    </button>
                            </transition>
                        </div>
                    </div>
                    <hr class="page-heading">
                </div>
                <div
                    v-if="isListView"
                    class="col-12">
                    
                    <table>
                        <thead>
                            <tr>
                                <th class="name">Journey Name</th>
                                <th class="tags">Tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="journey in journeys"
                                @click="itemAction(journey)"
                                :class="itemClasses">
                                <td>
                                    {{ journey.name }}
                                </td>
                                <td>
                                    <template v-if="journey.tags">
                                        <div class="tags-container">
                                            <span v-for="(tag,index) in journey.tags"
                                                v-if="index < 3"
                                                class="badge badge-pill badge-warning">{{ tag }}</span>
                                            <span v-if="journey.tags.length > 3">...</span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <small><i>No tags on this journey</i></small>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                        <!-- <tfoot>
                            <tr>
                                <td>Footer content 1</td>
                                <td>Footer content 2</td>
                            </tr>
                        </tfoot> -->
                    </table>
                </div>
                <div 
                    v-else
                    v-for="journey in journeys"
                    @click="itemAction(journey)"
                    class="col-12 col-sm-6 col-md-4 col-lg-3">
                        <transition 
                            enter-active-class="animated rubberBand" mode="out-in">
                                <thumbnail
                                    :item="journey" 
                                    :imageSrc="journey.imageSrc ? journey.imageSrc : ''"
                                    :class="itemClasses">
                                </thumbnail>
                        </transition>
                </div>
                <transition
                    enter-active-class="animated rubberBand" mode="out-in">
                    <div 
                        v-if="!journeys"
                        class="col-12">
                        <h3 class="empty-journeys-text">You don't have any journey yet. Why don't you create one?</h3>
                        <div class="moving-icon-container">
                            <div class="icon-container">
                                <img class="compound" src="../../assets/vuesualize-icon-compound-layer.png" alt="">
                                <img class="background" src="../../assets/vuesualize-icon-blue-layer.png" alt="">
                                <img class="small-icons-back" src="../../assets/vuesualize-icon-orange-layer.png" alt="">
                                <img class="small-icons-front" src="../../assets/vuesualize-icon-dark-blue-layer.png" alt="">
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
    import { 
        mapGetters,
        mapMutations
    } from 'vuex';

    import { db } from '../../firebase';
    import { store } from '@/store/store';
    import Header from '../Header/Header';
    import Thumbnail from '../Thumbnail/Thumbnail';
    import JourneyNew from './JourneyNew';

    export default {
        components: {
            appHeader: Header,
            thumbnail: Thumbnail,
            journeyNew: JourneyNew
        },
        computed: {
            ...mapGetters([
                'currentUser',
                'journeys'
            ]),
            itemClasses() {
                return {
                    delete: this.isDeleteMode,
                }
            },
            isListViewActiveClass() {
                return {
                    active: this.isListView
                }
            },
            isListViewNotActiveClass() {
                return {
                    active: !this.isListView
                }
            }
        },
        data () {
            return {
                isViewMode: true,
                isDeleteMode: false,
                isListView: false,
            }
        },
        methods: {
            itemAction: function(journey) {
                this.isDeleteMode
                    ? this.deleteJourney(journey)
                    : this.navigateToJourney(journey)
            },
            navigateToNewJourney: function() {
                this.$router.push('/journey/new');
            },
            navigateToJourney: function(journey) {
                let journeyId = journey['key'];

                this.$store.dispatch('journey', journey);

                this.$router.push('/journey/'+journeyId);
            },
            deleteJourney(journey) {
                this.$store.dispatch('deleteJourney', journey);
            }
        },
        watch: {
            '$route'(to, from) {
                this.id = to.params.id;
            },
            journeys () {
                if (this.journeys == null) {
                    this.isDeleteMode = false;
                }
            }
        }
    }
</script>
