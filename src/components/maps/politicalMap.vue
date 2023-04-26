<template>
    <div id="political-map"></div>
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
            politic: [],

            windowWidth: -1,
            windowHeight: -1,
        }
    },
    async mounted() {
        let _this = this;
        try {
            let response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;
            response = await axios.get('/data/political.json');
            _this.politic = response.data;

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            let dom = document.getElementById('political-map');
            dom.appendChild(_this.drawmap(this.windowWidth, this.windowHeight + 20));

        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        drawmap(width, height) {

            console.log(width, height)
            // Create the projection
            const projection = d3
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width * 0.6)
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

            this.drawPoliticalMap(svg, width, height)
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
                .attr("fill", 'blue')
                .style("opacity", 0.7)
        },
        drawPoliticalMap(svg, width, height) {
            let arcs = this.politic;
            // for (let i = 0; i < arcs.length; i++) {

            //     let arcGenerator = d3.arc()
            //         .innerRadius(0) //内半径为0，表示绘制一个圆弧而不是一个圆
            //         .outerRadius(200) //外半径为指定的半径
            //         .startAngle(degreesToRadians(arcs[i].startAngle)) //起始角度
            //         .endAngle(degreesToRadians(arcs[i].endAngle)); //结束角度

            //     svg
            //         .append("path")
            //         .attr("d", arcGenerator)
            //         .attr("transform", `translate(${width / 2}, ${height / 2})`)
            //         // .attr("fill", arcs[i].color)
            //         .attr("fill", "none")
            //         .style('stroke', arcs[i].color)
            //         .style('stroke-width', 2)
            //         .style("opacity", 0.7);
            // }

            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip");

            // 3. 设置元素的位置和大小
            tooltip.style("width", "240px")
                .style("height", "200px")
                .style("background-color", "#fff")
                .style("border", "1px solid #ccc")
                .style("padding", "10px");

            let arcGenerator = d3.arc()
                .innerRadius(0) //内半径为0，表示绘制一个圆弧而不是一个圆
            // .outerRadius(200); //外半径为指定的半径

            svg.selectAll(".arc")
                .data(arcs)
                .enter()
                .append("path")
                .attr("class", "arc")
                .attr("d", function (d) {
                    return arcGenerator({
                        outerRadius: d.radius,
                        startAngle: degreesToRadians(d.startAngle),
                        endAngle: degreesToRadians(d.endAngle)
                    });
                })
                .attr("transform", `translate(${width / 2}, ${height / 2})`)
                .attr("fill", "none")
                .style("stroke", function (d) {
                    return d.color;
                })
                .style("stroke-width", 2)
                .style("opacity", 0.7)

                .on("mouseover", function (d) {
                    var data = d.target.__data__;
                    tooltip.html("<strong>Claimant: </strong>" + data.Claimant + "<br/>")
                        .style("visibility", "visible");
                    d3.select(this)
                        .attr("fill", "red")
                        .attr("r", 6)
                        .attr("r", function (d) { return d.radius; })
                        .transition()
                        .duration(500)
                })
                .on("mousemove", function (d) {
                    tooltip.style("top", (d.pageY - 10) + "px")
                        .style("left", (d.pageX + 10) + "px");
                })
                .on("mouseout", function () {
                    tooltip.style("visibility", "hidden");
                    d3.select(this)
                        .attr("fill", function (d) { return d.color; })
                    // .attr("r", function (d) { return circleStretch(d.max_Pop); })
                });

            function degreesToRadians(degrees) {
                return degrees * Math.PI / 180;
            }
        },
    }
}

</script>
  
<style>
#political-map {
    min-width: 1200px;
}
</style>