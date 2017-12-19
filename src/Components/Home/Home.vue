<template>
    <div class="page-wrapper">
        <app-header></app-header>
        <div class="container">
            <div class="row">
                <div class="col-12 page-heading">
                    <h1 class="justify-content-lg-center"><span><i class="fa fa-user"></i></span>Home Page</h1>
                </div>
                <div class="col-12">
                    <p v-if="error">{{error}}</p>
                </div>
                <div class="col-12">
                    <p v-if="loading">Loading</p>
                </div>
                <div class="col-12">
                    <p v-if="currentUser">{{currentUser}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { 
        mapGetters,
        mapActions
    } from 'vuex';

    import { auth }  from '@/firebase';
    import Header from '@/Components/Header/Header';

    export default {
        components: {
            appHeader: Header,
        },
        methods: {
            fetchData() {
                // Fetch Data
            }
        },
        computed: {
            ...mapGetters([
                'userData',
                'currentUser'
            ]),
        },
        data () {
            return {
                loading: false,
                user: null,
                error: null
            }
        },
        watch: {
            '$route': 'fetchData'
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

<style lang="scss" scoped>
    p {
        color: white;
    }
</style>

