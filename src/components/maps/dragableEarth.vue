
<template>
    <div id="dragableEarth"></div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson'
import axios from 'axios';
import versor from "https://cdn.skypack.dev/versor@0.2";

export default {
    data() {
        return {
            land50: {},
            land110: {},
            polarLine: {},

            windowWidth: -1,
            windowHeight: -1,
        }
    },
    //axios.get是一个异步函数，当调用axios.get时，JavaScript会立即继续执行下面的代码，而不会等待axios.get返回结果
    //使用async/await来等待axios.get完成
    async mounted() {
        let _this = this;
        try {
            let response = await axios.get('/data/land-50m.json');
            _this.land50 = response.data;
            response = await axios.get('/data/land-110m.json');
            _this.land110 = response.data;

            // source: Orsi, AH., Harris, U. (2019) Fronts of the Antarctic Circumpolar Current - GIS data, Ver. 1, Australian Antarctic Data Centre - https://data.aad.gov.au/metadata/records/antarctic_circumpolar_current_fronts, Accessed: 2021/11
            response = await axios.get('/data/polar-front.json');
            _this.polarLine = response.data;

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            let dom = document.getElementById('dragableEarth');
            dom.appendChild(this.drawmap(this.windowHeight, this.windowHeight));

        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        drawmap(width, height) {
            const canvas = document.createElement("canvas");
            canvas.width = width * 0.9;
            canvas.height = height * 0.9;

            // width = width - 80;
            // height = height - 80;

            let sphere = { type: "Sphere" };
            const context = canvas.getContext("2d");
            const projection = d3
                .geoOrthographic()
                .precision(0.5)
                .rotate([0, 90, 0])
                .fitExtent([[4, 4], [width * 0.9 - 4, height * 0.9 - 4]], { type: "Sphere" });
            const path = d3.geoPath(projection, context);

            // 定义文本内容和位置
            // var textContent = "Hello, World!";
            // var textLocation = [0, -90]; // 地理坐标

            function render(land, polarLine) {
                context.clearRect(0, 0, width, height);
                context.globalAlpha = 1;

                //背景颜色
                context.beginPath(), path(sphere),
                    context.fillStyle = "lightblue", context.fill();

                //经纬网
                context.beginPath(), path(d3.geoGraticule()()),
                    context.lineWidth = 0.1, context.strokeStyle = 'gray', context.stroke();

                //大陆
                context.beginPath(), path(topojson.feature(land, land.objects.land)),
                    context.fillStyle = "white", context.fill();

                //南极边缘
                context.beginPath(), path(polarLine),
                    context.lineWidth = 2, context.strokeStyle = 'white', context.setLineDash([7, 3]), context.stroke();

                //黑色边缘圈
                context.beginPath(), path(sphere),
                    context.lineWidth = 2, context.strokeStyle = "#000", context.setLineDash([]), context.stroke();

                // 使用投影函数将地理坐标转换为屏幕坐标
                // var screenLocation = projection(textLocation);

                // // 设置文本样式和位置，然后绘制文本
                // context.font = "12px Arial";
                // context.fillStyle = "black";
                // context.textAlign = "center";
                // context.textBaseline = "middle";
                // context.fillText(textContent, screenLocation[0], screenLocation[1]);
            }

            function drag(projection) {
                let v0, q0, r0, a0, l;

                function pointer(event, that) {
                    const t = d3.pointers(event, that);

                    if (t.length !== l) {
                        l = t.length;
                        if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
                        dragstarted.apply(that, [event, that]);
                    }

                    // For multitouch, average positions and compute rotation.
                    if (l > 1) {
                        const x = d3.mean(t, p => p[0]);
                        const y = d3.mean(t, p => p[1]);
                        const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
                        return [x, y, a];
                    }

                    return t[0];
                }

                function dragstarted(event) {
                    v0 = versor.cartesian(projection.invert(pointer(event, this)));
                    q0 = versor(r0 = projection.rotate());
                }

                function dragged(event) {
                    const p = pointer(event, this);
                    const v1 = versor.cartesian(projection.rotate(r0).invert(p));
                    const delta = versor.delta(v0, v1);
                    let q1 = versor.multiply(q0, delta);

                    // For multitouch, compose with a rotation around the axis.
                    if (p[2]) {
                        const d = (p[2] - a0) / 2;
                        const s = -Math.sin(d);
                        const c = Math.sign(Math.cos(d));
                        q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
                    }

                    projection.rotate(versor.rotation(q1));

                    // In vicinity of the antipode (unstable) of q0, restart.
                    if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
                }

                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged);
            }

            return d3.select(context.canvas)
                .call(drag(projection)
                    .on("drag.render", () => render(this.land110, this.polarLine))
                    .on("end.render", () => render(this.land50, this.polarLine)))
                .call(() => render(this.land50, this.polarLine))
                .node();;
        },
    }
}

</script>

<style scoped>
#dragableEarth {
    height: fit-content;
    width: fit-content;

    /* padding: 0px 40px 0px 40px; */
}
</style>