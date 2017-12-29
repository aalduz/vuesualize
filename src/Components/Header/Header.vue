<template>
    <nav class="navbar navbar-light bg-faded" :class="navbarClasses">
        <ul class="nav nav-pills">
            <router-link
                to="/" 
                tag="li"
                active-class="active"
                class="nav-item">
                <a class="nav-link">
                    <i class="fa fa-home"></i>
                    <span class="action-item-text">Home</span>
                </a>
            </router-link>
            <router-link
                v-if="userData"
                to="/journey"
                tag="li"
                active-class="active"
                class="nav-item">
                <a class="nav-link">
                    <i class="fa fa-id-card-o"></i>
                    <span class="action-item-text">Journeys</span>
                </a>
            </router-link>
            <router-link
                v-if="userData"
                to="/user"
                tag="li"
                active-class="active"
                class="nav-item">
                <a class="nav-link">
                    <i class="fa fa-user"></i>
                    <span class="action-item-text">User</span>
                </a>
            </router-link>
        </ul>
        <span class="navbar-text">
            <button
                v-if="userData"
                @click="showModalConfirmSignOut = true"
                class="btn btn-link">
                    <i class="fa fa-sign-out"></i>
                    <span class="action-item-text">Sign Out</span>
            </button>
            <router-link
                v-if="!userData && $route.path != '/signin'"
                to="/signin"
                class="btn btn-link">
                    <i class="fa fa-sign-in"></i>
                    <span class="action-item-text">Sign In</span>
            </router-link>
        </span>
        <modal v-if="showModalConfirmSignOut" 
                @cancel="showModalConfirmSignOut = false"
                @confirm="signUserOut"
                :autoDismiss="false"
                :confirmCancel="true">
            <h3 slot="header">Sign Out</h3>
            <div slot="body">
                <p class="center">Are you sure you want to leave?</p>
            </div>
            <span slot="confirm-text">Sign out</span>
        </modal>
    </nav>
</template>
<script>
    import { 
        mapGetters,
        mapActions
    } from 'vuex';

    import Modal from '@/Components/Modal/Modal';

    export default {
        components: {
            modal: Modal
        },
        methods: {
            ...mapActions([
                'signOut',
            ]),
            signUserOut () {
                this.signOut()
                    .then(res => {
                        this.showModalConfirmSignOut = false;
                        this.$router.push('/signin');
                    })
            }
        },
        computed: {
            ...mapGetters([
                'userData',
                'currentUser'
            ]),
            navbarClasses() {
                return {
                    signed_in: this.currentUser,
                }
            }
        },
        data () {
            return {
                showModalConfirmSignOut: false,
            }
        }
    }
</script>

<style lang="scss">
    @import "../../styles/index";
</style>
