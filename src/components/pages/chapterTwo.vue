<template>
	<div class="container">
		<div class="sibling">
			<iframe width="100%" height="800" frameborder="0"
				src="https://observablehq.com/embed/1bfc5f38e3817e89@1923?cells=viewof+location%2Capp"></iframe>
			<!-- <newDaylight></newDaylight> -->
		</div>
	</div>
</template>
	
<script>
import newDaylight from '../storyscroll/newDaylight.vue';

export default {
	name: 'ChapterOne',
	components: {
		newDaylight,
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
	