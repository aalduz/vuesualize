<template>
    <div @click="goToItem" class="card card__overview-item" :class="thumbnailClasses">
        <div class="card-img-top">
            <img :src="imageSrc == ''
                ? emptyImgSrc
                : imageSrc">
            <div class="ux-clarification-container" :class="thumbnailClasses">
                <p>Click to Delete</p>
            </div>
        </div>
        <div class="card-block">
            <h4 class="class-title">{{ item.name }}</h4>
            <template v-if="item.tags">
                <div class="tags-container">
                    <span v-for="(tag,index) in item.tags"
                          v-if="index < 3"
                          class="badge badge-pill badge-warning">{{ tag }}</span>
                    <span v-if="item.tags.length > 3">...</span>
                </div>
            </template>
            <template v-else><small><i>No tags on this journey</i></small></template>
        </div>
    </div>
</template>

<script>
    import { 
        mapGetters,
    } from 'vuex';

    export default {
        name: 'thumbnail',
        props: {
            imageSrc: {
                type: String
            },
            item: Object,
            thumbnailClasses: Object
        },
        computed: {
            ...mapGetters([
                'emptyImgSrc'
            ]),
        },
        methods: {
            goToItem(){
                
            }
        }
    }
</script>


