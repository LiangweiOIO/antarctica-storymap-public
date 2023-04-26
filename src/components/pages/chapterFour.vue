<template>
	<div class="container">
	  <div class="sibling">
		<stationMap></stationMap>
	  </div>
	</div>
  </template>
	
  <script>
import stationMap from '../maps/stationMap.vue';
  
  export default {
	name: 'ChapterOne',
	components: {
		stationMap
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
	min-width: 1100px;
  }
  
  .sibling {
	width: 100%;
  }
  </style>
	