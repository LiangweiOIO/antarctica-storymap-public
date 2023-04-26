<template>
    <div>
        <section id="scrolly3">
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
            <figure id="figure3">
                <div id="daylight-step1"></div>
                <div id="daylight-step2"></div>
                <div id="daylight-step3"></div>
                <div id="daylight-step3"></div>
            </figure>
        </section>
    </div>
</template>
  
<script>
import scrollama from 'scrollama';
import * as d3 from 'd3';
// import { geoScaleBar } from 'd3-geo-scale-bar';
import axios from 'axios';
import * as topojson from 'topojson';
// import { drag } from "d3-drag";

export default {
    data() {
        return {
            land110: {},
            location: [0, -60],
            colors: {
                night: "#719fb6",
                day: "#ffe438",
                grid: "#4b6a79",
                ocean: "lightblue",
                land: "#f5f1dc",
                sun: "#ffe438"
            },
            EventType: {
                LocationChange: "LOCATION_CHANGE",
                DateHourChange: "DATE_HOUR_CHANGE"
            },

            text1: '春分至夏至',
            text2: '夏至至秋分',
            text3: '秋分至冬至',
            text4: '冬至至春分',
        }
    },
    async mounted() {
        const _this = this;
        try {
            let response = await axios.get('/data/land-110m.json');
            const world = response.data;
            _this.land110 = topojson.feature(world, world.objects.land);

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
            var figure = scrolly.select("#figure3");
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

                // handleMapChange(mode);
            }
            function handleMapChange(mode) {
                //这块封装成一个函数

                switch (mode) {
                    // case 0: //显示极地极点
                    //     d3.select("#dragableEarth-srcoll-step1").style("display", null);
                    //     d3.select("#dragableEarth-srcoll-step2").style("display", "none");
                    //     break;
                    // case 1: //显示南极-南极圈、60S圈
                    //     d3.select("#dragableEarth-srcoll-step1").style("display", "none");
                    //     d3.select("#dragableEarth-srcoll-step2").style("display", null);
                    //     d3.selectAll(".de-step2").style("display", null);
                    //     d3.selectAll(".de-step3").style("display", "none");
                    //     break;
                    // case 2: //显示南极辐合带
                    //     d3.select("#dragableEarth-srcoll-step1").style("display", "none");
                    //     d3.selectAll(".de-step2").style("display", "none");
                    //     d3.selectAll(".de-step3").style("display", null);
                    //     d3.select("#dragableEarth-srcoll-step3").style("display", "none");
                    //     d3.select("#dragableEarth-srcoll-step2").style("display", null);
                    //     break;
                    // case 3://显示南极地物
                    //     // d3.selectAll(".de-step3").style("display", "none");
                    //     d3.select("#dragableEarth-srcoll-step1").style("display", "none");
                    //     d3.select("#dragableEarth-srcoll-step2").style("display", "none");
                    //     d3.select("#dragableEarth-srcoll-step3").style("display", null);
                    //     break;
                }

            }
            function init() {

                // 1. force a resize on load to ensure proper dimensions are sent to scrollama
                handleResize();

                const figuredom = document.querySelector("#figure3");

                const springEquinox = new Date(Date.UTC(2023, 2, 21, 0, 0, 0));
                const nextSpringEquinox = new Date(Date.UTC(2024, 2, 21, 0, 0, 0));
                let dom = document.getElementById('daylight-step1');
                dom.innerHTML = "";
                _this.drawmap(figuredom.offsetWidth * 1, figuredom.offsetHeight, springEquinox, nextSpringEquinox);

                // 2. setup the scroller passing options
                // 		this will also initialize trigger observations
                // 3. bind scrollama event handlers (this can be chained like below)
                scroller
                    .setup({
                        step: "#scrolly3 article .step",
                        offset: 0.33,
                        debug: false
                    })
                    .onStepEnter(handleStepEnter);
            }
            // kick things off
            init();
        },
        drawmap(width, height, t1, t2) {
            // const toRadians = (val) => val * Math.PI / 180;

            const colors = this.colors;

            const toDegrees = (val) => val * 180 / Math.PI;

            const yearDates = (year) => {
                const startDate = new Date(year, 0, 1);
                const endDate = new Date(year + 1, 0, 1);

                return d3.timeDay.range(startDate, endDate);
            }

            /*
            * Formulas uses the CBM model as reviewed here:
            * https://www.ikhebeenvraag.be/mediastorage/FSDocument/171/Forsythe+-+A+model+comparison+for+daylength+as+a+function+of+latitude+and+day+of+year+-+1995.pdf
            */
            const dayLength = (date, latitude) => {
                const yearStart = new Date(date.getFullYear(), 0, 1);
                const dayOfYear = Math.floor((date.getTime() - yearStart.getTime()) / 86400000) + 1;
                const revAngle = 0.2163108 + 2 * Math.atan(0.9671396 * Math.tan(0.00860 * (dayOfYear - 186)));
                const decAngle = Math.asin(0.39795 * Math.cos(revAngle));

                /* daylight coefficient selected for apparent sunrise/sunset */
                const p = 0.8333

                const intResult =
                    (Math.sin((p * Math.PI) / 180) +
                        Math.sin((latitude * Math.PI) / 180) * Math.sin(decAngle)) /
                    (Math.cos((latitude * Math.PI) / 180) * Math.cos(decAngle));

                if (intResult >= 1) return 24;
                if (intResult <= -1) return 0;

                return 24 - 24 * Math.acos(intResult) / Math.PI;
            }

            const getSolarAngle = (date) => (dayOfYear(date) + 10) / 365 * Math.PI * 2 - Math.PI / 2;

            const fontSize = 12;

            const dayOfYear = (date) => {
                const yearStart = new Date(date.getFullYear(), 0, 1);
                return Math.floor((date.getTime() - yearStart.getTime()) / 86400000) + 1
            }

            const globe = (root, { width, location, date, hour }) => {
                // 其实在这个函数中，绘制shadow面并不一定需要准确的location作为参数
                // 我对此处进行了修改，该方法需要用到随意的一个坐标点来计算shadow面（只要这个点经度与location参数一致，纬度不是0、-90或90即可）
                const solarAngle = getSolarAngle(date);
                const solarAngleDeg = toDegrees(solarAngle);
                const hourSpin = 360 * ((hour + 12) / 24);
                const spin = 180 + -location[0] + solarAngleDeg + hourSpin;
                const tilt = 0 - location[1];

                const projection = d3
                    .geoOrthographic()
                    .fitWidth(width, d3.geoGraticule10())
                    .rotate([spin, tilt, 23.5]);
                const path = d3.geoPath(projection);

                const unClippedProjection = d3
                    .geoOrthographic()
                    .clipAngle(null)
                    .fitWidth(width, d3.geoGraticule10())
                    .rotate([spin, tilt, 23.5]);
                const unClippedPath = d3.geoPath(unClippedProjection);

                // const staticProjection = d3
                //   .geoOrthographic()
                //   .fitWidth(width, d3.geoGraticule10())
                //   .rotate([solarAngleDeg - 90, tilt]);
                // const staticPath = d3.geoPath(staticProjection);

                const background = root.append("g");
                const earth = root.append("g").style("opacity", 0.75);
                const foreground = root.append("g");

                earth
                    .append("path")
                    .attr("d", path({ type: "Sphere" }))
                    .attr("fill", colors.ocean)
                    .attr("stroke", "#9ecbda");

                earth.append("path").attr("d", path(this.land110)).attr("fill", colors.land);

                background
                    .append("path")
                    .attr("d", unClippedPath({ type: "Point", coordinates: location }))
                    .attr("fill", "red");

                const latitudeCoords = (latitude, start, end) => {
                    const longitudes = d3.range(start, end, 2).concat(end);
                    return longitudes.map((d) => [d, latitude]);
                };

                const correctSpin = d3.geoRotation([-hourSpin, 0]);
                const correctTilt = d3.geoRotation([0, 0, 0]); //此处的三个参数其实不好确定，新方法中不需要该修正

                /* total angular extent of day/night */
                const dayExtent = (360 * dayLength(date, location[1])) / 24;
                const nightExtent = 360 - dayExtent;

                // shadow计算新方法
                //任意点（纬度不是0、-90或90即可）
                // 以location为[30, -50]来计算dayLine，从而获得shadow
                const hypo_location = [location[0], -45];
                const hypo_dayExtent = (360 * dayLength(date, hypo_location[1])) / 24;

                let hypo_dayLine = latitudeCoords(
                    hypo_location[1],
                    hypo_location[0] - hypo_dayExtent / 2,
                    hypo_location[0] + hypo_dayExtent / 2
                ).map((d) => correctSpin(d));
                let lat = hypo_dayLine[0][1];
                let lon1 = hypo_dayLine[0][0];
                let lon2 = hypo_dayLine[hypo_dayLine.length - 1][0];
                let A = [lon1, lat];
                let B = [lon2, lat];
                let C = [lon1 - 180, 0 - lat];
                let D = [lon2 - 180, 0 - lat];

                const dayLine = {
                    type: "LineString",
                    coordinates: latitudeCoords(
                        location[1],
                        location[0] - dayExtent / 2,
                        location[0] + dayExtent / 2
                    ).map((d) => correctSpin(d))
                };

                const nightLine = {
                    type: "LineString",
                    coordinates: latitudeCoords(
                        location[1],
                        location[0] - dayExtent / 2 - nightExtent,
                        location[0] - dayExtent / 2
                    ).map((d) => correctSpin(d))
                };

                background
                    .append("path")
                    .attr("d", unClippedPath(dayLine))
                    .attr("fill", "none")
                    .attr("stroke", colors.day)
                    .attr("stroke-width", 3);

                background
                    .append("path")
                    .attr("d", unClippedPath(nightLine))
                    .attr("fill", "none")
                    .attr("stroke", colors.night)
                    .attr("stroke-width", 3);

                foreground
                    .append("path")
                    .attr("d", path(dayLine))
                    .attr("fill", "none")
                    .attr("stroke", colors.day)
                    .attr("stroke-width", 3);

                foreground
                    .append("path")
                    .attr("d", path(nightLine))
                    .attr("fill", "none")
                    .attr("stroke", colors.night)
                    .attr("stroke-width", 3);

                foreground
                    .append("path")
                    .attr("d", path({ type: "Point", coordinates: location }))
                    .attr("fill", "red");

                // const shadowPolygon = [
                //   [0, -90],
                //   [0, 0],
                //   [0, 90],
                //   [180, 0],
                //   [0, -90]
                // ].map((d) => correctTilt(d));

                const shadowPolygon = [A, B, C, D, A].map((d) => correctTilt(d));

                foreground
                    .append("path")
                    .attr("d", path({ type: "Polygon", coordinates: [shadowPolygon] }))
                    .attr("fill", "rgba(0, 0, 0, 0.25)");
            }

            const solarSystem = (root, width, location, date, hour) => {
                const earthRadius = 0.04 * width;
                const sunRadius = 0.06 * width;
                const solarSystemRadius = width / 2 - 20;
                const stretch = 0.3;

                const solarAngle = getSolarAngle(date);
                const solarAngleDeg = (solarAngle * 180) / Math.PI;
                const x = solarSystemRadius * Math.sin(solarAngle);
                const y = stretch * solarSystemRadius * Math.cos(solarAngle);
                const spin = 180 + -location[0] + solarAngleDeg + 360 * ((hour + 12) / 24);

                const earthGeo = { type: "Sphere" };
                const projection = d3
                    .geoOrthographic()
                    .fitWidth(earthRadius * 2, earthGeo)
                    .rotate([spin, 0, 23.5])
                    .translate([0, 0]);
                const staticProjection = d3
                    .geoOrthographic()
                    .fitWidth(earthRadius * 2, earthGeo)
                    .rotate([solarAngleDeg - 90, 0])
                    .translate([0, 0]);
                const path = d3.geoPath(projection).pointRadius(1.5);
                const staticPath = d3.geoPath(staticProjection);

                const solarSystem = root
                    .append("g")
                    .attr("transform", `translate(${width / 2})`);

                solarSystem.append("circle").attr("r", sunRadius).attr("fill", colors.sun);

                /* Draw orbit */
                solarSystem
                    .append("ellipse")
                    .attr("rx", solarSystemRadius)
                    .attr("ry", stretch * solarSystemRadius)
                    .attr("fill", "none")
                    .attr("stroke", "lightgray");

                /* Draw month ticks */
                const formatDateTick = d3.timeFormat("%b");
                d3.range(12).map((m) => {
                    const d = new Date(date.getFullYear(), m, 1);
                    const angle = getSolarAngle(d);

                    solarSystem
                        .append("line")
                        .attr("x1", (solarSystemRadius + 8) * Math.sin(angle))
                        .attr("y1", (solarSystemRadius + 8) * stretch * Math.cos(angle))
                        .attr("x2", (solarSystemRadius - 8) * Math.sin(angle))
                        .attr("y2", (solarSystemRadius - 8) * stretch * Math.cos(angle))
                        .attr("stroke", "lightgray");

                    const midMonthAngle = getSolarAngle(new Date(date.getFullYear(), m, 15));

                    solarSystem
                        .append("text")
                        .text(formatDateTick(d))
                        .attr("x", (solarSystemRadius + 16) * Math.sin(midMonthAngle))
                        .attr(
                            "y",
                            (solarSystemRadius + 16) * 1.15 * stretch * Math.cos(midMonthAngle)
                        )
                        .attr("text-anchor", "middle")
                        .attr("font-size", fontSize)
                        .attr("dominant-baseline", "middle")
                        .attr("font-size", 10)
                        .attr("font-family", "sans-serif")
                        .attr("fill", "gray");
                });

                const earth = solarSystem
                    .append("g")
                    .attr("transform", `translate(${x}, ${y})`);

                earth
                    .append("line")
                    .attr("y1", -1.5 * earthRadius)
                    .attr("y2", 1.5 * earthRadius)
                    .attr("stroke", "blue")
                    .attr("transform", `rotate(-23.5)`);

                earth.append("path").attr("d", path(earthGeo)).attr("fill", colors.ocean);

                earth.append("path").attr("d", path(this.land110)).attr("fill", colors.land);

                const shadowPolygon = [
                    [0, -90],
                    [0, 0],
                    [0, 90],
                    [180, 0],
                    [0, -90]
                ];

                earth
                    .append("path")
                    .attr("d", staticPath({ type: "Polygon", coordinates: [shadowPolygon] }))
                    .attr("fill", "rgba(0, 0, 0, 0.5)");

                earth
                    .append("path")
                    .attr("d", path({ type: "Point", coordinates: location }))
                    .attr("fill", "red");
            }

            // ---------------main------------------------
            const svg = d3.create("svg")
                .attr("class", "daylight-app")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [0, 0, width, height]);

            svg
                .style("user-select", "none")
                .style("-webkit-user-select", "none");

            const margin = { top: 0, left: 16, right: 16, bottom: 0, inner: 32 };
            const contentWidth = width - margin.left - margin.right - margin.inner;
            const columnWidth = contentWidth / 2;

            let selection = {
                date: t1,
                hour: new Date().getHours()
            };

            const renderSolarSystem = () => {
                svg.selectAll("#solar-system *").remove();
                svg
                    .selectAll("#solar-system")
                    .call(solarSystem, columnWidth, location, selection.date, selection.hour);
            };

            const renderGlobe = () => {
                svg.selectAll("#globe *").remove();
                svg
                    .selectAll("#globe")
                    .call(globe, { width: columnWidth / 2, location, ...selection });
            };

            const setSelection = (newSelection, forceRender = false) => {
                const prev = { ...selection };
                selection = newSelection;

                svg.node().value = selection;

                if (forceRender) {
                    // renderPlot();
                    renderSolarSystem();
                    renderGlobe();
                } else if (prev.hour !== selection.hour || prev.date !== selection.date) {
                    renderSolarSystem();
                    renderGlobe();
                }
            };

            const plot = svg
                .append("g")
                .attr("id", "plot")
                .attr("transform", `translate(${margin.left})`);

            svg
                .append("g")
                .attr("id", "solar-system")
                .attr(
                    "transform",
                    `translate(${margin.left + margin.inner + columnWidth}, ${
                    // margin.top + height / 4
                    height / 2
                    })`
                );

            svg
                .append("g")
                .attr("id", "globe")
                .attr(
                    "transform",
                    `translate(${margin.left + margin.inner + 1.25 * columnWidth}, ${margin.top + height / 4
                    // height / 2
                    })`
                );

            function AnimateDaylight(t1, t2) {
                let t = new Date(t1);
                // console.log("开始", new Date());
                // const intervalId = setInterval(() => {
                //     t.setDate(t.getDate() + 1);
                //     selection.date = t;
                //     setSelection(selection, true);
                //     if (t.getTime() === t2.getTime()) {
                //         // timer.stop();
                //         clearInterval(intervalId);
                //         console.log("结束", new Date());
                //     }
                // }, 60);

                selection.date = t;
                setSelection(selection, true);
            }

            AnimateDaylight(t1, t2);

            // const handleDateHourChange = ({ target, detail: { date, hour } }) => {
            //     if (date != null && hour != null)
            //         setSelection({ ...selection, date, hour });
            // };

            // svg
            //     .node()
            //     .addEventListener(this.EventType.DateHourChange, handleDateHourChange, false);

            return svg.node();
        },
        drawPoles(svg, projection) {//修改为使用d3.geoCircle生成器
            const path = d3.geoPath(projection);

            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip");

            tooltip
                .style("width", "50px")
                // .style("height", "20px")
                .style("background-color", "#fff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "5px")
                .style("padding", "10px");

            //-------地理极点---------

            const sp = d3.geoCircle().center([0, -90]).radius(1)();

            svg.append("path")
                .datum(sp)
                .attr("d", path)
                .style('fill', "#216bc6")
                .style('stroke', "none")
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("stroke", "#216bc6")
                        .style("stroke-width", "4px");
                    tooltip.html("南极点")
                        .style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    tooltip.style("top", (d.pageY - 10) + "px")
                        .style("left", (d.pageX + 10) + "px");
                })
                .on("mouseout", function () {
                    tooltip.style("visibility", "hidden");
                    d3.select(this)
                        .style("stroke", "none");
                });


            const np = d3.geoCircle().center([0, 90]).radius(1)();

            svg
                .append("path")
                .datum(np)
                // .attr("id", "S89")
                .attr("d", path)
                .style('fill', "#216bc6")
                // .style("opacity", 0.3)
                .style('stroke', "none")
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("stroke", "#216bc6")
                        .style("stroke-width", "4px");
                    tooltip.html("北极点")
                        .style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    tooltip.style("top", (d.pageY - 10) + "px")
                        .style("left", (d.pageX + 10) + "px");
                })
                .on("mouseout", function () {
                    tooltip.style("visibility", "hidden");
                    d3.select(this)
                        .style("stroke", "none");
                });
            //-------磁极点----------
            svg.append("g")
                .attr("class", "lines")
                .selectAll("path")
                .data([{
                    "type": "LineString",
                    "coordinates": [
                        [-103.689, 78.095],
                        [-109.64, 80.972],
                        [-132.834, 85.02],
                        [162.867, 86.494]
                    ]
                }, {
                    "type": "LineString",
                    "coordinates": [
                        [138.902, -64.910],
                        [138.303, -64.661],
                        [137.325, -64.432],
                        [135.866, -64.081]
                    ]
                }])
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", "none")
                .style("stroke", "#fed73c")
                .style("stroke-width", 2);

            //-------寒极点----------
            // [-78.3046, 106.78]

            const cp = d3.geoCircle().center([106.78, -78.3046]).radius(1)();

            svg
                .append("path")
                .datum(cp)
                // .attr("id", "S89")
                .attr("d", path)
                .style('fill', "#216bc6")
                // .style("opacity", 0.3)
                .style('stroke', "none")
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("stroke", "#216bc6")
                        .style("stroke-width", "4px");
                    tooltip.html("寒极点")
                        .style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    tooltip.style("top", (d.pageY - 10) + "px")
                        .style("left", (d.pageX + 10) + "px");
                })
                .on("mouseout", function () {
                    tooltip.style("visibility", "hidden");
                    d3.select(this)
                        .style("stroke", "none");
                });

            //-------最高点----------
            // [-80.417, 77.116]
            const hp = d3.geoCircle().center([77.116, -80.417]).radius(1)();

            svg
                .append("path")
                .datum(hp)
                // .attr("id", "S89")
                .attr("d", path)
                .style('fill', "#216bc6")
                // .style("opacity", 0.3)
                .style('stroke', "none")
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("stroke", "#216bc6")
                        .style("stroke-width", "4px");
                    tooltip.html("最高点")
                        .style("visibility", "visible");
                })
                .on("mousemove", function (d) {
                    tooltip.style("top", (d.pageY - 10) + "px")
                        .style("left", (d.pageX + 10) + "px");
                })
                .on("mouseout", function () {
                    tooltip.style("visibility", "hidden");
                    d3.select(this)
                        .style("stroke", "none");
                });
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

            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip");

            tooltip
                .style("width", "50px")
                // .style("height", "20px")
                .style("background-color", "#fff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "5px")
                .style("padding", "10px");

            for (let i = 0; i < 3; i++) {
                svg.append('path')
                    .datum(this.iceshelf_list[i])
                    .attr('d', path)
                    .attr("id", id_list[i])
                    .attr("fill", fillColor[i])
                    .attr("stroke-width", 0.8)
                    .attr("stroke", "white")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .style("stroke", "#fff")
                            .style("stroke-width", "2px");
                        tooltip.html(id_list[i])
                            .style("visibility", "visible");
                    })
                    .on("mousemove", function (d) {
                        tooltip.style("top", (d.pageY - 10) + "px")
                            .style("left", (d.pageX + 10) + "px");
                    })
                    .on("mouseout", function () {
                        tooltip.style("visibility", "hidden");
                        d3.select(this)
                            .style("stroke", "none");
                    });
                screenLocation = projection(textLocation[i]);
                svg.append("text")
                    .attr("id", "text-" + id_list[i])
                    // .attr("x", screenLocation[0]-(textContent[i].length / 2)*4)
                    // .attr("y", screenLocation[1])
                    // .text(textContent[i]);
                    .attr("transform", "translate(" + screenLocation[0] + "," + screenLocation[1] + ")")
                    .attr("text-anchor", "middle")
                    .text(textContent[i]);
            }
        }
    }

}
</script>

<style scoped>
#scrolly3 {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #fff;
    padding: 0;
    margin: 0;
}

#scrolly3>* {
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
    width: 100%;
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