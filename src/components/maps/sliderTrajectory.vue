<template>
  <div id="time-slider"></div>
  <div id="slider-trajectory"></div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
// import * as vega from 'vega';
// import * as vegaLite from 'vega-lite';

import axios from 'axios';

export default {
  data() {
    return {
      trajectory: {},
      land50: {},

      windowWidth: -1,
      windowHeight: -1,
    }
  },
  async mounted() {
    let _this = this;
    try {
      let response = await axios.get('/data/points38.json');
      _this.trajectory = response.data;
      response = await axios.get('/data/land-50m.json');
      _this.land50 = response.data;

      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;

      let dom = document.getElementById('time-slider');
      dom.appendChild(_this.setTimeSlider(this.windowWidth, 10));// height = 10 for slider
      dom = document.getElementById('slider-trajectory');
      dom.appendChild(_this.drawmap(this.windowWidth, this.windowHeight - 20));

    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    setTimeSlider(width, height) {
      const svg = d3
        .create("svg")
        .attr("viewBox", [0, 0, width, height + 20])
        .style('user-select', 'none')
        .style('-webkit-user-select', 'none');

      const x = d3
        .scaleTime()
        .domain([new Date(1984, 0, 1), new Date(2023, 6, 30)])
        .range([0, width - 1]);

      // const color = d3
      //   .scaleOrdinal()
      //   .domain(['TD', 'TS', 'HU']) //创建序数比例尺color，用于将不同飓风等级（TD、TS和HU）映射到颜色方案（PuBuGn）的不同颜色。
      //   .range(d3.schemePuBuGn[3]);

      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg
        .selectAll('rect')
        .data(this.trajectory)
        .enter()
        .append('rect')
        .attr('x', d => x(d.time))
        // .attr('fill', d => color(d.max.status))
        .attr('opacity', .5)
        .attr('width', .5)
        .attr('y', 2)
        .attr('height', height - 4);

      const brush = svg
        .append('rect')
        .attr('x', x(x.domain()[1]))
        .attr('width', 1)
        .attr('height', height);

      const node = svg.node();
      node.value = x.domain()[1];

      function onBrush([px]) {
        brush.attr('x', px);
        node.value = x.invert(px);
        svg.dispatch('input');
      }

      // svg.on('touchmove', () => onBrush(d3.touches(node)[0]));
      // svg.on('mousemove', () => onBrush(d3.mouse(node)));

      return node;
    },
    drawmap(width, height) {
      let sphere = { type: "Sphere" };

      // Create the projection
      const projection = d3.geoStereographic()
        .rotate([0, 0])
        .translate([width / 3, height / 2])
        .scale(width * 0.2)
        .center([120, -90])
        .clipAngle(166)
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

      let arr = this.trajectory;

      const groupedData = d3.group(arr, d => d.id);

      var colors = d3.scaleOrdinal(d3.schemeCategory10);
      const path = d3.geoPath(projection);

      groupedData.forEach(group => {
        let id = group[0].id;
        let line = { type: "LineString", coordinates: group.map(d => [d.lon, d.lat]) };
        // 创建平滑曲线生成器
        const smoothLine = d3.line()
          .x(d => path.projection()([d[0], d[1]])[0])
          .y(d => path.projection()([d[0], d[1]])[1])
          .curve(d3.curveCatmullRom.alpha(0.8));

        const pathData = smoothLine(line.coordinates);
        // const pathData = path(line);
        map.append("path")
          .attr("d", pathData)
          .attr("stroke", colors(id))
          .attr("stroke-width", 1)
          .attr("fill", "none")
      })

    },
  }
}

</script>

<style>
#time-slider {
  padding: 10px 20px 10px 20px;
}

#slider-trajectory {
  min-width: 1200px;
}
</style>