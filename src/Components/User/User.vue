<template>
    <div v-if="currentUser" 
         class="row">
        <div class="col-12 page-heading">
            <h1 class="justify-content-lg-center">User Page</h1>
            <h2 class="justify-content-lg-center">{{ userData }}</h2>
            <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
            <button @click="signOut" class="btn btn-danger"><i class="fa fa-sign-out"></i></button>
        </div>
    </div>
</template>

<script>
    import { 
        mapGetters,
        mapActions
    } from 'vuex';

    import { auth } from '@/firebase'

    export default {
        methods: {
            navigateToHome() {
                this.$router.push('/')
            },
            ...mapActions([
                'signOut',
            ])
        },
        computed: {
            ...mapGetters([
                'userData',
                'currentUser'
            ]),
        },
        mounted() {
            auth.onAuthStateChanged( user => {
                if (!user && !this.currentUser) {
                    this.$router.push('/signin');
                }
            });
        },
    }
</script>

<style lang="sass">

</style>
