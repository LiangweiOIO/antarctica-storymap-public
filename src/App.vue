<template>
  <router-view></router-view>
</template>

<script>
import Homepage from './components/home.vue'

export default {
  name: 'App',
  components: {
    Homepage,
  }
}

</script>

<style>
/* 去除周围白边 */
html,
body {
  margin: 0;
  padding: 0;
}

</style>
