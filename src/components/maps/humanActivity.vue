<template>
    <div id="human-activity"></div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
import axios from 'axios';
import { geoScaleBar } from 'd3-geo-scale-bar';

export default {
    data() {
        return {
            land50: {},
            activity: {},
        }
    },
    async mounted() {
        const _this = this;
        try {
            let response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;

            response = await axios.get('/data/human_activity_70.json');
            _this.activity = response.data;

            let dom = document.getElementById('human-activity');
            dom.innerHTML = "";
            dom.appendChild(_this.drawmap(window.innerWidth, window.innerHeight));
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        drawmap(width, height) {
            const data = this.activity.features.filter(function (d) { return d.properties.Join_Count > 0; });

            const domain = [10, 25, 100, 250, 1000, 2500, 10000];

            const colorScale = d3.scaleThreshold()
                .domain(domain)
                // .range(d3.schemeBuPu[9])
                .range(d3.schemeGnBu[9])
            // .range(d3.schemeBlues[9]);

            const projection = d3
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width * 0.7)
                .translate([width * 0.5, height * 0.5]);

            const path = d3.geoPath(projection);

            const svg = d3
                .create("svg")
                .attr("viewBox", [0, 0, width, height])
                .style("background", "white");

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
                .attr("fill", "#f2f2f2");

            // 创建点图层
            var points = svg.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
                .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
                .attr("r", function (d) { return 5; })//d.properties.Join_Count; })
                .attr("fill", function (d) { return colorScale(d.properties.Join_Count) });

            // 创建比例尺
            const scaleBar = geoScaleBar()
                .projection(projection)
                .size([width, height])
                .left(.75)
                .top(.9)
                // .units(d3.geoScaleMiles) //默认是km
                .distance(1000) // The distance of the scale bar
                .label("1000 km") // The label on top of the scale bar
                .labelAnchor("middle") // The position of the label (you can also pass "start" and "end")
                .tickSize(null) // The height of the bar
                .tickValues(null);// The tick values below the bar will be removed

            svg.append("g")
                .attr("class", "scalebar")
                .call(scaleBar);

            // ---------图例-----------
            const legend = svg.append("g")
                .attr("class", "legend")
                .attr("transform", "translate(20,20)");

            legend.selectAll(".legend-block")
                .data(domain)
                .enter().append("rect")
                .attr("class", "legend-block")
                .attr("x", 0)
                .attr("y", (d, i) => 10 + i * 20)
                .attr("width", 12)
                .attr("height", 12)
                .attr("fill", colorScale);

            legend.selectAll(".legend-label")
                .data(domain)
                .enter().append("text")
                .attr("class", "legend-label")
                .attr("x", 20)
                .attr("y", (d, i) => 21 + i * 20)
                .text(d => `> ${d}`)
                .style("font-size", "14px")
                .style("font-family", "sans-serif");

            svg.append("text")
                .attr("x", 10)
                .attr("y", 20)
                .attr("font-size", "16px")
                .attr("font-weight", "bold")
                .text("人类活动记录数量");

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