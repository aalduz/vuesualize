<template>
  <div id="app">
    <div class="container user-journey">
      <h1>{{ feature.name }}</h1>
      <h2>User journey</h2>
      <div class="row">
        <div class="col-12">
            <div class="steps-container row justify-content-lg-center">
              <div v-for="(step, index) in steps" class="col-12 col-lg-10 ">
                <div v-bind:class="[step.childs ? 'user-journey-step-container--with-childs': 'user-journey-step-container--no-childs', index == steps.length - 1 ? 'last-step' : '']"
                                  class="user-journey-step-container">
                  <div class="card user-journey-step">
                    <template v-if="step.nameInViewMode">
                      <h4 v-on:click="step.nameInViewMode = !step.nameInViewMode" class="card-header"><span class="step-number">{{ step.number }}</span>{{ step.name }}</h4>
                    </template>
                    <template v-else>
                      <div class="card-header edit-mode-container">
                        <div class="row justify-content-center form-inline">
                          <div class="col-10">
                            <input type="text" v-model="step.name" class="form-control full">
                          </div>
                          <div class="col-2">
                            <button v-on:click="step.nameInViewMode = !step.nameInViewMode" class="btn btn-primary  btn-block">Save</button>
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
                        <br>
                        <button v-on:click="step.descriptionInViewMode = !step.descriptionInViewMode" class="btn btn-primary">Save</button>
                      </template>
                    </div>
                    <template v-if="step.imageInViewMode">
                      <div class="card-block">
                        <img v-if="step.imageSrc != ''" v-on:click="step.imageInViewMode = !step.imageInViewMode" :src="step.imageSrc" class="card-img-bottom">
                        <p v-else v-on:click="step.imageInViewMode = !step.imageInViewMode" class="image-src"><i>Click here to provide an image</i></p>
                      </div>
                    </template>
                    <template v-else>
                      <div class="edit-mode-container">
                        <div class="row form-inline">
                          <div class="col-10">
                            <input type="text" v-model="step.imageSrc" class="form-control full">
                          </div>
                          <div class="col-2">
                            <button v-on:click="step.imageInViewMode = !step.imageInViewMode" class="btn btn-primary btn-block">Save</button>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-if="(!step.nameInViewMode || !step.descriptionInViewMode || !step.imageInViewMode)">
                        <button @click="deleteStep(index)" class="btn btn-danger btn-sm">Delete step</button>
                    </template>
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
                              <div class="card-header edit-mode-container">
                                <input type="text" v-model="step.name" class="form-control">
                                <br>
                                <button v-on:click="step.nameInViewMode = !step.nameInViewMode" class="btn btn-primary  btn-block">Save</button>
                              </div>
                            </template>
                            <div class="card-body">
                              <template v-if="step.descriptionInViewMode">
                                <p v-on:click="step.descriptionInViewMode = !step.descriptionInViewMode" class="card-text">{{ step.description }}</p>
                              </template>
                              <template v-else>                        
                                <textarea type="text" v-model="step.description" class="form-control"></textarea>
                                <br>
                                <button v-on:click="step.descriptionInViewMode = !step.descriptionInViewMode" class="btn btn-primary">Save</button>
                              </template>
                            </div>
                            <template v-if="step.imageInViewMode">
                              <div class="card-block">
                                <img v-if="step.imageSrc != ''" v-on:click="step.imageInViewMode = !step.imageInViewMode" :src="step.imageSrc" class="card-img-bottom">
                                <p v-else v-on:click="step.imageInViewMode = !step.imageInViewMode" class="image-src"><i>Click here to provide an image</i></p>
                              </div>
                            </template>
                            <template v-else>
                              <div class="edit-mode-container">
                                <input type="text" v-model="step.imageSrc" class="form-control">
                                <br>
                                <button v-on:click="step.imageInViewMode = !step.imageInViewMode" class="btn btn-primary btn-block">Save</button>
                              </div>
                            </template>
                            <template v-if="(!step.nameInViewMode || !step.descriptionInViewMode || !step.imageInViewMode)">
                                <button @click="deleteStep(index)" class="btn btn-danger btn-sm">Delete step</button>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="container user-journey--empty">
              <div class="row justify-content-center">
                <div class="col-12">
                  <template v-if="!addStepStarted">
                    <template v-if="steps.length == 0">
                      <h3>It seems you dont have any steps defined on your user journey.</h3>
                      <h4>Why dont you start creating the first one?</h4>
                    </template>
                    <template v-else>
                      <h3 class="clarification">You can continue by adding an extra step</h3>
                      <h4>Or by editing previous steps</h4>
                      <!-- <h4>Or even adding childs to the last one</h4> -->
                    </template>
                    <div class="button-container">
                      <!-- <button v-on:click="addChildStarted = true;addStepStarted = true" v-if="steps.length > 0" class="btn btn-secondary">Add child</button> -->
                      <button v-on:click="addStepStarted = true" class="btn btn-primary">Add step</button>
                    </div>
                  </template>
                  <template v-else>
                    <h3 v-if="steps.length > 0" class="clarification"></h3>
                    <div class="steps-container row justify-content-lg-center">
                      <div class="col-12 col-10">
                        <div class="card user-journey-step">
                          <div class="container edit-mode-container" id="firstStep">
                            <div class="form-group">
                              <label for="stepName">Step Name *</label>
                              <input v-model="newStep.name" type="text" class="form-control" id="stepName" aria-describedby="stepName" placeholder="Enter the name of the step">
                              <small id="nameHelp" class="form-text text-muted">It can also be the name of the page where the step is happening</small>
                            </div>
                            <div class="form-group">
                              <label for="stepDescription">Step description *</label>
                              <textarea v-model="newStep.description" type="text" class="form-control" rows="10" id="stepDescription"></textarea>
                              <small id="descriptionHelp" class="form-text text-muted">Describe with as much as detail as you think it might be necessary.</small>
                            </div>
                            <div class="form-group">
                              <label for="stepImage">Step image</label>
                              <input v-model="newStep.imageSrc" type="text" class="form-control" id="stepImg" aria-describedby="stepImg" placeholder="Image src">
                              <small id="imageSrcnHelp" class="form-text text-muted">Provide an URL with the image that describes the step.</small>
                            </div>
                            <div class="row justify-content-end">
                              <div class="col-12">
                                <button v-on:click="addStepStarted = false" class="btn btn-light">Cancel</button>
                                <button v-on:click="createStep(newStep, addChildStarted)" class="btn btn-primary">Save step</button>
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
    addNewStepToArray(newStep, array) {
      array.push({
        number: array.length + 1,
        name: newStep.name,
        nameInViewMode: true,
        description: newStep.description,
        descriptionInViewMode: true,
        imageSrc: '',
        imageInViewMode: true,
        childs: false
      });
    },
    createStep(newStep, isChild) {
      if(newStep.name != '' && newStep.description != '') {
        var stepsLength = this.steps.length;

        if (isChild) {
          var lastStep = this.steps[stepsLength - 1];

          lastStep.childs == false ? lastStep.childs = [] : '';
          this.addNewStepToArray(newStep, this.steps[stepsLength - 1].childs);
          this.addChildStarted = false;
        } else {
          this.addNewStepToArray(newStep, this.steps)
          this.addStepStarted = false;
        }
        newStep.name = '';
        newStep.description = '';
      } else {
        alert('Please fill in the fields');
      }
    },
    deleteStep(index) {
      var stepToDelete = this.steps[index];
      this.steps = this.steps.filter(step => step !== stepToDelete);

      this.steps.forEach((step,index) => {
        step.number = index + 1;
      });
    }
  },
  data () {
    return {
      addStepStarted: false,
      addChildStarted: false,
      newStep: {
        name: '',
        description: '',
      },
      feature: {
        name: 'My new task'
      },
      steps : [
        {
          number: 1,
          name: 'Entry point',
          nameInViewMode: true,
          description: 'Search is engaged',
          descriptionInViewMode: true,
          imageSrc: 'https://raw.githubusercontent.com/aalduz/vuesualize/master/src/assets/step-1.png?token=AK4Zas3XRCbsU8beMp0lraYHMN6895F_ks5aLqDnwA%3D%3D',
          imageInViewMode: true
        },
        {
          number: 2,
          name: 'Search for a product',
          nameInViewMode: true,
          description: 'We type in something in the input',
          descriptionInViewMode: true,
          imageSrc: 'https://raw.githubusercontent.com/aalduz/vuesualize/master/src/assets/step-2.png?token=AK4ZavJpq5JZoA68lunGbUtSpEBNM8PDks5aLqFKwA%3D%3D',
          imageInViewMode: true
        },
        {
          number: 3,
          name: 'Go to Product page',
          nameInViewMode: true,
          description: 'By clicking on an item of the list of results, we navigate to PDP',
          descriptionInViewMode: true,
          imageSrc: 'https://raw.githubusercontent.com/aalduz/vuesualize/master/src/assets/step-3.png?token=AK4Zar_NItRWtSokNn4PH-Dlp46UYpZpks5aLqGFwA%3D%3D',
          imageInViewMode: true
        },
        {
          number: 4,
          name: 'Go to Product page',
          nameInViewMode: true,
          description: 'By clicking on an item of the list of results, we navigate to PDP',
          descriptionInViewMode: true,
          imageSrc: 'https://mymodernmet.com/wp/wp-content/uploads/2017/09/albert-dros-landscape-photography-tips-4.jpg',
          imageInViewMode: true,
          childs: [
            {
              number: 4.1,
              name: 'Go to Product page',
              nameInViewMode: true,
              description: 'By clicking on an item of the list of results, we navigate to PDP',
              descriptionInViewMode: true,
              imageSrc: 'https://raw.githubusercontent.com/aalduz/vuesualize/master/src/assets/logo.png?token=AK4ZavWFbmL3n_oezsAk07fwTkqLCRV4ks5aLqKuwA%3D%3D',
              imageInViewMode: true
            },
            {
              number: 4.2,
              name: 'Go to Product page',
              nameInViewMode: true,
              description: 'By clicking on an item of the list of results, we navigate to PDP',
              descriptionInViewMode: true,
              imageSrc: 'https://static.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg',
              imageInViewMode: true
            }
          ]
        }
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

.user-journey--empty h3.clarification {
  border-top: 1px solid white;
  padding-top: 3rem;
}

.user-journey--empty .button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2rem;

    button {
      margin: 0 1rem;
    }
}

@import "styles/index";
</style>
