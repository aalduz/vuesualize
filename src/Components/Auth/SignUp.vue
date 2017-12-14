<template>
    <div class="page-wrapper page-wrapper--center">
        <particles/>
        <div class="container">
            <div id="sign-up" class="row justify-content-center">
                <div class="col-12 col sm-10 col-md-7 col-lg-5">
                    <div class="page-heading">
                        <div class="logo-container">
                            <img src="../../assets/vuesualize-logo.png" alt="Vuesualize Logo">
                        </div>
                        <h1 class="justify-content-lg-center">Sign Up</h1>
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
                            <button type="submit" class="btn btn-primary btn-block">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
  import axios from '../../axios-auth';
    import ParticlesJS from '../Particles/ParticlesJS'
    export default {
        components: {
            particles: ParticlesJS
        },
        data () {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            onSubmit () {
                const formData = {
                    email: this.email,
                    password: this.password
                }
                    console.log(formData)
                    axios.post('/users.json', formData)
                        .then(res => console.log(res))
                        .catch(error => console.log(error))
            }
        }
    }
</script>

<style lang="scss">
    #sign-up .form-container {
        input.form-control {
            background-color: rgba(56, 63, 74, 0.5);
        }
    }
</style>