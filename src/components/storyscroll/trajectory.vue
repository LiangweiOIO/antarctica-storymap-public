<template>
    <div>
        <section id="scrolly2">
            <article>
                <div class="step" data-step="1">
                    <p>{{ text1 }}</p>
                </div>
                <div class="step" data-step="2">
                    <p>{{ text2 }}</p>
                </div>
                <div class="step" data-step="3">
                    <p>{{ text3 }}</p>
                </div>
                <div class="step" data-step="4">
                    <p>{{ text4 }}</p>
                </div>
            </article>
            <figure id="figure2">
                <div id="dragableEarth-srcoll-step1"></div>
                <div id="dragableEarth-srcoll-step2"></div>
                <div id="dragableEarth-srcoll-step3"></div>
            </figure>
        </section>
    </div>
</template>
  
<script>
import scrollama from 'scrollama';
import * as d3 from 'd3';
import { geoScaleBar } from 'd3-geo-scale-bar';
import axios from 'axios';
import * as topojson from 'topojson';

export default {
    data() {
        return {
            land50: {},
            land110: {},
            pf: {},
            mp: {},
            iceshelf_list: [],
            iceshelf: {},
            // currentCenter: [0, 0],

            text1: '(此处应该绘制南极极点与北极极点，可以再绘制地磁南极迁移线与地磁北极迁移线。但是出现了一些bug，绘制不成功。)',
            text2: '南极（south pole）是根据地球的旋转方式决定的最南点。它通常表示地理上的南极区域，有一个固定的位置。按照国际上通行的概念，南纬60度以南的地区称为南极，它是南大洋及其岛屿和南极大陆的总称，总面积6500万平方公里。南极圈即南纬66°33′纬线圈，极圈内有极昼极夜现象，同时也是划分温带与寒带的界限。',
            text3: '南极辐合带是一条自然地理边界，地理位置在南纬48°~62°之间，是一个不规则的圆圈。这里是向北流动的南大洋表层水(0~300米深)与向南流动的温暖的海水相遇的地方，也是海水温度和盐度的跃变带，因此两边的海洋有特别明显的差异。我们通常自然地理上所说的南极，指的就是南极辐合带之内的区域。',
            text4: '开始介绍南极洲',
        }
    },
    async mounted() {
        const _this = this;
        try {
            let response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;

            response = await axios.get('/data/land-110m.json');
            _this.land110 = response.data;

            response = await axios.get('/data/polar-front.json');
            _this.pf = response.data;

            response = await axios.get('/data/megPoles.json');
            _this.mp = response.data;

            response = await axios.get('/data/USNIC_ANTARC_shelf_2022_merge-sim-nonproj.json');
            _this.iceshelf = response.data;

            response = await axios.get('/data/ross_wgs84.json');
            _this.iceshelf_list.push(response.data);

            response = await axios.get('/data/amery_wgs84.json');
            _this.iceshelf_list.push(response.data);

            response = await axios.get('/data/filchner-ronne_wgs84.json');
            _this.iceshelf_list.push(response.data);

            this.initScrollama(this);
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        initScrollama(_this) {
            // using d3 for convenience
            var main = d3.select("div"); //选择第一个div元素
            var scrolly = main.select("#scrolly2");
            var figure = scrolly.select("#figure2");
            var article = scrolly.select("article");
            var step = article.selectAll(".step");

            // initialize the scrollama
            var scroller = scrollama();

            // generic window resize listener event
            function handleResize() {
                // 1. update height of step elements
                var stepH = Math.floor(window.innerHeight * 1);
                step.style("height", stepH + "px");

                var figureHeight = Math.floor(window.innerHeight * 1);
                var figureMarginTop = (window.innerHeight - figureHeight) / 2;

                figure
                    // .style("width", figureHeight * 0.6 + "px")
                    .style("height", figureHeight + "px")
                    .style("top", figureMarginTop + "px");

                // 3. tell scrollama to update new element dimensions
                scroller.resize();
            }

            // scrollama event handlers
            function handleStepEnter(response) {

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
                    case 0: //显示极地极点
                        d3.select("#dragableEarth-srcoll-step1").style("display", null);
                        d3.select("#dragableEarth-srcoll-step2").style("display", "none");
                        break;
                    case 1: //显示南极-南极圈、60S圈
                        d3.select("#dragableEarth-srcoll-step1").style("display", "none");
                        d3.select("#dragableEarth-srcoll-step2").style("display", null);
                        d3.selectAll(".de-step2").style("display", null);
                        d3.selectAll(".de-step3").style("display", "none");
                        break;
                    case 2: //显示南极辐合带
                        d3.select("#dragableEarth-srcoll-step1").style("display", "none");
                        d3.selectAll(".de-step2").style("display", "none");
                        d3.selectAll(".de-step3").style("display", null);
                        d3.select("#dragableEarth-srcoll-step3").style("display", "none");
                        d3.select("#dragableEarth-srcoll-step2").style("display", null);
                        break;
                    case 3://显示南极地物
                        // d3.selectAll(".de-step3").style("display", "none");
                        d3.select("#dragableEarth-srcoll-step1").style("display", "none");
                        d3.select("#dragableEarth-srcoll-step2").style("display", "none");
                        d3.select("#dragableEarth-srcoll-step3").style("display", null);
                        break;
                }

            }
            function init() {

                // 1. force a resize on load to ensure proper dimensions are sent to scrollama
                handleResize();

                const figuredom = document.querySelector("figure");

                let dom = document.getElementById('dragableEarth-srcoll-step1');
                dom.innerHTML = "";
                _this.drawmap1(figuredom.offsetWidth * 0.8, figuredom.offsetHeight);

                dom = document.getElementById('dragableEarth-srcoll-step2');
                dom.innerHTML = "";
                _this.drawmap2(figuredom.offsetWidth * 0.8, figuredom.offsetHeight);

                dom = document.getElementById('dragableEarth-srcoll-step3');
                dom.innerHTML = "";
                _this.drawmap3(figuredom.offsetWidth * 0.8, figuredom.offsetHeight);

                // 2. setup the scroller passing options
                // 		this will also initialize trigger observations
                // 3. bind scrollama event handlers (this can be chained like below)
                scroller
                    .setup({
                        step: "#scrolly2 article .step",
                        offset: 0.33,
                        debug: false
                    })
                    .onStepEnter(handleStepEnter);
            }
            // kick things off
            init();
        },
        drawmap1(width, height) {
            const sensitivity = 50;

            let projection = d3
                .geoOrthographic()
                .scale(width * 0.4)
                .center([0, 0])
                .rotate([0, -30])
                // .clipAngle(null)
                .translate([width / 2, height / 2]);

            const initialScale = projection.scale();
            let path = d3.geoPath().projection(projection);

            let svg = d3
                .select("#dragableEarth-srcoll-step1")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            this.addText(svg, width, height);

            svg
                .append("circle")
                .attr("fill", "lightblue")
                // .attr("stroke", "#000")
                // .attr("stroke-width", "0")
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .attr("r", initialScale);

            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .style('fill', "none")
                .style('stroke', "#f2f2f2")
                .style('stroke-width', 0.4)
                .style('stroke-opacity', .6)

            svg.append('path')
                .datum(topojson.feature(this.land110, this.land110.objects.land))
                .attr('d', path)
                .style('fill', '#fff')

            this.drawLines(svg, projection)

            svg
                .append("circle")
                .attr("fill", "none")
                .attr("stroke", "#000")
                .attr("stroke-width", "1")
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .attr("r", initialScale);
            //Optional rotate
            d3.timer(function (elapsed) {
                const rotate = projection.rotate();
                const k = sensitivity / projection.scale();
                projection.rotate([rotate[0] - 1 * k, rotate[1]]);
                path = d3.geoPath().projection(projection);
                svg.selectAll("path").attr("d", path);
            }, 200);

            svg
                .call(
                    d3.drag().on("drag", (d) => {
                        const rotate = projection.rotate();
                        const k = sensitivity / projection.scale();
                        projection.rotate([
                            rotate[0] + d.dx * k,
                            rotate[1] - d.dy * k
                        ]);
                        path = d3.geoPath().projection(projection);
                        svg.selectAll("path").attr("d", path);
                    })
                );
        },
        drawmap2(width, height) {
            const sensitivity = 50;

            let projection = d3
                .geoOrthographic()
                .scale(width * 0.4)
                .center([0, 0])
                .rotate([0, 90])
                .translate([width / 2, height / 2]);

            const initialScale = projection.scale();
            let path = d3.geoPath().projection(projection);

            let svg = d3
                .select("#dragableEarth-srcoll-step2")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            this.addText(svg, width, height);

            svg
                .append("circle")
                .attr("fill", "lightblue")
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .attr("r", initialScale);

            svg
                .append("path")
                .datum(getCircle(-60))
                .attr("class", "de-step2")
                .attr("id", "S60")
                .attr("d", path)
                .style('fill', "#216bc6")
                .style("opacity", 0.2)
                .style('stroke', "none")

            svg
                .append("path")
                .datum(getCircle(-66.55))
                .attr("class", "de-step2")
                .attr("id", "S66")
                .attr("d", path)
                .style('fill', "#216bc6")
                .style("opacity", 0.3)
                .style('stroke', "none")

            svg
                .append("path")
                .datum(getCircle(-47))
                .attr("class", "de-step3")
                .attr("d", path)
                .style('fill', "#3ccfb7")
                .style("opacity", 0.3)
                .style('stroke', "none")

            svg
                .append("path")
                .datum(getCircle(-64))
                .attr("id", "tpath")
                .attr("class", "de-step3")
                .attr("d", path)
                .style('fill', "lightblue")
                .style("opacity", 1)
                .style('stroke', "none")

            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .style('fill', "none")
                .style('stroke', "#f2f2f2")
                .style('stroke-width', 0.4)
                .style('stroke-opacity', .6)

            svg.append("text")
                .append("textPath")
                .attr("href", "#S60")
                .attr("class", "de-step2")
                .attr("fill", "#91c2e0")
                .style("font-weight", "bold")
                .style("font-family", "sans-serif")
                .style("font-size", 16)
                .attr("startOffset", "45%") // 从路径的中间开始
                .attr("text-anchor", "middle")
                .style("letter-spacing", 5)
                .text("60°S");

            svg.append("text")
                .append("textPath")
                .attr("href", "#S66")
                .attr("class", "de-step2")
                .attr("fill", "#70a8d8")
                .style("font-weight", "bold")
                .style("font-family", "sans-serif")
                .style("font-size", 16)
                .attr("startOffset", "45%") // 从路径的中间开始
                .attr("text-anchor", "middle")
                .style("letter-spacing", 5)
                // .attr("startOffset", "10")
                .text("66°33'S");

            svg.append('path')
                .datum(topojson.feature(this.land110, this.land110.objects.land))
                .attr('d', path)
                .style('fill', '#fff')

            svg
                .append("path")
                // hacky line simplification, in order to make the legend readable
                .datum(this.pf)
                .attr("class", "de-step3")
                .attr("d", d3.line().curve(d3.curveBasisClosed))
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", [7, 3])
                .attr("stroke", "white");

            svg.append("text")
                .append("textPath")
                .attr("href", "#tpath") // tpath是你之前创建的路径的id
                .attr("id", "tapth-text")
                .attr("class", "de-step3")
                .attr("fill", "white")
                .style("font-weight", "bold")
                .style("font-family", "sans-serif")
                .style("font-size", 16)
                .attr("startOffset", "60%") // 从路径的中间开始
                .attr("text-anchor", "middle")
                .style("letter-spacing", 5)
                // .attr("startOffset", "10")
                .text("ANTARCTIC CONVERGENCE 南极辐合带");

            function getCircle(lat) {
                const lineCoordinates = [];

                // 计算南纬60度圈上每隔0.1度的点，并将其添加到数组中
                for (let i = 0; i < 360; i++) {
                    const lon = i - 180;
                    const point = [lon, lat];
                    lineCoordinates.push(point);
                }
                lineCoordinates.push(lineCoordinates[0]);

                // 将数组转换为LineString类型的geojson对象
                return {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: lineCoordinates
                    }
                };
            }
            svg
                .append("circle")
                .attr("fill", "none")
                .attr("stroke", "#000")
                .attr("stroke-width", "1")
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .attr("r", initialScale);

            svg
                .call(
                    d3.drag().on("drag", (d) => {
                        const rotate = projection.rotate();
                        const k = sensitivity / projection.scale();
                        projection.rotate([
                            rotate[0] + d.dx * k,
                            rotate[1] - d.dy * k
                        ]);
                        path = d3.geoPath().projection(projection);
                        svg.selectAll("path").attr("d", path);
                    })
                );

            //Optional rotate
            d3.timer(function (elapsed) {
                const rotate = projection.rotate();
                const k = sensitivity / projection.scale();
                projection.rotate([rotate[0] - 1 * k, rotate[1]]);
                path = d3.geoPath().projection(projection);
                svg.selectAll("path").attr("d", path);
            }, 200);

            d3.select("#dragableEarth-srcoll-step2").style("display", "none");
        },
        drawmap3(width, height) {
            //绘制地图
            width = width * 0.9;
            let svg = d3
                .select("#dragableEarth-srcoll-step3")
                .append("svg")
                .attr("width", width)
                .attr("height", width)
                .style("background", "lightblue")
                .style('user-select', 'none')
                .style('-webkit-user-select', 'none');

            const projection = d3
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width)
                .translate([width * 0.5, width * 0.5])
            const path = d3.geoPath().projection(projection);

            svg.append('path')
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr('d', path)
                .style('fill', '#f2f2f2')

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

            // 创建比例尺
            const scaleBar = geoScaleBar()
                .projection(projection)
                .size([width, width])
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

            this.drawIceShelf(svg, projection, path);

            d3.select("#dragableEarth-srcoll-step3").style("display", "none");
        },
        drawLines(svg, projection) {//修改为使用d3.geoCircle生成器
            let path = d3.geoPath().projection(projection);
            // svg.append("path")
            //     .datum([{ type: "LineString", coordinates: [[-30, 0], [30, 0]] }, { type: "LineString", coordinates: [[-30, 0], [30, 90]] }])
            //     .attr("d", path)
            //     .style("stroke", "red")
            //     .style("stroke-width", 2)
            //     .style("fill", "none");

            svg.append("g")
                .attr("class", "lines")
                .selectAll("path")
                .data([{ type: "LineString", coordinates: [[-30, 0], [30, 0]] }, { type: "LineString", coordinates: [[-30, 0], [30, 90]] }])
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", "none")
                .style("stroke", "red")
                .style("stroke-width", 2);
        },
        addText(svg, width, height) {
            // 添加text元素，并设置文字内容和位置
            svg
                .append("text")
                .attr("x", width / 2)
                .attr("y", height - 60) // 10为距离底部的距离，可自行调整
                .style("text-anchor", "middle") // 文字水平居中
                .style("fill", "#cccccc") // 文字颜色设置为灰色
                .style("user-select", "none") // 文字不可被选择
                .text("*拖拽可转动地球");
        },
        drawIceShelf(svg, projection, path) {
            let textLocation = [[-171.47, -81.86], [69.67, -70.92], [-44.56, -78.26]];
            let screenLocation = [];

            let fillColor = ["#9ce1ce", "#f9dd9c", "#d2e4aa"];
            let textContent = ["Ross Ice Shelf", "Amery Ice Shelf", "Filchner-ronne Ice Shelf"];
            let id_list = ["ross", "amery", "filchner-ronne"];

            for (let i = 0; i < 3; i++) {
                svg.append('path')
                    .datum(this.iceshelf_list[i])
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
#scrolly2 {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #f2f2f2;
    padding: 0;
    margin: 0;
}

#scrolly2>* {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

article {
    position: relative;
    padding: 0 0rem;
    max-width: 45%;
    width: 35%
}

article div {
    padding: 0 4rem;
}

figure {
    position: -webkit-sticky;
    position: sticky;
    width: 80%;
    margin: 0;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    background-color: white;
    z-index: 0;
}

.step p {
    text-align: center;
    /* padding-left: 5rem; */
    text-indent: 2.4rem;
    text-align: justify;
    color: #000;
    font-size: 1.2rem;
    line-height: 1.8;
}

figure div {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.step {
    margin: 0 auto 2rem auto;
    height: 100vh;
    background-color: #fff;
    color: #000;

    display: flex;
    justify-content: center;
    align-items: center;
}

.step:last-child {
    margin-bottom: 0;
}

/* .step.is-active {
    background-color: goldenrod;
    color: #3b3b3b;
} */
</style>