<template>
    <div class="page-wrapper page-wrapper--center">
        <div class="container">
            <div id="sign-up" class="row justify-content-center">
                <div class="col-12 col sm-10 col-md-8 col-lg-6">
                    <div class="logo-container">
                        <img src="" alt="">
                    </div>
                    <div class="page-heading">
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

    export default {
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
