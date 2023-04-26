<template>
	<div class="container">
	  <div>
		<timeLineVue></timeLineVue>
	  </div>
	</div>
  </template>
	
  <script>
import timeLineVue from '../charts/timeLine.vue';
  
  export default {
	name: 'ChapterOne',
	components: {
		timeLineVue,
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
	