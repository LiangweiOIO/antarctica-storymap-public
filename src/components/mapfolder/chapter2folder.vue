<template>
    <div id="chapter1folder">
        <div id="arrow1"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson'
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
        let _this = this;
        try {
            const response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            let dom = document.getElementById('chapter1folder');
            dom.appendChild(this.drawmap(this.windowWidth, this.windowHeight+20));

        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        drawmap(width, height) {
            // Create the projection
            const projection = d3.geoStereographic()
                .rotate([95, 45])
                .translate([width / 2, height / 2])
                .scale(width * 0.1)
                .center([0, -90])
                .clipAngle(166)
            // .fitExtent([[0, 0], [width, height]], sphere)

            // Create the path generator
            const path = d3.geoPath(projection);

            // Create the SVG element
            const svg = d3.create('svg')
                .attr('viewBox', [0, 0, width, height])
                .style('background', 'lightblue');

            // Draw the map
            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .style('fill', "none")
                .style('stroke', "white")
                .style('stroke-width', 0.4)
                .style('stroke-opacity', .6)

            svg.append('path')
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr('d', path)
                .style('fill', 'white')

            // Add Title
            let txttitle = "第二章\n探索南极".split("\n");
            var title = svg
                .append("text")
                .attr("y", 10)
                .attr("font-family", "sans-serif")
                .attr("font-weight", "bold")
                .attr("fill", "#1f235c")
                .style("font-size", "46px")
                .attr("fill-opacity", 0.7)
                .style('user-select', 'none')
                .style('-webkit-user-select', 'none');

            txttitle.forEach(d => {
                title
                    .append("tspan")
                    .attr("x", 20)
                    .attr("dy", 70)
                    .text(d);
            });

            //Add txt
            let txtlegend = ["在人类历史上，南极大陆一直是一个神秘而危险的地方", "但是，这并没有阻止人们对这个地区进行探索和冒险", "自从南极被发现以来，无数的探险家和科学家就开始了一场冒险之旅", "试图解开南极的神秘面纱"];
            var legend = svg
                .append("text")
                .attr("font-family", "sans-serif")
                .attr("fill", "#1f235c")
                .style("font-size", "12px")
                .attr("fill-opacity", 0.9)
                .attr("x", 40)
                .attr("y", 350)
                .style('user-select', 'none')
                .style('-webkit-user-select', 'none');

            legend
                .append("tspan")
                .attr("x", 20)
                .attr("dy", 10)
                .text("How To Read The Map?")
                .attr("font-weight", "bold")
                .style("font-size", "15px");

            txtlegend.forEach(d => {
                legend
                    .append("tspan")
                    .attr("x", 20)
                    .attr("dy", 19)
                    .text(d);
            });

            return svg.node();
        }
    }
}
</script>

<style>
#chapter2folder {
    min-width: 1200;
}

#arrow1 {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(135deg);
    width: 20px;
    height: 20px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    animation: arrowBlink 1.2s ease-in-out infinite;
}

@keyframes arrowBlink {
    0% {
        opacity: 0.3;
        transform: translate(-50%, -50%) rotate(135deg) scale(1);
    }

    50% {
        opacity: 1;
        transform: translate(-50%, -50%) rotate(135deg) scale(1.2);
    }

    100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) rotate(135deg) scale(1);
    }
}
</style>