<template>
    <div id="geotiff"></div>
    <div id="legend-geotiff"></div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson'
import axios from 'axios';
import GeoTIFF, { fromArrayBuffer } from 'geotiff';

export default {
    data() {
        return {
            image: {},
            meta: {},
            values: {},
            land50: {},

            color: {},
        }
    },
    async mounted() {
        let _this = this;
        try {
            let response = await fetch('/data/sfctmp.tiff');
            const arrayBuffer = await response.arrayBuffer();
            const tiff = await fromArrayBuffer(arrayBuffer);

            response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;
            const image = await tiff.getImage();
            _this.image = image;

            let n = image.getWidth();
            let m = image.getHeight();

            function rotate(n, values) {
                var l = n >> 1;
                values = new Uint8Array(values)
                for (var j = 0, k = 0; j < m; ++j, k += n) {
                    values.subarray(k, k + l).reverse();
                    values.subarray(k + l, k + n).reverse();
                    values.subarray(k, k + n).reverse();
                }
                return values;
            }

            _this.values = rotate(n, (await image.readRasters())[0])

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            let dom = document.getElementById('geotiff');
            dom.appendChild(this.drawTiffMap(this.windowWidth, this.windowHeight + 20));
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        drawTiffMap(width, height) {
            let n = this.image.getWidth();
            let m = this.image.getHeight();

            function invert(d) {
                const shared = {};

                let p = {
                    type: "Polygon",
                    coordinates: d3.merge(d.coordinates.map(polygon => {
                        return polygon.map(ring => {
                            return ring.map(point => {
                                return [point[0] / n * 360 - 180, 90 - point[1] / m * 180];
                            }).reverse();
                        });
                    }))
                };

                // Record the y-intersections with the antimeridian.
                p.coordinates.forEach(ring => {
                    ring.forEach(p => {
                        if (p[0] === -180) shared[p[1]] |= 1;
                        else if (p[0] === 180) shared[p[1]] |= 2;
                    });
                });

                // Offset any unshared antimeridian points to prevent their stitching.
                p.coordinates.forEach(ring => {
                    ring.forEach(p => {
                        if ((p[0] === -180 || p[0] === 180) && shared[p[1]] !== 3) {
                            p[0] = p[0] === -180 ? -179.9995 : 179.9995;
                        }
                    });
                });

                // If the MultiPolygon is empty, treat it as the Sphere.
                return p.coordinates.length
                    ? { type: "Polygon", coordinates: p.coordinates }
                    : { type: "Sphere" };
            }

            let color = d3.scaleSequential(d3.extent(this.values), d3.interpolateSpectral);
            // color.domain([255,-50]);
            color.domain([190, 256]);
            // this.color = color;

            let contours = d3.contours().size([n, m]).thresholds(40)

            const projection = d3
                .geoAzimuthalEquidistant()
                .rotate([0, 90, 0])
                .scale(width * 0.7)
                .translate([width * 0.5, height * 0.5]);
            let path = d3.geoPath(projection);

            //绘制地图
            const svg = d3
                .create("svg")
                .attr("viewBox", [-4, -4, width, height])
                .style("background", "white");

            // 创建裁剪路径
            const clipPath = svg.append("clipPath").attr("id", "clip");

            // 在裁剪路径下添加图形元素
            clipPath
                .append("path")
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr("d", path)
                .attr("id", "clip")
                .attr("stroke-width", 1)
                .attr("stroke", "white")
                .attr("fill", "none");

            svg
                .selectAll("path")
                .data(contours(this.values))
                .enter()
                .append("path")
                .attr("d", d => path(invert(d)))
                .attr("fill", d => color(d.value))
                .attr("clip-path", "url(#clip)");

            svg
                .append("path")
                .datum(topojson.feature(this.land50, this.land50.objects.land))
                .attr("d", path)
                .attr("stroke-width", 1)
                .attr("stroke", "#f2f2f2")
                .attr("fill", "none");

            return svg.node();
        }

    }
}




</script>

<style>
.map {
    background-color: aliceblue;
}

.legend-geotiff {
    background-color: red;
}
</style>