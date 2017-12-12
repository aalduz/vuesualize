<template>
    <div class="row">
        <div class="col-12 page-heading">
            <h1 class="justify-content-lg-center">User Page</h1>
            <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
        </div>
    </div>
</template>

<script>

    export default {
        methods: {
            navigateToHome() {
                // this.$router.push('/journeys/7');
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="sass">

</style>
