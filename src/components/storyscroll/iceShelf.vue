<template>
    <div>
        <section id="scrolly">
            <article>
                <div class="step" data-step="1">
                    <p>STEP 1</p>
                </div>
                <div class="step" data-step="2">
                    <p>STEP 2</p>
                </div>
                <div class="step" data-step="3">
                    <p>STEP 3</p>
                </div>
                <div class="step" data-step="4">
                    <p>STEP 4</p>
                </div>
            </article>
            <figure id="figure3">
                <div id="ice-shelf-test"></div>
            </figure>
        </section>
    </div>
</template>
  
<script>
import scrollama from 'scrollama';
import * as d3 from 'd3';
import axios from 'axios';
import * as topojson from 'topojson';

export default {
    data() {
        return {
            land50: {},
            iceshelf: {},
            data_list: [],

            windowWidth: -1,
            windowHeight: -1,
        }
    },
    async mounted() {
        const _this = this;
        try {
            let response = await axios.get('/data/USNIC_ANTARC_shelf_2022_merge-sim-nonproj.json');
            _this.iceshelf = response.data;

            response = await axios.get('/data/ross_wgs84.json');
            _this.data_list.push(response.data);

            response = await axios.get('/data/amery_wgs84.json');
            _this.data_list.push(response.data);

            response = await axios.get('/data/filchner-ronne_wgs84.json');
            _this.data_list.push(response.data);

            response = await axios.get('/data/land-50m.json')
            _this.land50 = response.data;

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            this.initScrollama(this);

        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        initScrollama(_this) {
            // using d3 for convenience
            var main = d3.select("div"); //选择第一个div元素
            var scrolly = main.select("#scrolly");
            var figure = scrolly.select("#figure3");
            var article = scrolly.select("article");
            var step = article.selectAll(".step");

            // initialize the scrollama
            var scroller = scrollama();

            // generic window resize listener event
            function handleResize() {
                // 1. update height of step elements
                var stepH = Math.floor(window.innerHeight * 0.75);
                step.style("height", stepH + "px");

                var figureHeight = Math.floor(window.innerHeight * 0.9);
                var figureMarginTop = (window.innerHeight - figureHeight) / 2;

                figure
                    .style("height", figureHeight + "px")
                    .style("top", figureMarginTop + "px");

                d3.select("#ross").style("display", "none");
                d3.select("#text-ross").style("display", "none");

                d3.select("#amery").style("display", "none");
                d3.select("#text-amery").style("display", "none");

                d3.select("#filchner-ronne").style("display", "none");
                d3.select("#text-filchner-ronne").style("display", "none");

                // 3. tell scrollama to update new element dimensions
                scroller.resize();
            }

            // scrollama event handlers
            function handleStepEnter(response) {
                // console.log(response);
                // response = { element, direction, index }

                // add color to current step only

                let mode = response.index;

                step.classed("is-active", function (d, i) {

                    return i === mode;
                });
                // update graphic based on step
                // figure.select("p").text(response.index + 1);

                handleMapChange(mode);
            }
            function handleMapChange(mode) {
                //这块封装成一个函数
                switch (mode) {
                    case 0:
                        d3.select("#ross").style("display", null);
                        d3.select("#text-ross").style("display", null);
                        d3.select("#amery").style("display", "none");
                        d3.select("#text-amery").style("display", "none");
                        d3.select("#filchner-ronne").style("display", "none");
                        d3.select("#text-filchner-ronne").style("display", "none");
                        break;
                    case 1:
                        d3.select("#amery").style("display", null);
                        d3.select("#text-amery").style("display", null);
                        d3.select("#ross").style("display", "none");
                        d3.select("#text-ross").style("display", "none");
                        d3.select("#filchner-ronne").style("display", "none");
                        d3.select("#text-filchner-ronne").style("display", "none");
                        break;
                    case 2:
                        d3.select("#filchner-ronne").style("display", null);
                        d3.select("#text-filchner-ronne").style("display", null);
                        d3.select("#amery").style("display", "none");
                        d3.select("#text-amery").style("display", "none");
                        d3.select("#ross").style("display", "none");
                        d3.select("#text-ross").style("display", "none");
                        break;
                    case 3:
                        d3.select("#ross").style("display", null);
                        d3.select("#text-ross").style("display", null);
                        d3.select("#amery").style("display", null);
                        d3.select("#text-amery").style("display", null);
                        d3.select("#filchner-ronne").style("display", null);
                        d3.select("#text-filchner-ronne").style("display", null);
                        break;
                }
            }
            function init() {

                // 1. force a resize on load to ensure proper dimensions are sent to scrollama
                handleResize();

                let dom = document.getElementById('ice-shelf-test');
                const figuredom = document.querySelector("figure");

                dom.innerHTML = "";
                dom.appendChild(_this.drawBaseMap(figuredom.offsetWidth, figuredom.offsetHeight + 10));

                // 2. setup the scroller passing options
                // 		this will also initialize trigger observations
                // 3. bind scrollama event handlers (this can be chained like below)
                scroller
                    .setup({
                        step: "#scrolly article .step",
                        offset: 0.33,
                        debug: false
                    })
                    .onStepEnter(handleStepEnter);
            }
            // kick things off
            init();
        },
        drawBaseMap(width, height) {
            //绘制地图
            const svg = d3
                .create("svg")
                .attr("viewBox", [0, 0, width, height])
                .style("background", "white")
                .style('user-select', 'none')
                .style('-webkit-user-select', 'none');
            const projection = d3

                // .geoIdentity()
                // .reflectY(true)
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width * 0.9)
                .translate([width * 0.5, height * 0.5])
            // .fitSize([width, height], this.iceshelf);
            const path = d3.geoPath().projection(projection);

            // console.log(topojson.feature(this.land50, this.land50.objects.land))
            svg.append('path')
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr('d', path)
                .style('fill', '#878787')

            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .attr("fill", "none")
                .attr("stroke-width", 0.2)
                .attr("stroke", "white");

            svg.append('path')
                .datum(this.iceshelf)
                .attr('d', path)
                .attr("class", "iceshelf")
                .attr("fill", "none")
                .attr("stroke-width", 0.8)
                .attr("stroke", "#444654")

            this.drawIceShelf(svg, projection, path);
            return svg.node();
        },
        drawIceShelf(svg, projection, path) {
            let textLocation = [[-171.47, -81.86], [69.67, -70.92], [-44.56, -78.26]];
            let screenLocation = [];

            let fillColor = ["#9ce1ce", "#f9dd9c", "#d2e4aa"];
            let textContent = ["Ross Ice Shelf", "Amery Ice Shelf", "Filchner-ronne Ice Shelf"];
            let id_list = ["ross", "amery", "filchner-ronne"];

            for (let i = 0; i < 3; i++) {
                svg.append('path')
                    .datum(this.data_list[i])
                    .attr('d', path)
                    .attr("id", id_list[i])
                    .attr("fill", fillColor[i])
                    .attr("stroke-width", 0.8)
                    .attr("stroke", "white");
                    
                screenLocation = projection(textLocation[i]);
                svg.append("text")
                    .attr("id", "text-" + id_list[i])
                    .attr("x", screenLocation[0])
                    .attr("y", screenLocation[1])
                    .text(textContent[i]);
            }
        }
    }

}
</script>

<style scoped>
#scrolly {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #f3f3f3;
    padding: 1rem;
}

#scrolly>* {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

article {
    position: relative;
    padding: 0 1rem;
    max-width: 20rem;
}

figure {
    position: -webkit-sticky;
    position: sticky;
    width: 100%;
    margin: 0;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    background-color: white;
    z-index: 0;
}

figure p {
    text-align: center;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 8rem;
    font-weight: 900;
    color: #fff;
}

#ice-shelf-test {
    position: relative;
    height: 100%;
}

.step {
    margin: 0 auto 2rem auto;
    height: 100vh;
    background-color: #3b3b3b;
    color: #fff;
}

.step:last-child {
    margin-bottom: 0;
}

.step.is-active {
    background-color: goldenrod;
    color: #3b3b3b;
}

.step p {
    text-align: center;
    padding: 1rem;
    font-size: 1.5rem;
}
</style>