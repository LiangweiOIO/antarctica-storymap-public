<template>
    <div id="timeline-china"></div>
</template>

<script>
import axios from 'axios';
import * as d3 from 'd3';
import * as topojson from 'topojson';

export default {
    data() {
        return {
            timeline: [],
            land110: {},
            map_num: 0,
            mapinfo_list: [],
        }
    },
    async mounted() {
        const _this = this;
        try {
            let response = await axios.get('/data/adventureEvent.json');
            _this.timeline = response.data;

            response = await axios.get('/data/land-110m.json');
            _this.land110 = response.data;

            let dom = document.getElementById('timeline-china');
            dom.innerHTML = this.createTimeLine();

            // 等待 this.createTimeLine() 执行完成后再执行下面两个方法
            await new Promise(resolve => setTimeout(resolve, 0));
            this.addLine();
            this.createChartMap();
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        createTimeLine() {
            const TimeLineTitle = "南极探秘时间轴";
            let htmlElements = [`<h1 class="article-name">${TimeLineTitle}</h1><div class="timeline"><div class="entries">`];
            let lastYear = '';

            const data = this.timeline;
            let map_num = 0;

            data.forEach((t) => {
                if (isNaN(t.date)) {
                    className = 'big';
                } else {
                    var century = t.date[0] + '' + t.date[1];
                    var className = '';
                    if (lastYear !== century) {
                        lastYear = century;
                        className = ' big'
                    }
                }

                htmlElements.push(`
                    <div class="entry">
                        <div class="title ${className}">${t.date}</div>
                        <div class="body">${t.sentence}</div>
                    `);

                // 是否绘制一个地图
                if (t.mapinfo !== undefined) {
                    map_num = map_num + 1;
                    this.mapinfo_list.push(t.mapinfo)
                    htmlElements.push(`
                        <div id="chart-map-${map_num}" class="chart-map"></div>
                    `);
                }
                htmlElements.push(`</div>`);
            });

            this.map_num = map_num;
            htmlElements.push('</div></div>');
            return `${htmlElements.join('')}`;
        },
        addLine() {
            // 选中timeline类的div
            const timeline = d3.select('.timeline');

            // 获取div的高度
            const height = timeline.node().getBoundingClientRect().height;

            // 添加SVG元素并设置样式和位置
            timeline.append('svg')
                .attr('class', 'line')
                .attr("id", "mline")
                .attr('width', 4)
                .attr('height', height)
                .append('line')
                .attr('x1', 4)
                .attr('x2', 4)
                .attr('y1', 20)
                .attr('y2', height - 20)
                .attr('stroke', '#6c307d')
                .attr('stroke-width', 1)
            // .attr('transform', 'translate(2, 0)');

        },
        createChartMap() {
            const num = this.map_num;
            const mapinfo_list = this.mapinfo_list;

            for (let i = 0; i < num; i++) {
                let dom = document.getElementById('chart-map-' + (i + 1));
                const width = dom.offsetWidth;
                const height = dom.offsetHeight;
                dom.innerHTML = "";

                this.drawBaseMap('#chart-map-' + (i + 1), width, height, mapinfo_list[i]);
            }
        },
        drawBaseMap(id, width, height, info) {
            let svg = d3
                .select(id)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            const projection = d3
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width * 1.2)
                .translate([width * 0.5, height * 0.5])

            const path = d3.geoPath().projection(projection);

            svg.append('path')
                .datum(topojson.feature(this.land110, this.land110.objects.land))
                .attr('d', path)
                .style('fill', '#f3e1b9')

            svg
                .append("path")
                .datum(d3.geoGraticule10())
                .attr("d", path)
                .style('fill', "none")
                .style('stroke', "#fff")
                .style('stroke-width', 0.4)
                .style('stroke-opacity', .6)

            const point = d3.geoCircle().center(info.center).radius(info.r)();

            svg
                .append('path')
                .datum(point)
                .attr('d', path)
                .attr('fill', 'none')
                .attr('stroke', 'red')
                .attr('stroke-width', '1px');

        },

    }
}
</script>

<style>
.chart-map {
    position: relative;
    left: calc(50% - 50px);
    height: 100px;
    width: 100px;
    background-color: #fff;
}

.article-name {
    text-align: center;
    color: #6C307D;
    background-color: white;
    margin: 20 auto;
    display: block;
}

mark {
    /* background-color: rgba(187, 51, 255, 0.3); */
    background-color: #f2f2f2
}

.timeline {
    /* max-height: 100vh; */
    margin: 0;
    overflow: hidden;
    margin-bottom: 100px;
}

.timeline .entries {
    width: calc(100% - 80px);
    max-width: 800px;
    margin: auto;
    position: relative;
    left: -5px;
}

.timeline .entries .entry {
    width: calc(50% - 44px);
    float: left;
    padding: 20px;
    clear: both;
    text-align: right;
}

.timeline .entries .entry:not(:first-child) {
    margin-top: -60px;
}

.timeline .entries .entry .title {
    font-size: 18px;
    margin-bottom: 4px;
    position: relative;
    color: #222;
    font-weight: bold;
}

.timeline .entries .entry .title.big {
    font-size: 24px;
}

.timeline .entries .entry .title:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 4px solid #6C307D;
    background-color: white;
    border-radius: 100%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: -37px;
    z-index: 1000;
}

.timeline .entries .entry .title.big:before {
    width: 24px;
    height: 24px;
    -webkit-transform: translate(8px, -50%);
    transform: translate(8px, -50%);
}

.timeline .entries .entry .timeline {
    color: #aaa;
}

.timeline .entries .entry .timeline p {
    line-height: 1.8em;
}

.timeline .entries .entry:nth-child(2n) {
    text-align: left;
    float: right;
}

.timeline .entries .entry:nth-child(2n) .title:before {
    left: -27px;
}

.timeline .entries .entry:nth-child(2n) .title.big:before {
    -webkit-transform: translate(-7px, -50%);
    transform: translate(-7px, -50%);
}
</style>