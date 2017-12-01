<template>
  <div id="app">
    <div class="container user-journey">
      <h1>{{ feature.name }}</h1>
      <h2>User journey</h2>
      <div class="row">
        <div class="col-12">
          <div class="steps-container row justify-content-lg-center">
            <div v-for="step in steps" class="col-12 col-lg-10 ">
              <div v-bind:class="step.childs ? 'user-journey-step-container--with-childs' : 'user-journey-step-container--no-childs'" class="user-journey-step-container">
                <div class="card user-journey-step">
                  <template v-if="step.isViewMode">
                    <h4 v-on:click="step.isViewMode = !step.isViewMode" class="card-header"><span class="step-number">{{ step.number }}</span>{{ step.name }}</h4>
                  </template>
                  <template v-else>
                    <div class="container">
                      <div class="row">
                        <div class="col-10">
                          <input type="text" v-model="step.name" class="form-control">
                        </div>
                        <div class="col-2">
                          <button v-on:click="step.isViewMode = !step.isViewMode" class="btn btn-primary">Save</button>
                        </div>
                      </div>
                    </div>
                  </template>

                  <div class="card-body">
                    <p class="card-text">{{ step.description }}</p>
                  </div>
                  <img src="./assets/logo.png" class="card-img-bottom">
                </div>
                <template v-if="step.childs">
                  <div class="row">
                    <div v-for="step in step.childs" class="col">
                      <div class="user-journey-step-container user-journey-step-container--child">
                        <div class="card user-journey-step">
                          <template v-if="step.isViewMode">
                            <h4 v-on:click="step.isViewMode = !step.isViewMode" class="card-header"><span class="step-number">{{ step.number }}</span>{{ step.name }}</h4>
                          </template>
                          <template v-else>
                            <div class="container">
                              <div class="row">
                                <div class="col-10">
                                  <input type="text" v-model="step.name" class="form-control">
                                </div>
                                <div class="col-2">
                                  <button v-on:click="step.isViewMode = !step.isViewMode" class="btn btn-primary">Save</button>
                                </div>
                              </div>
                            </div>
                          </template>

                          <div class="card-body">
                            <p class="card-text">{{ step.description }}</p>
                          </div>
                          <img src="./assets/logo.png" class="card-img-bottom">
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
    // src: (assetName) => {
    //   return require('../../assets/' + assetName);
    // }
  },
  data () {
    return {
      feature: {
        name: 'My new task'
      },
      steps : [
        {
          number: 1,
          name: 'Entry point',
          description: 'Search is engaged',
          isViewMode: true,
          // imageSrc: this.src('logo.png'),
          steps: []
        },
        {
          number: 2,
          name: 'Search for a product',
          description: 'We type in something in the input',
          isViewMode: true,
          // imageSrc: this.src('step-1.png'),
          steps: []
        },
        {
          number: 3,
          name: 'Go to Product page',
          description: 'By clicking on an item of the list of results, we navigate to PDP',
          isViewMode: true,
          // imageSrc: this.src('step-2.png'),
          steps: []
        },
        {
          number: 4,
          name: 'Go to Product page',
          description: 'By clicking on an item of the list of results, we navigate to PDP',
          isViewMode: true,
          // imageSrc: this.src('step-2.png'),
          childs: [
            {
              number: 4.1,
              name: 'Go to Product page',
              description: 'By clicking on an item of the list of results, we navigate to PDP',
              isViewMode: true,
              // imageSrc: this.src('step-2.png'),
            },
            {
              number: 4.2,
              name: 'Go to Product page',
              description: 'By clicking on an item of the list of results, we navigate to PDP',
              isViewMode: true,
              // imageSrc: this.src('step-2.png'),
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

@import "styles/index";
</style>
