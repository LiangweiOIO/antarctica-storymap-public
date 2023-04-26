<template>
    <div id="south-pole"></div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
import axios from 'axios';

export default {
    data() {
        return {
            land50: {},
            
            windowWidth: -1,
            windowHeight: -1,
        }
    },
    async mounted() {
        const _this = this;
        try {
            const response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;
            
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            let dom = document.getElementById('south-pole');
            dom.appendChild(_this.drawmap(this.windowWidth,this.height + 20));
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        drawmap(width, height) {

            //绘制地图
            const svg = d3
                .create("svg")
                .attr("viewBox", [0, 0, width, height])
                .style("background", "#424561");

            const projection = d3
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width * 0.5)
                .translate([width * 0.5, height * 0.5]);
            const path = d3.geoPath(projection);

            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .attr("fill", "none")
                .attr("stroke-width", 0.25)
                .attr("stroke", "white");

            svg
                .append("path")
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr("d", path)
                .attr("fill", "#F7F2E8")

            return svg.node();
        }
    }
}

</script>

<style>
#southPole {
    min-width: 1200px;
}
</style>