<template>
    <transition name="slide-y" mode="out-in">
        <div class="container">
            <div v-if="currentUser" class="row">
                <div class="col-12 page-heading">
                    <h1 class="justify-content-lg-center">User Page</h1>
                    <h2 class="justify-content-lg-center">{{ userData }}</h2>
                </div>
            </div>
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

    export default {
        components: {
            appHeader: Header,
        },
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
