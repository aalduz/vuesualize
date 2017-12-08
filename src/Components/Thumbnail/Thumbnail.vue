<template>
    <div v-on:click="goToElement" class="card card__overview-item">
        <div class="card-img-top">
            <img :src="imageSrc">
        </div>
        <div class="card-block">
            <h4 class="class-title">{{ name }}</h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'thumbnail',
        methods: {
            goToElement: function (element) {

            },
        },
        props: {
            name: {
                type: String,
                required: true,
            },
            imageSrc: {
                type: String,
                default: '../../assets/logo.png',
            }
        }
    }
</script>


