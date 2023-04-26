<template>
    <div>
        <section id="scrolly3">
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
            <figure id="figure2">
                <div id="china-station-scroll"></div>
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
            stations: {},
            data_list: [],

            //保存下map的svg对象
            projection: {},
            currentCenter: [0, 0],
        }
    },
    async mounted() {
        const _this = this;
        try {
            let response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;

            response = await axios.get('/data/chinaStations.json')
            _this.stations = response.data;

            this.initScrollama(this);

        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        initScrollama(_this) {
            // using d3 for convenience
            var main = d3.select("div"); //选择第一个div元素
            var scrolly = main.select("#scrolly3");
            var figure = scrolly.select("#figure2");
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
                let currentCenter = [0, 0];
                switch (mode) {
                    case 0:
                        startTransition(_this, [0, -90])
                        break;
                    case 1:
                        startTransition(_this, [0, -85])
                        break;
                    case 2:
                        startTransition(_this, [0, -80])
                        break;
                    case 3:
                        startTransition(_this, [10, -80])
                        break;
                    case 4:
                        startTransition(_this, [20, -80])
                        break;
                }

                function startTransition(_this, targetCenter) {
                    const offset = [0 + _this.currentCenter[0], -90 + _this.currentCenter[1]];
                    let v_center = [targetCenter[0] - offset[0], targetCenter[1] - offset[1]];
                    const figuredom = document.querySelector("figure");
                    let width = figuredom.offsetWidth;
                    let height = figuredom.offsetHeight;

                    const map = d3.select("#china-station-scroll");

                    const projection = d3
                        .geoAzimuthalEquidistant()
                        .rotate([0, 90, 0])
                        .scale(width * 0.8)
                        .translate([width * 0.5, height * 0.5])

                    const transition = map.transition().duration(500);

                    // 定义一个插值器函数，用于计算每个帧中地图投影的新中心坐标
                    // console.log(_this.currentCenter, v_center)
                    let destination = [_this.currentCenter[0] + v_center[0], _this.currentCenter[1] + v_center[1]];
                    const centerInterpolator = d3.interpolate(_this.currentCenter, destination);

                    // 在每个帧中更新地图的投影中心，从而实现平滑过渡
                    transition.tween("center", () => {
                        return (t) => {
                            const newCenter = centerInterpolator(t);
                            projection.center(newCenter);
                            // 重新绘制地图
                            redrawMap(map, projection);
                        };
                    });
                    _this.currentCenter[0] = _this.currentCenter[0] + v_center[0];
                    _this.currentCenter[1] = _this.currentCenter[1] + v_center[1];
                    console.log("current center:", _this.currentCenter);
                }

                function redrawMap(svg, projection) {
                    // 更新地图路径和其他元素
                    console.log(projection.center())
                    const path = d3.geoPath().projection(projection);
                    svg.selectAll("path").attr("d", path);
                    // 其他更新...
                }
            }
            function init() {

                // 1. force a resize on load to ensure proper dimensions are sent to scrollama
                handleResize();

                let dom = document.getElementById('china-station-scroll');

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
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width * 0.8)
                .translate([width * 0.5, height * 0.5])
            // .fitSize([width, height], this.iceshelf);
            this.projection = projection;
            const path = d3.geoPath().projection(projection);

            console.log(projection.center())

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

            // this.map = svg;
            return svg.node();
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