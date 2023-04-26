<template>
	<div class="container">
		<!-- <div class="sibling sibling4">
			<trajectoryVue></trajectoryVue>
		</div> -->
		<div class="sibling sibling1">
			<CoverStory></CoverStory>
		</div>

		<div style="margin: 5rem 0;">
			<div
				style="font-size: 40px; text-align: center; font-weight:bold; color: #5f2500; padding: 0px; padding-left:8px; line-height: 30px; border-radius: 12px; margin-bottom: 15px;">
				第一节 南极·自然
			</div>
			<div style="border-bottom: 1px solid #5f2500; width: 40%; margin: auto;"> </div>
			<div style="width: 60%; margin: auto; text-align: center;">
				第一节的简介
			</div>
		</div>

		<div class="sibling sibling2">
			<DragableEarth></DragableEarth>
		</div>
		<div class="sibling sibling2">
			<Daylight></Daylight>
		</div>
		<div class="sibling sibling3">
			<animalVue></animalVue>
		</div>
		<div style="margin: 5rem 0;">
			<div
				style="font-size: 40px; text-align: center; font-weight:bold; color: #5f2500; padding: 0px; padding-left:8px; line-height: 30px; border-radius: 12px; margin-bottom: 15px;">
				第二节 人类南极探险史
			</div>
			<div style="border-bottom: 1px solid #5f2500; width: 40%; margin: auto;"> </div>
			<div style="width: 60%; margin: auto; text-align: center;">
				第二节的简介
			</div>
		</div>
		<div class="sibling sibling1">
			<HumanActivity></HumanActivity>
		</div>
		<div class="sibling sibling4">
			<TimeLineVue></TimeLineVue>
		</div>
		<div class="sibling sibling4">
			<StationMap></StationMap>
		</div>
		<div class="sibling sibling4">
			<HumanActivity></HumanActivity>
		</div>

		<div style="margin: 5rem 0;">
			<div
				style="font-size: 40px; text-align: center; font-weight:bold; color: #5f2500; padding: 0px; padding-left:8px; line-height: 30px; border-radius: 12px; margin-bottom: 15px;">
				第三节 中国人在南极
			</div>
			<div style="border-bottom: 1px solid #5f2500; width: 40%; margin: auto;"> </div>
			<div style="width: 60%; margin: auto; text-align: center;">
				第三节的简介
			</div>
		</div>
		<div class="sibling sibling4">
			<ChinaStations></ChinaStations>
		</div>

		<div class="chapter">
			<p>end 参考文献</p>
		</div>
	</div>
</template>

<script>
import CoverStory from '../storyscroll/coverStory.vue';
import DragableEarth from '../storyscroll/dragableEarth.vue';
import animalVue from '../charts/animal.vue';
import StationMap from '../maps/stationMap.vue';
import TimeLineVue from '../charts/timeLine.vue';
import Daylight from '../maps/daylight.vue';
import HumanActivity from '../maps/humanActivity.vue';
import ChinaStations from '../maps/chinaStations.vue';
import trajectoryVue from '../storyscroll/trajectory.vue';

export default {
	name: 'ChapterFour',
	components: {
		CoverStory,
		DragableEarth,
		StationMap,
		animalVue,
		TimeLineVue,
		Daylight,
		HumanActivity,
		ChinaStations,
		trajectoryVue,
	},
	data() {
		return {

		}
	},
	created() {
		window.scrollTo(0, 0);
	},
}

</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	min-width: 1200px;
	margin: 0px;
	padding: 0px;
}

.chapter {
	width: 100%;
	height: 30vh;
	background-color: antiquewhite;
	display: flex;
	justify-content: center;
	align-items: center;
}

.chapter p {
	color: #000;
	font-size: 1.2rem;
	text-align: center;
	font-weight: bold;
}

.sibling {
	width: 100%;
}

.sibling3 {
	background-color: #9b59b6;
	/* height: 100vh; */
}
</style>