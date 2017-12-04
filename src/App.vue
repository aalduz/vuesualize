<template>
  <div id="app">
    <div class="container user-journey">
      <h1>{{ feature.name }}</h1>
      <h2>User journey</h2>
      <div class="row">
        <div class="col-12">
          <template v-if="steps.length > 0">
            <div class="steps-container row justify-content-lg-center">
              <div v-for="(step, index) in steps" class="col-12 col-lg-10 ">
                <div v-bind:class="[step.childs ? 'user-journey-step-container--with-childs': 'user-journey-step-container--no-childs', index == steps.length - 1 ? 'last-step' : '']"
                                  class="user-journey-step-container">
                  <div class="card user-journey-step">
                    <template v-if="step.nameInViewMode">
                      <h4 v-on:click="step.nameInViewMode = !step.nameInViewMode" class="card-header"><span class="step-number">{{ step.number }}</span>{{ step.name }}</h4>
                    </template>
                    <template v-else>
                      <div class="container edit-mode-container">
                        <div class="row justify-content-center">
                          <div class="col-10">
                            <input type="text" v-model="step.name" class="form-control">
                          </div>
                          <div class="col-2">
                            <button v-on:click="step.nameInViewMode = !step.nameInViewMode" class="btn btn-primary">Save</button>
                          </div>
                        </div>
                      </div>
                    </template>

                    <div class="card-body">
                      <template v-if="step.descriptionInViewMode">
                        <p v-on:click="step.descriptionInViewMode = !step.descriptionInViewMode" class="card-text">{{ step.description }}</p>
                      </template>
                      <template v-else>
                        <textarea type="text" v-model="step.description" class="form-control"></textarea>
                        <button v-on:click="step.descriptionInViewMode = !step.descriptionInViewMode" class="btn btn-primary">Save</button>
                      </template>
                    </div>
                    <img :src="step.imageSrc" class="card-img-bottom">
                  </div>
                  <template v-if="step.childs">
                    <div class="row">
                      <div v-for="step in step.childs" class="col">
                        <div class="user-journey-step-container user-journey-step-container--child">
                          <div class="card user-journey-step">
                            <template v-if="step.nameInViewMode">
                              <h4 v-on:click="step.nameInViewMode = !step.nameInViewMode" class="card-header"><span class="step-number">{{ step.number }}</span>{{ step.name }}</h4>
                            </template>
                            <template v-else>
                              <div class="container">
                                <div class="row">
                                  <div class="col-10">
                                    <input type="text" v-model="step.name" class="form-control">
                                  </div>
                                  <div class="col-2">
                                    <button v-on:click="step.nameInViewMode = !step.nameInViewMode" class="btn btn-primary">Save</button>
                                  </div>
                                </div>
                              </div>
                            </template>

                            <div class="card-body">
                              <p class="card-text">{{ step.description }}</p>
                            </div>
                            <img :src="step.imageSrc" class="card-img-bottom">
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="container user-journey--empty">
              <div class="row justify-content-center">
                <div class="col-12">
                  <template v-if="steps.length == 0 & !addStepStarted">
                    <h3>It seems you dont have any steps defined on your user journey.</h3>
                    <h4>Why dont you start creating the first one?</h4>
                    <div class="button-container">
                      <button v-on:click="addStepStarted = true" class="btn btn-primary">Add step</button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="steps-container row justify-content-lg-center">
                      <div class="col-10">
                        <div class="card user-journey-step">
                          <div class="container edit-mode-container" id="firstStep">
                            <div class="form-group">
                              <label for="stepName">Step Name</label>
                              <input v-model="newStep.name" type="text" class="form-control" id="stepName" aria-describedby="stepName" placeholder="Enter the name of the step">
                              <small id="nameHelp" class="form-text text-muted">It can also be the name of the page where the step is happening</small>
                            </div>
                            <div class="form-group">
                              <label for="stepDescription">Step description</label>
                              <textarea v-model="newStep.description" type="text" class="form-control" rows="10" id="stepDescription"></textarea>
                              <small id="descriptionHelp" class="form-text text-muted">Describe with as much as detail as you think it might be necessary.</small>
                            </div>
                            <div class="row justify-content-end">
                              <div class="col-12">
                                <button v-on:click="addStepStarted = false" class="btn btn-light">Cancel</button>
                                <button v-on:click="createStep(newStep)" class="btn btn-primary">Save step</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    src: (assetName) => {
      return require(assetName);
    },
    createStep(newStep) {
      console.log(this.newStep, newStep);
      this.steps.push({
        number: this.steps.length + 1,
        name: newStep.name,
        nameInViewMode: true,
        description: newStep.description,
        descriptionInViewMode: true,
        imageSrc: ''
      });
      newStep.name = '';
      newStep.description = '';
    }
  },
  data () {
    return {
      addStepStarted: false,
      newStep: {
        name: '',
        description: '',
      },
      feature: {
        name: 'My new task'
      },
      steps : [
        // {
        //   number: 1,
        //   name: 'Entry point',
        //   nameInViewMode: true,
        //   description: 'Search is engaged',
        //   descriptionInViewMode: true,
        //   imageSrc: 'https://raw.githubusercontent.com/aalduz/vuesualize/master/src/assets/step-1.png?token=AK4Zas3XRCbsU8beMp0lraYHMN6895F_ks5aLqDnwA%3D%3D',
        // },
        // {
        //   number: 2,
        //   name: 'Search for a product',
        //   nameInViewMode: true,
        //   description: 'We type in something in the input',
        //   descriptionInViewMode: true,
        //   imageSrc: 'https://raw.githubusercontent.com/aalduz/vuesualize/master/src/assets/step-2.png?token=AK4ZavJpq5JZoA68lunGbUtSpEBNM8PDks5aLqFKwA%3D%3D',
        // },
        // {
        //   number: 3,
        //   name: 'Go to Product page',
        //   nameInViewMode: true,
        //   description: 'By clicking on an item of the list of results, we navigate to PDP',
        //   descriptionInViewMode: true,
        //   imageSrc: 'https://raw.githubusercontent.com/aalduz/vuesualize/master/src/assets/step-3.png?token=AK4Zar_NItRWtSokNn4PH-Dlp46UYpZpks5aLqGFwA%3D%3D',
        // },
        // {
        //   number: 4,
        //   name: 'Go to Product page',
        //   nameInViewMode: true,
        //   description: 'By clicking on an item of the list of results, we navigate to PDP',
        //   descriptionInViewMode: true,
        //   imageSrc: 'https://mymodernmet.com/wp/wp-content/uploads/2017/09/albert-dros-landscape-photography-tips-4.jpg',
        //   childs: [
        //     {
        //       number: 4.1,
        //       name: 'Go to Product page',
        //       nameInViewMode: true,
        //       description: 'By clicking on an item of the list of results, we navigate to PDP',
        //       descriptionInViewMode: true,
        //       imageSrc: 'https://raw.githubusercontent.com/aalduz/vuesualize/master/src/assets/logo.png?token=AK4ZavWFbmL3n_oezsAk07fwTkqLCRV4ks5aLqKuwA%3D%3D',
        //     },
        //     {
        //       number: 4.2,
        //       name: 'Go to Product page',
        //       nameInViewMode: true,
        //       description: 'By clicking on an item of the list of results, we navigate to PDP',
        //       descriptionInViewMode: true,
        //       imageSrc: 'https://static.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg',
        //     }
        //   ]
        // }
      ]
    }
  }
}
</script>

<style lang="scss">



#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.user-journey > h1,
.user-journey > h2 {
  color: white;
  text-align: center;
}

.user-journey > h2 {
  border-bottom: 1px solid white;
  padding-bottom: 1.5rem;
  margin:0 15px 3rem;
  color: #2a9fda;
}

.user-journey--empty h3,
.user-journey--empty h4 {
  color: white;
  text-align: center;
}

.user-journey--empty .button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2rem;
}

@import "styles/index";
</style>
