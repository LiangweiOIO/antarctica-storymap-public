<template>
	<div class="wallpaper">
		<div style="z-index: 1;">
			<Post></Post>
		</div>
		<AppFooter class="footer"></AppFooter>
	</div>

	<AppHeader></AppHeader>
	

</template>

<script>
import SouthPole from '@/components/maps/southPole.vue';
import AppHeader from '@/components/appHeader.vue';
import AppFooter from '@/components/appFooter.vue';
import Post from '@/components/post.vue'

export default {
	name: 'Homepage',
	components: {
		SouthPole,
		AppHeader,
		AppFooter,
		Post,
	},
	mounted() {

	}
}
</script>

<style>
.wallpaper {
	position: absolute;
	top: 0;
	width: 100%;
	/* height: 1400px; */
	z-index: 100;
	background-image: url("/img/1657_map_Polus_Antarcticus.jpg");
	background-size: cover;
	background-position: center;
	overflow: hidden;
}
.footer{
	z-index: 2;
}
</style>