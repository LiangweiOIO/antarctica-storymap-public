<template>
  <div>
    <div ref="scrollama" style="position: sticky; top: 0;">
      <div v-for="(step, index) in steps" :key="index" :class="{ 'is-active': index === currentStep }" class="step">
        <div v-if="index === 0">
          <figure style="background-color: #8a8a8a">
            <p>A</p>
          </figure>
        </div>
        <div v-else>
          <p>Step {{ index }}</p>
        </div>
      </div>
    </div>
    <div ref="content">
      <div v-for="(step, index) in steps" :key="index" :class="'step-' + index">
        <div v-if="index === 0">
          <article style="background-color: #f3f3f3">
            <p>Some content here</p>
          </article>
        </div>
        <div v-else>
          <p>Some more content here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scrollama from 'scrollama'

export default {
  name: 'ScrollamaComponent',
  data() {
    return {
      currentStep: 0,
      steps: ['step-1', 'step-2', 'step-3', 'step-4']
    }
  },
  mounted() {
    const scroller = Scrollama()
    scroller
      .setup({
        step: '.step',
        offset: 0.5
      })
      .onStepEnter(response => {
        this.currentStep = response.index
      })
  },
}
</script>

<style scoped>
.step {
  margin: 0 auto 2rem auto;
  background-color: #3b3b3b;
  color: #fff;
  height: 100vh;
}

.step:last-child {
  margin-bottom: 0;
}

.step.is-active {
  background-color: goldenrod;
  color: #3b3b3b;
}

.step p {
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
}

article {
  position: relative;
  padding: 0 1rem;
  max-width: 20rem;
}

figure {
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  margin: 0;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  background-color: #8a8a8a;
  z-index: 0;
}

figure p {
  text-align: center;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 8rem;
  font-weight: 900;
  color: #fff;
}
</style>
