<template>
    <transition mode="out-in">
    <div class="page-wrapper page-wrapper--center">
        <particles/>
        <div class="container">
            <div id="sign-up" class="row justify-content-center">
                <div class="col-12 col sm-10 col-md-7 col-lg-5">
                    <div class="page-heading">
                        <div class="logo-container">
                            <img src="../../assets/vuesualize-logo.png" alt="Vuesualize Logo">
                        </div>
                        <h1 class="justify-content-lg-center">Sign In</h1>
                    </div>
                    <div class="form-container">
                        <transition enter-active-class="animated shake" leave-active-class="fade">
                            <small v-if="authenticationFailed" class="form-submission-failed-message">Something went wrong, please try again.</small>
                        </transition>
                        <form @submit.prevent="onSubmit">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                        type="email"
                                        id="email"
                                        v-model="email"
                                        class="form-control"
                                        placeholder="example@mail.domain"
                                        @keyup="authenticationFailed = false">
                            </div>
                            <div class="form-group">
                                <label for="email">Password</label>
                                <input
                                        type="password"
                                        id="password"
                                        v-model="password"
                                        class="form-control"
                                        @keyup="authenticationFailed = false">
                            </div>
                            <br>
                            <button type="submit" class="btn btn-primary btn-block">Submit</button>
                        </form>
                    </div>
                    <transition enter-active-class="animated flipInY">
                        <router-link to="/signup" class="authentication-link">Don't you have an account yet? <span class="color--secondary">Sign up</span></router-link>
                    </transition>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
    import axios from '../../axios-auth';
    import { firebaseConfig }  from '../../firebase';
    import ParticlesJS from '../Particles/ParticlesJS'
    export default {
        components: {
            particles: ParticlesJS
        },
        data () {
            return {
                email: '',
                password: '',
                authenticationFailed: false,
                userAccessIsGranted: false,
            }
        },
        methods: {
            onSubmit () {
                const formData = {
                    email: this.email,
                    password: this.password
                }
                console.log(formData);
                this.$store.dispatch('login', {email: formData.email, password: formData.password})
                    .then(res => {
                        this.userAccessIsGranted = true;
                        this.$router.push('/');
                    })
                    .catch(error => {
                        this.authenticationFailed = true;
                    })
            },
            beforeLeave: function(el, done) {
                if (this.userAccessIsGranted) {
                    Velocity(el, 'flipY', { 
                        duration: 500
                    });
                } else {
                    Velocity(el, 'flipY', {
                        duration: 500
                    });
                }
            }
        }
    }
</script>
