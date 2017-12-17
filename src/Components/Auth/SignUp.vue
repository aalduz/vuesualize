<template>
    <transition enter-active-class="animated flip" mode="out-in">
    <div class="page-wrapper page-wrapper--center">
        <particles/>
        <div class="container">
            <div id="sign-up" class="row justify-content-center">
                <div class="col-12 col sm-10 col-md-7 col-lg-5">
                    <div class="page-heading">
                        <div class="logo-container">
                            <img src="../../assets/vuesualize-logo.png" alt="Vuesualize Logo">
                        </div>
                        <h1 class="justify-content-lg-center"><span class="color--secondary">Sign Up</span></h1>
                    </div>
                    <div class="form-container">
                        <form @submit.prevent="onSubmit">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                        type="email"
                                        id="email"
                                        v-model="email"
                                        class="form-control"
                                        placeholder="example@mail.domain">
                            </div>
                            <div class="form-group">
                                <label for="email">Password</label>
                                <input
                                        type="password"
                                        id="password"
                                        v-model="password"
                                        class="form-control">
                            </div>
                            <br>
                            <button type="submit" class="btn btn-secondary btn-block">Submit</button>
                        </form>
                    </div>
                    <transition v-on:leave="leave" v-bind:css="false">
                        <router-link to="/signin" class="authentication-link">Do you have already an account? <span class="color">Sign in</span></router-link>
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
                this.$store.dispatch('signup', {email: formData.email, password: formData.password})
                    .then(res => {
                        this.userAccessIsGranted = true;
                        this.$router.push('/');
                    });
            },
            leave: function(el, done) {
                if (this.userAccessIsGranted) {
                    console.log('beforeLeave', this.userAccessIsGranted);
                    Velocity(el, 'fadeOut', { 
                        duration: 500
                    });
                } else {
                    console.log('beforeLeave', this.userAccessIsGranted);
                    Velocity(el, 'flipY', {
                        duration: 500
                    });
                }
            }
        }
    }
</script>
