<template>
    <div class='map-frame'>
        <div id="station-map">
            <!-- <div id="mini-map"></div> -->
            <div id="time-chart"></div>
            <div id="tooltip3"></div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson'
import axios from 'axios';
import { geoScaleBar } from 'd3-geo-scale-bar';

export default {
    data() {
        return {
            stations: {},
            land50: {},
            ice: {},
        }
    },
    async mounted() {
        let _this = this;
        try {
            let response = await axios.get('./data/land-50m.json');
            _this.land50 = response.data;

            response = await axios.get('./data/stations.json');
            _this.stations = response.data;

            response = await axios.get('./data/iceedge23105.json');
            _this.ice = response.data;

            let mapPara_main = {
                width: window.innerWidth,
                height: window.innerHeight,
                center: [0, 90, 0],
                scaleFactor: 0.46,
                translateFactor: [0.5, 0.5],
                legend: true,
                scaleBar: 2000,
            };

            // let figuredom = document.querySelector("#mini-map");
            // let mapPara_mini = {
            //     width: figuredom.offsetWidth,
            //     height: figuredom.offsetHeight,
            //     center: [61, 64, 61],
            //     scaleFactor: 20,
            //     translateFactor: [0.5, 0.5],
            //     legend: false,
            //     scaleBar: 50,
            // };

            let dom = document.getElementById('station-map');
            dom.appendChild(this.drawmap(mapPara_main));

            // dom = document.getElementById('mini-map');
            // dom.appendChild(this.drawmap(mapPara_mini));

            dom = document.getElementById('time-chart');

            let figuredom = document.querySelector("#time-chart");
            dom.appendChild(this.createScatterPlot(figuredom.offsetWidth, figuredom.offsetHeight))

        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        createScatterPlot(width, height) {
            // 设置图表的边距
            const margin = { top: 20, right: 20, bottom: 60, left: 60 };

            // 计算内部画布的宽度和高度
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;
            let data = this.stations;

            var simulation = d3.forceSimulation(data)
                .force("collide", d3.forceCollide().radius(0.3))
                .force("x", d3.forceX().x(function (d) { return d.Year_est; }))
                .force("y", d3.forceY().y(innerHeight / 1.1))
                .stop();

            for (var i = 0; i < 200; ++i) {
                simulation.tick();
            }

            var color = d3.scaleOrdinal()
                .domain(["Permanent active stations", "Subantarctic station", "Summer-only active station"])
                .range(["#2E7AF9", "orange", "red"]);

            // ----------------------------------------------------

            // 创建一个 SVG 元素，并设置视窗和内边距
            const svg = d3
                .create("svg")
                .attr("viewBox", [0, 0, width, height])
                .style('user-select', 'none')
                .style('-webkit-user-select', 'none');

            const xScale = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d.x)) // 指定数据范围
                .range([0, innerWidth]); // 指定输出范围

            const yScale = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d.y)) // 指定数据范围
                .range([innerHeight, 0]); // 指定输出范围

            // 创建坐标轴
            const xAxis = d3.axisBottom(xScale).tickSizeOuter(0).tickSize(10);
            const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

            // 添加 x 轴
            svg
                .append("g")
                .attr("transform", `translate(${margin.left}, ${innerHeight / 2 + margin.top})`)
                .call(xAxis)
                // .call(d3.axisBottom(xScale).tickSizeOuter(10))
                .append("text")
                .attr("x", innerWidth / 2)
                .attr("y", 70)
                .attr("fill", "#000")
                .attr("text-anchor", "middle")
                .text("Year of Establishment");

            // 添加 y 轴
            // svg
            //     .append("g")
            //     .attr("transform", `translate(${margin.left}, ${margin.top})`)
            //     .call(yAxis)
            //     .append("text")
            //     .attr("transform", "rotate(-90)")
            //     .attr("x", -innerHeight / 2)
            //     .attr("y", -40)
            //     .attr("fill", "#000")
            //     .attr("text-anchor", "middle")
            //     .text("Y");

            function circleStretch(value) {
                const inputMin = -1; //输入数据最小值
                const inputMax = 160; //输入数据最大值
                const outputMin = 9; //输出数据最小值
                const outputMax = 255; //输出数据最大值

                //平方拉伸公式
                const stretched = (value - inputMin) / (inputMax - inputMin);

                //将值映射到输出范围
                return Math.sqrt((outputMax - outputMin) * stretched + outputMin);
            }

            var tooltip = d3.select("#tooltip3");

            // 绘制散点图
            svg
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("id", function (d) { return "scatter-" + d.id; })
                .attr("cx", d => xScale(d.x)) // 指定 X 轴坐标
                .attr("cy", d => yScale(d.y))
                .attr("r", d => circleStretch(d.max_Pop) / 4 + 2)
                .style("opacity", 0.7)
                .attr("fill", function (d) { return color(d.type); })
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .on("mouseover", function (d) {
                    d3.select(this)
                        .attr("r", d => circleStretch(d.max_Pop) / 4 + 4)
                        .attr("stroke-width", 2)
                        .attr("stroke", "#000")
                    var data = d.target.__data__;
                    d3.selectAll(".station-" + data.id)
                        .attr("r", function (d) { return circleStretch(d.max_Pop) + 3; })
                        .attr("stroke-width", 2)
                        .attr("stroke", "#000")
                    tooltip.html(
                        "<strong>Location: </strong>" + data.Location + "<br/>" +
                        "<strong>Latitude: </strong>" + data.lat + "<br/>" +
                        "<strong>Lontitude: </strong>" + data.lon + "<br/>" +
                        "<strong>Country: </strong>" + data.Country + "<br/>" +
                        "<strong>Year: </strong>" + data.Year_est + "<br/>" +
                        "<strong>Type: </strong>" + data.type + "<br/>" +
                        "<strong>Max Population: </strong>" + data.max_Pop + "<br/>")
                        .style("visibility", "visible");
                })
                .on("mouseout", function (d) {
                    tooltip.style("visibility", "hidden");
                    d3.select(this)
                        .attr("r", d => circleStretch(d.max_Pop) / 4 + 2)
                        .attr("stroke", "none")
                    var data = d.target.__data__;
                    d3.selectAll(".station-" + data.id)
                        .attr("r", function (d) { return circleStretch(d.max_Pop); })
                        .attr("stroke", "none")
                });

            return svg.node();
        },
        drawmap(mapPara) {
            //绘制地图
            let width = mapPara.width;
            let height = mapPara.height;

            const svg = d3
                .create("svg")
                .attr("viewBox", [0, 0, width, height])
                .style("background", "#fff")
                .style('user-select', 'none')
                .style('-webkit-user-select', 'none');
            const projection = d3
                .geoAzimuthalEquidistant()
                .rotate(mapPara.center)
                .scale(width * mapPara.scaleFactor)
                .translate([width * mapPara.translateFactor[0], height * mapPara.translateFactor[1]]);
            const path = d3.geoPath(projection);

            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .attr("fill", "none")
                .attr("stroke-width", 0.25)
                .attr("stroke", "#000")
                .style("opacity", 0.3);

            svg.append('path')
                .datum(this.ice)
                .attr('d', path)
                .attr("id", "ice-edge")
                .attr("fill", "lightblue")
                .style("opacity", 0.3)
                .attr("stroke-width", 5)
                .attr("stroke", "lightblue")
                .style("opacity", 0.3)

            svg
                .append("path")
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr("d", path)
                .attr("fill", "white")
                .attr("stroke-width", 1)
                .attr("stroke", "#000");

            this.addPoint(svg, projection);

            // 判断一下是否创建图例
            if (mapPara.legend) {
                this.addLegendsToMap(svg, width);
            }
            if (mapPara.scaleBar) {
                // 创建比例尺
                const scaleBar = geoScaleBar()
                    .projection(projection)
                    .size([width, height])
                    .left(.7)
                    .top(.9)
                    // .units(d3.geoScaleMiles) //默认是km
                    .distance(mapPara.scaleBar) // The distance of the scale bar
                    .label(mapPara.scaleBar + " km") // The label on top of the scale bar
                    .labelAnchor("middle") // The position of the label (you can also pass "start" and "end")
                    .tickSize(null) // The height of the bar
                    .tickValues(null);// The tick values below the bar will be removed

                svg.append("g")
                    .attr("class", "scalebar")
                    .call(scaleBar);
            }

            return svg.node();
        },
        addLegendsToMap(map, width) {
            let legendX = width - 25;
            let g = map
                .append("g")
                .attr(
                    // position the legend on the right side of the map
                    "transform",
                    `translate(${legendX}, 35)`
                )
                .attr("text-anchor", "end");

            let title = g
                .append("text")
                .text("Research Stations in antarctica, 2023")
                .attr("font-weight", "bold");

            //should probably use .data() for this but it didnt take long so who cares
            let circleX = 0;
            // symbols
            g.append("circle")
                .attr("r", 5)
                .attr("fill", "#2E7AF9")
                .attr("transform", `translate(${circleX}, 20)`)
                .attr("class", "legend-text");
            g.append("circle")
                .attr("r", 5)
                .attr("fill", "orange")
                .attr("transform", `translate(${circleX}, 40)`)
                .attr("class", "legend-text");
            g.append("circle")
                .attr("r", 5)
                .attr("fill", "#e9536c")
                .attr("transform", `translate(${circleX}, 60)`)
                .attr("class", "legend-text");
            g.append("circle")
                .attr("r", 5)
                .attr("fill", "lightblue")
                .style("opacity", 0.3)
                .attr("transform", `translate(${circleX}, 90)`)
                .attr("class", "legend-text");

            // labels
            g.append("text")
                .text("Permanent active stations")
                .attr("transform", `translate(${circleX - 10}, 25)`)
                .attr("class", "legend-text");
            g.append("text")
                .text("Subantarctic stations")
                .attr("transform", `translate(${circleX - 10}, 45)`)
                .attr("class", "legend-text");
            g.append("text")
                .text("Summer-only active stations")
                .attr("transform", `translate(${circleX - 10}, 65)`)
                .attr("class", "legend-text");
            g.append("text")
                .text("Sea ice")
                .attr("transform", `translate(${circleX - 10}, 95)`)
                .attr("class", "legend-text");

            // circle size legend
            //title
            g.append("text")
                .text("max population")
                .attr("transform", `translate(${circleX},135)`)
                .attr("font-weight", "bold")
                .attr("class", "legend-text");

            let totalExtent = d3.extent(this.stations.map(r => r.max_Pop));
            let radiusFunction = d3
                .scaleSqrt()
                .domain(totalExtent)
                .range([4, 30])

            // container
            let sizeLegend = g
                .append("g")
                .attr("fill", "black")
                .attr("transform", `translate(${circleX - 60},185)`)
                .attr("text-anchor", "right")
                .selectAll("g")
                .data([1, 160, 1000])
                .join("g");
            sizeLegend
                .append("circle")
                .attr("fill", "none")
                .attr("stroke", "black")

                .attr("cx", -20)
                .attr("cy", d => 30 - radiusFunction(d))
                .attr("r", radiusFunction);
            sizeLegend
                .append("text")
                .attr("y", d => 20 - 2 * radiusFunction(d))
                .attr("x", 55)
                .attr("dy", "1.4em")
                .text(d3.format(".0f"))
                .attr("class", "legend-text");
        },
        addPoint(svg, projection) {
            var color = d3.scaleOrdinal()
                .domain(["Permanent active stations", "Subantarctic station", "Summer-only active station"])
                .range(["#2E7AF9", "orange", "red"]);

            var tooltip = d3.select("#tooltip");
            let data = this.stations;

            function circleStretch(value) {
                const inputMin = -1; //输入数据最小值
                const inputMax = 160; //输入数据最大值
                const outputMin = 9; //输出数据最小值
                const outputMax = 255; //输出数据最大值

                //平方拉伸公式
                const stretched = (value - inputMin) / (inputMax - inputMin);

                //将值映射到输出范围
                return Math.sqrt((outputMax - outputMin) * stretched + outputMin);
            }

            var simulation = d3.forceSimulation(data)
                .force("collide", d3.forceCollide().radius(function (d) { return circleStretch(d.max_Pop) + 1; }))
                .force("x", d3.forceX().x(function (d) { return projection([d.lon, d.lat])[0]; }))
                .force("y", d3.forceY().y(function (d) { return projection([d.lon, d.lat])[1]; }))
                .stop();

            for (var i = 0; i < 500; ++i) {
                simulation.tick();
            }

            var circles = svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", function (d) { return "station-" + d.id; })
                // .attr("cx", function (d) { return projection([d.lon, d.lat])[0]; })
                // .attr("cy", function (d) { return projection([d.lon, d.lat])[1]; })
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; })
                // .attr("r", 4)
                .attr("r", function (d) { return circleStretch(d.max_Pop); })
                .attr("stroke-width", 1)
                .attr("stroke", "white")
                .attr("fill", function (d) { return color(d.type); })
                .style("opacity", 0.8);

            circles
                .on("mouseover", function (d) {
                    var data = d.target.__data__;
                    tooltip.html(
                        "<strong>Location: </strong>" + data.Location + "<br/>" +
                        "<strong>Latitude: </strong>" + data.lat + "<br/>" +
                        "<strong>Longitude: </strong>" + data.lon + "<br/>" +
                        "<strong>Country: </strong>" + data.Country + "<br/>" +
                        "<strong>Yesr: </strong>" + data.Year_est + "<br/>" +
                        "<strong>Type: </strong>" + data.type + "<br/>" +
                        "<strong>Max Population: </strong>" + data.max_Pop + "<br/>")
                        .style("visibility", "visible");
                    d3.select(this)
                        .attr("r", function (d) { return circleStretch(d.max_Pop) + 3; })
                        .attr("stroke-width", 2)
                        .attr("stroke", "#000")
                    // d3.selectAll(".station-" + data.id)
                    //     .attr("fill", function (d) { return color(d.type); })
                    //     .attr("r", function (d) { return circleStretch(d.max_Pop) + 3; })
                    //     .attr("stroke-width", 2)
                    //     .attr("stroke", "#000")
                    d3.selectAll("#scatter-" + data.id)
                        .attr("r", d => circleStretch(d.max_Pop) / 4 + 4)
                        .attr("stroke-width", 2)
                        .attr("stroke", "#000")
                })
                .on("mousemove", function (d) {
                    // console.log(d.pageY, d.pageX)
                    // tooltip.style("top", (d.pageY - 10) + "px")
                    //     .style("left", (d.pageX + 10) + "px");
                })
                .on("mouseout", function (d) {
                    tooltip.style("visibility", "hidden");
                    d3.select(this)
                        .attr("fill", function (d) { return color(d.type); })
                        .attr("r", function (d) { return circleStretch(d.max_Pop); })
                        .attr("stroke", "none")
                    var data = d.target.__data__;
                    d3.selectAll(".station-" + data.id)
                        .attr("fill", function (d) { return color(d.type); })
                        .attr("r", function (d) { return circleStretch(d.max_Pop); })
                        .attr("stroke", "none")
                    d3.selectAll("#scatter-" + data.id)
                        .attr("r", d => circleStretch(d.max_Pop) / 4 + 2)
                        .attr("stroke", "none")
                });
        }
    }
}

</script>

<style>
.map-frame {
    position: relative;
    width: 100%;
    height: 100vh;
}

/* #mini-map {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30%;
    height: 60vh;
    border: 2px solid #fff;
} */

#tooltip {
    position: absolute;
    bottom: 70%;
    left: 0%;
    max-width: 260px;
    height: 20vh;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.9);
}

#station-map {
    width: 100%;
    height: 100vh;
    /* background-color: #eee; */
    /* 调整颜色以适应您的设计 */
}

#time-chart {
    position: absolute;
    bottom: 0;
    left: 0%;
    width: 60%;
    height: 20vh;
    margin: 0px;
    padding: 0px;
}
</style>