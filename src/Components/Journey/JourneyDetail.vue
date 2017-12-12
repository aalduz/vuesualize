<template>
    <div class="row">
        <div class="col-12 page-heading">
            <h1 class="justify-content-lg-center">{{ journey.name }}</h1>
        </div>
    </div>
</template>

<script>
    import { 
        mapGetters,
        mapMutations
    } from 'vuex';
    
    export default {
        computed: {
            ...mapGetters([
                'journey'
            ])
        },
        methods: {
            ...mapMutations([
                'journey'
            ])
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('journey', {});
            next();
        }
    }
</script>
