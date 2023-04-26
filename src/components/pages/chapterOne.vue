<template>
  <div class="container">
    <div class="sibling">
      <DragableEarth></DragableEarth>
    </div>
  </div>
</template>
  
<script>
import DragableEarth from '../storyscroll/dragableEarth.vue';

export default {
  name: 'ChapterOne',
  components: {
    DragableEarth,
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {

  },

}
</script>
  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-width: 1200px;
}

.sibling {
  width: 100%;
  height: 100vh;
}
</style>
  