<template>
    <nav class="navbar navbar-light bg-faded">
        <ul class="nav nav-pills">
            <router-link to="/" tag="li" active-class="active" class="nav-item"><a class="nav-link">Home</a></router-link>
            <router-link to="/user" tag="li" active-class="active" class="nav-item"><a class="nav-link">User</a></router-link>
            <router-link to="/journey" tag="li" active-class="active" class="nav-item"><a class="nav-link">Journeys</a></router-link>
            <li v-if="userData" @click="signOut"><button class="btn btn-danger"><i class="fa fa-sign-out"></i></button></li>
        </ul>
        <ul>

        </ul>
    </nav>
</template>
<script>
    import { 
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        methods: {
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
    }
</script>

<style lang="scss">
    @import "../../styles/index";
</style>
