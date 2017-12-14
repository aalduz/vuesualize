<template>
    <div class="row">
        <div class="col-12 page-heading">
            <h1 class="justify-content-lg-center">Home Page</h1>
        </div>
        <div class="col-12">
            <p v-if="email">{{email}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            email () {
                return !this.$store.getters.user ? false : this.$store.getters.user.email;
            }
        },
        created () {
            console.log('created');
            this.$store.dispatch('fetchUser');
        }
    }
</script>

