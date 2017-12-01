<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="steps-container">
            <div v-for="step in steps" class="card user-journey-step">
              <h4 class="card-header"><span class="step-number">{{ step.number }}</span>{{ step.name }}</h4>
              <div class="card-body">
                <p class="card-text">{{ step.description }}</p>
              </div>
              <!-- <img v-bind:src="step.imageSrc" class="card-img-bottom"> -->
              <img src="./assets/logo.png" class="card-img-bottom">
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
  data () {
    return {
      steps : [
        {
          number: 1,
          name: 'Entry point',
          description: 'Search is engaged',
          imageSrc: '../../assets/logo.png',
        },
        {
          number: 2,
          name: 'Search for a product',
          description: 'We type in something in the input',
          imageSrc: '../assets/logo.png',
        },
        {
          number: 3,
          name: 'Go to Product page',
          description: 'By clicking on an item of the list of results, we navigate to PDP',
          imageSrc: '../assets/logo.png',
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

@import "styles/index";
</style>
