<template>
    <div id="chapter1folder">
        <!-- <div id="arrow1">

        </div> -->
        <button id="button-down" @click="scrollDown">阅读故事</button>
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
            dom.appendChild(this.drawmap(this.windowWidth, this.windowHeight + 20));

        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        drawmap(width, height) {
            // Create the projection
            const projection = d3.geoStereographic()
                .rotate([95, 45])
                .translate([width * 0.5, height * 0.5])
                .scale(width * 0.1)
                .center([0, -90])
                .clipAngle(166)
            // .fitExtent([[0, 0], [width, height]], sphere)

            // Create the path generator
            const path = d3.geoPath(projection);

            // Create the SVG element
            const svg = d3.create('svg')
                .attr('viewBox', [0, 0, width, height])
                .style('background', '#283361')
                .style('user-select', 'none')
                .style('-webkit-user-select', 'none');

            // Draw the map
            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .style('fill', "none")
                .style('stroke', "#4b5a75")
                .style('stroke-width', 0.4)
                .style('stroke-opacity', .6)

            svg.append('path')
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr('d', path)
                .style('fill', '#fef7e0')

            //ADD title
            let title = "第一章\n南极洲\n自然".split("\n");
            svg
                .append("g")
                .selectAll('rect')
                .data(title)
                .join('rect')
                .attr("x", 0)
                .attr("y", (d, i) => 0 + i * 80)
                .attr("height", 60)
                .attr("width", d => 40 + d.length * 60)
                .attr("fill", "#9ACBE3");

            svg
                .append("g")
                .selectAll('text')
                .data(title)
                .join('text')
                .attr('transform', (d, i) => `translate(${20},${i * 80})`)
                .attr('dy', 50)
                .style('font-family', 'sans-serif')
                .text(d => d)
                .attr("font-family", "sans-serif")
                .attr("font-weight", "bold")
                .attr("fill", "white")
                .style("font-size", "55px")
                .attr("fill-opacity", 0.5);

            //Add txt
            let txtlegend = ["当人们谈起南极时", "他们往往想到无尽的冰雪和荒凉", "然而，南极是地球上最不可思议的地方之一", "自然信息之丰富可能超出了你的想象。"];
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
        },
        scrollDown() {
            window.scrollBy({
                top: window.innerHeight,
                behavior: "smooth"
            });
        }
    }
}
</script>

<style>
#chapter1folder {
    min-width: 1000px;
    background-color: #fef7e0;
    padding: 0px;
    margin: 0px;
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

#button-down {
    position: absolute;
    top: 70%;
    left: 50%;
    width: 145px;
    height: 56px;
    border: 2px solid #fff;
    color:#fff;
    font-size: 1em;
    background-color: transparent;
    transform: translate(-50%, -50%) rotate(0deg);
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