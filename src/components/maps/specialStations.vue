<template>
    <div id="special-stations"></div>
</template>
  
<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
import axios from 'axios';

export default {
    data() {
        return {
            land50: {},
            stations: {},

            windowWidth: -1,
            windowHeight: -1,
        }
    },
    async mounted() {
        let _this = this;
        try {
            let response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;
            response = await axios.get('/data/chinaStations.json');
            _this.stations = response.data;


            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            // console.log(this.windowWidth, this.windowHeight);

            let dom = document.getElementById('special-stations');
            dom.appendChild(_this.drawmap(this.windowWidth, this.windowHeight + 20));

        } catch (error) {
            console.log(error);
        }


    },
    methods: {
        drawmap(width, height) {
            // let width = 800;
            // let height = 500;
            let sphere = { type: "Sphere" };

            // Create the projection
            const projection = d3
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width * 0.5)
                .translate([width * 0.5, height * 0.5]);
            // .fitExtent([[0, 0], [width, height]], sphere)

            // Create the path generator
            const path = d3.geoPath(projection);

            // Create the SVG element
            const svg = d3.create('svg')
                .attr('viewBox', [0, 0, width, height])
                .style('background', 'white')
                .style('user-select', 'none')
                .style('-webkit-user-select', 'none');

            svg.append('path')
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr('d', path)
                .style('fill', '#d9d9d9')

            // Draw the map
            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .style('fill', "none")
                .style('stroke', "#d9d9d9")
                .style('stroke-width', 0.4)
                .style('stroke-opacity', .6)

            this.drawpoints(svg, projection);

            return svg.node();
        },
        drawpoints(map, projection) {
            var circles = map.selectAll("circle")
                .data(this.stations)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return projection([d.lon, d.lat])[0]; })
                .attr("cy", function (d) { return projection([d.lon, d.lat])[1]; })
                .attr("r", 4)
                // .attr("r", 1)
                .attr("fill", 'blue')
                .style("opacity", 0.7)
        },
    }
}

</script>
  
<style>
#special-stations {
    min-width: 1000px;
}
</style>