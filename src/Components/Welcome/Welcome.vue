<template>
    <transition name="slide-y" mode="out-in">
        <div class="container-fluid">
            <div class="row section-container section-container--intro">
                <particles/>
                <div class="col-12">
                    <div class="container">
                        <section class="row welcome-section justify-content-center">
                            <div class="col-12 col-md-5">
                                <div class="image-container">
                                    <img src="../../assets/vuesualize-logo.png" alt="">
                                    <h2 class="color--primary">It is easier when you can picture it.</h2>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="row section-container section-container--primary">
                <div class="col-12">
                    <div class="container">
                        <section class="row welcome-section welcome-section--right">
                            <div class="col-12 col-md-6">
                                <div class="image-container">
                                    <i class="fa fa-eye-slash"></i>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="description-container">
                                    <h3>Avoid confusion</h3>
                                    <p>Define the steps of a user journey, so every team-member is on the same page: PO, BA, FE, BE, QA  and PM.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="row section-container section-container--call-to-action">
                <div class="col-12">
                    <div class="container">
                        <section class="row welcome-section justify-content-center">
                            <div class="col-12 col-md-6">
                                <div class="image-container">
                                    <div class="teams-container">
                                        <div class="team-item">
                                            <i class="fa fa-check-circle-o"></i>
                                            <span>PO</span>
                                        </div>
                                        <div class="team-item">
                                            <i class="fa fa-check-circle-o"></i>
                                            <span>BA</span>
                                        </div>
                                        <div class="team-item">
                                            <i class="fa fa-circle-o"></i>
                                            <span>FE</span>
                                        </div>
                                        <div class="team-item">
                                            <i class="fa fa-times-circle-o"></i>
                                            <span>BE</span>
                                        </div>
                                        <div class="team-item">
                                            <i class="fa fa-circle-o"></i>
                                            <span>QA</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="description-container">
                                    <h3>Requirements ready?</h3>
                                    <p>It helps Project Managers to understand if everything required to develop a certain feature is in place.</p>
                                    <p>In case anything is missing, they can address the responsible team-member to provide it.</p>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="call-to-action-container">
                                    <router-link
                                        to="/signup"
                                        tag="button"
                                        class="btn btn-secondary btn-block">
                                            <i class="fa fa-sign-in"></i>
                                            <span>Sign Up</span>
                                    </router-link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="row section-container section-container--secondary">
                <div class="col-12">
                    <div class="container">
                        <section class="row welcome-section welcome-section--right">
                            <div class="col-12 col-md-6">
                                <div class="image-container">
                                    <i class="fa fa-object-group"></i>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="description-container">
                                    <h3>Information at a glance</h3>
                                    <p>Attach Acceptance Criteria, images, wireframes or links to prototypes to every step.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="row section-container section-container--call-to-action">
                <div class="col-12">
                    <div class="container">
                        <section class="row welcome-section justify-content-center">
                            <div class="col-12 col-md-6">
                                <div class="image-container">
                                    <div class="icons-container">
                                        <div class="icon-item">
                                            <i class="fa fa-code"></i>
                                        </div>
                                        <div class="icon-item">
                                            <i class="fa fa-book"></i>
                                        </div>
                                        <div class="icon-item">
                                            <i class="fa fa-dot-circle-o"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="description-container">
                                    <h3>Document while you develop</h3>
                                    <p>Once a journey is approved by every team-member involved, it becomes a documentation reference and an unique source of truth.</p>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="call-to-action-container">
                                    <router-link
                                        to="/signup"
                                        tag="button"
                                        class="btn btn-primary btn-block">
                                            <i class="fa fa-sign-in"></i>
                                            <span>Sign Up</span>
                                    </router-link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="row section-container section-container--primary">
                <div class="col-12">
                    <div class="container">
                        <section class="row welcome-section welcome-section--right">
                            <div class="col-12 col-md-6">
                                <div class="image-container">
                                    <div class="icons-container">
                                        <div class="icon-item">
                                            <i class="fa fa-check-square-o"></i>
                                        </div>
                                        <div class="icon-item">
                                            <i class="fa fa-fire"></i>
                                        </div>
                                        <div class="icon-item">
                                            <i class="fa fa-fire-extinguisher"></i>
                                        </div>
                                        <div class="icon-item">
                                            <i class="fa fa-gavel"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="description-container">
                                    <h3>Ease QA documentation</h3>
                                    <p>Ellaborate a step by step document for QA tests</p>
                                    <p>If test passes, it provides a graphic proof. If it fails, it provides a quick reference to where the bug is happening.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <footer>
                <div class="row">
                    <div class="col">
                        <div class="container">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <ul>
                                        <li><a href="http://github.com/aalduz/vuesualize"><i class="fa fa-github"></i> GitHub</a></li>
                                        <li><a href="http://github.com/aalduz"><i class="fa fa-github"></i> aalduz</a></li>
                                    </ul>
                                </div>
                                <div class="col-12 col-md-6">
                                    <ul class="list-right">
                                        <li><a href="https://inviqa.com/"><i class="fa fa-building"></i> Inviqa</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </transition>
</template>

<script>
    import { 
    } from 'vuex';

    import { auth }  from '@/firebase';
    import ParticlesJS from '../Particles/ParticlesJS'

    export default {
        components: {
            particles: ParticlesJS
        },
        methods: {
        },
        computed: {
        },
        data () {
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/index";
    p {
        color: white;
    }

    footer {
        background-color: map-get($brand-palette, main-background);
        margin: 1rem 0;
        ul {
            padding: 0;

            li {
                a {
                    color: white;
                    &:hover {
                        color: map-get($brand-palette, primary);
                        text-decoration: none;
                    }
                    &:visited {
                        color: white;
                        &:hover {
                            color: map-get($brand-palette, primary);
                            text-decoration: none;
                        }
                    }
                }
            }

            &.list-right {
                @media (min-width: 768px) {
                    li {
                        text-align: right;
                    }
                }
            }
        }
    }
</style>

