<template>
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
            <p v-if="user">{{user}}</p>
        </div>
        
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                user: null,
                error: null
            }
        },
        created () {
            console.log('created');
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.error = this.post = null;
                this.loading = true;
                this.$store.dispatch('fetchUser')
                    .then(res => {
                        this.loading = false;
                        this.user = this.$store.getters.user;
                    })
                    .catch(err => {
                        this.loading = false;
                        this.error = err.toString();
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    p {
        color: white;
    }
</style>

