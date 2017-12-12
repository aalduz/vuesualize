<template>
    <div @click="goToItem" class="card card__overview-item">
        <div class="card-img-top">
            <img :src="imageSrc == '' ? 'https://firebasestorage.googleapis.com/v0/b/vuesualize-5ec29.appspot.com/o/images%2Finviqa-02.svg?alt=media&token=ad629fc3-6bac-4022-9d36-ee1255e4d9f2' : imageSrc">
        </div>
        <div class="card-block">
            <h4 class="class-title">{{ item.name }}</h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'thumbnail',
        props: {
            imageSrc: {
                type: String
            },
            item: Object,
        },
        methods: {
            goToItem(){
                
            }
        }
    }
</script>


