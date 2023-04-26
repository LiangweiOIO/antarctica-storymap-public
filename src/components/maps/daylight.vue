<template>
    <div id="select-location"></div>
    <div id="day-light-map"></div>
</template>
  
<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
import axios from 'axios';

export default {
    data() {
        return {
            land110: {},
            location: [0, 0],
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

            daylight_map: null,
        }
    },
    async mounted() {
        let _this = this;
        try {
            let response = await axios.get('/data/land-110m.json');
            const world = response.data;
            _this.land110 = topojson.feature(world, world.objects.land);

            let dom = document.getElementById("select-location");
            dom.innerHTML = '';
            dom.appendChild(this.selectLocation(window.innerWidth / 2));

            dom = document.getElementById("day-light-map");
            dom.innerHTML = '';
            dom.appendChild(this.drawmap(window.innerWidth * 0.9, window.innerHeight));
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        selectLocation(width) {
            const colors = this.colors;

            const svg = d3.create("svg")
                .attr("width", width)
                .attr("height", width / 2)
                .attr("viewBox", [0, 0, width, width / 2]);

            const graticule = d3.geoGraticule10();

            const projection = d3.geoEqualEarth().fitWidth(width, graticule);
            const path = d3.geoPath(projection);

            svg.node().value = [-62.2, -59];

            const updateLocation = (px, py) => {
                const location = projection.invert([px, py]);
                svg.node().value = location;
                this.location = location;

                svg
                    .selectAll(".location")
                    .data([location])
                    .join("circle")
                    .attr("class", "location")
                    .attr("cx", (d) => projection(location)[0])
                    .attr("cy", (d) => projection(location)[1])
                    .attr("r", 5)
                    .attr("fill", "none")
                    .attr("stroke", "red");

                svg.node().dispatchEvent(new CustomEvent("input"));
            };

            // const handleMouse = ({ x, y }) => {
            //     updateLocation(x, y);
            // };

            svg
                .append("path")
                .attr("d", path({ type: "Sphere" }))
                .attr("fill", colors.ocean)
                .attr("stroke", "#9ecbda");

            svg
                .append("path")
                .attr("d", path(graticule))
                .attr("fill", "none")
                .attr("stroke", "#9ecbda");

            svg.append("path").attr("d", path(this.land110)).attr("fill", colors.land);

            // svg.call(d3.drag().on("drag", handleMouse));

            updateLocation(...projection([-62.2, -59]));

            return svg.node();
        },
        // 
        drawmap(width, height) {
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

            const daylightPlot = (
                root,
                { width, height, year, latitude, defaultDate, defaultHour }
            ) => {
                const margin = { top: 32, bottom: 32, left: 32, right: 0 };
                const chartWidth = width - margin.left - margin.right;
                const chartHeight = height - margin.top - margin.bottom;

                const xTickValues =
                    width > 380 ? [3, 6, 9, 12, 15, 18, 21] : width > 240 ? [6, 12, 18] : [12];

                const xScale = d3
                    .scaleLinear()
                    .domain([0, 24])
                    .range([margin.left, margin.left + chartWidth])
                    .clamp(true);

                const yScale = d3
                    .scaleTime()
                    .domain([new Date(year, 0, 1), new Date(year, 11, 31)])
                    .range([margin.top, margin.top + chartHeight])
                    .clamp(true);

                const yAxis = d3
                    .axisLeft(yScale)
                    .tickValues(d3.timeMonth.range(new Date(year, 1, 1), new Date(year, 12, 1)))
                    .tickSize(chartWidth)
                    .tickFormat(d3.timeFormat("%b"));

                const xAxis = d3
                    .axisBottom(xScale)
                    .tickValues(xTickValues)
                    .tickSize(chartHeight)
                    .tickFormat((d) => {
                        const ampm = d < 12 ? "AM" : "PM";
                        return `${d === 12 ? 12 : d % 12} ${ampm}`;
                    });

                let date = defaultDate || new Date();
                let hour = defaultHour != null ? defaultHour : date.getHours();

                const handleMouseMove = (e) => { };

                root
                    .append("rect")
                    .attr("x", margin.left)
                    .attr("y", margin.top)
                    .attr("width", chartWidth)
                    .attr("height", chartHeight)
                    .attr("rx", 0.05 * width)
                    .attr("fill", colors.night);

                root
                    .append("g")
                    .attr("transform", `translate(${margin.left + chartWidth}, 0)`)
                    .call(yAxis)
                    .call((g) => g.select(".domain").remove())
                    .call((g) => g.selectAll(".tick").attr("color", colors.grid))
                    .call((g) => g.selectAll(".tick line").attr("stroke-dasharray", "5 3"));

                root
                    .append("g")
                    .attr("transform", `translate(0, ${margin.top})`)
                    .call(xAxis)
                    .call((g) => g.select(".domain").remove())
                    .call((g) => g.selectAll(".tick").attr("color", colors.grid))
                    .call((g) => g.selectAll(".tick line").attr("stroke-dasharray", "5 3"));

                root
                    .append("text")
                    .text("Local Solar Time")
                    .attr("x", margin.left + chartWidth / 2)
                    .attr("y", margin.top + chartHeight + margin.bottom - 4)
                    .attr("text-anchor", "middle")
                    .attr("font-size", fontSize)

                    .attr("font-family", "sans-serif")
                    .attr("fill", colors.grid);

                const data = yearDates(year)
                    .map((d) => [d, dayLength(d, latitude)])
                    .filter(([_, d]) => d > 0);

                /* Render separate polygons for each continuous sequence of
                 * days with more than 0 hours of day light
                 */
                const polys = [];
                let currentPoly = [];

                for (let i = 0; i < data.length; i++) {
                    const currentDate = data[i][0];
                    const prevDate = (data[i - 1] || [])[0];

                    if (
                        i === 0 ||
                        currentDate.getTime() - prevDate.getTime() < 3600 * 24 * 1000 * 1.5
                    ) {
                        currentPoly.push(data[i]);
                    } else {
                        polys.push(currentPoly);
                        currentPoly = [data[i]];
                    }
                }

                polys.push(currentPoly);

                polys.forEach((p) => {
                    const points = [
                        ...p.map(([d, l]) => `${xScale(12 - l / 2)},${yScale(d)}`),
                        ...p.reverse().map(([d, l]) => `${xScale(12 + l / 2)},${yScale(d)}`)
                    ].join(" ");

                    root.append("polygon").attr("points", points).attr("fill", colors.day);
                });

                /* Legend */
                const legend = root
                    .append("g")
                    .attr("transform", `translate(${margin.left + chartWidth / 2 - 64})`);

                legend
                    .append("rect")
                    .attr("rx", 5)
                    .attr("width", 16)
                    .attr("height", 16)
                    .attr("fill", colors.day);

                legend
                    .append("text")
                    .attr("x", 24)
                    .attr("y", 12)
                    .attr("font-size", fontSize)
                    .attr("font-family", "sans-serif")
                    .text("Day");

                legend
                    .append("rect")
                    .attr("x", 72)
                    .attr("rx", 5)
                    .attr("width", 1.25 * fontSize)
                    .attr("height", 16)
                    .attr("fill", colors.night);

                legend
                    .append("text")
                    .attr("x", 96)
                    .attr("y", 12)
                    .attr("font-size", fontSize)
                    .attr("font-family", "sans-serif")
                    .text("Night");
                /* Time and date controls */

                const dateLine = root.append("g");

                const updateControlPositions = () => {
                    dateLine
                        .select("line")
                        .attr("x1", xScale(0))
                        .attr("y1", yScale(date))
                        .attr("x2", xScale(24))
                        .attr("y2", yScale(date));

                    dateLine
                        .select("rect")
                        .attr("x", xScale(0))
                        .attr("y", yScale(date) - 4);

                    root
                        .select("#time-control")
                        .attr("cx", xScale(hour))
                        .attr("cy", yScale(date));
                };

                const dispatchDateHourChange = () => {
                    const detail = { date, hour };
                    const changeEvent = new CustomEvent(this.EventType.DateHourChange, {
                        detail,
                        bubbles: true
                    });
                    root.node().dispatchEvent(changeEvent);
                };

                const handleDateLineDrag = ({ y }) => {
                    date = yScale.invert(y);
                    updateControlPositions();
                    dispatchDateHourChange();
                };

                const handleTimeCircleDrag = ({ x }) => {
                    hour = xScale.invert(x);
                    updateControlPositions();
                    dispatchDateHourChange();
                };

                dateLine.append("line").attr("stroke", "red");

                dateLine
                    .append("rect")
                    .attr("width", chartWidth)
                    .attr("height", 8)
                    .attr("fill", "rgba(0, 0, 0, 0)")
                    .style("cursor", "row-resize")
                    .call(d3.drag().on("drag", handleDateLineDrag));

                root
                    .append("circle")
                    .attr("id", "time-control")
                    .attr("r", 5)
                    .attr("fill", "red")
                    .attr("stroke-width", 15)
                    .attr("stroke", "transparent")
                    .style("cursor", "pointer")
                    .call(d3.drag().on("drag", handleTimeCircleDrag));

                updateControlPositions();
            }

            const dayOfYear = (date) => {
                const yearStart = new Date(date.getFullYear(), 0, 1);
                return Math.floor((date.getTime() - yearStart.getTime()) / 86400000) + 1
            }

            const worldCoordinateSelector = (root, width, defaultLocation, onChange) => {
                const projection = d3.geoEqualEarth().fitWidth(width, d3.geoGraticule10());
                const path = d3.geoPath(projection);

                let location = [...defaultLocation];

                const updateLocation = (px, py, invert = true) => {
                    if (invert) {
                        location = projection.invert([px, py]);
                    } else {
                        location = [px, py];
                    }

                    const e = new CustomEvent(this.EventType.LocationChange,
                        { detail: { location }, bubbles: true });
                    root.node().dispatchEvent(e);

                    root.selectAll(".location")
                        .data([location])
                        .join("circle")
                        .attr("class", "location")
                        .attr("cx", d => projection(location)[0])
                        .attr("cy", d => projection(location)[1])
                        .attr("r", 5)
                        .attr("fill", "none")
                        .attr("stroke", "red")
                }

                const handleMouse = (e) => {
                    if (e.buttons === 1) {
                        updateLocation(...d3.pointer(e, e.target));
                    }
                };

                root.append("path")
                    .attr("d", path({ type: "Sphere" }))
                    .attr("fill", colors.ocean)
                    .attr("stroke", "#9ecbda");

                root.append("path")
                    .attr("d", path(d3.geoGraticule10()))
                    .attr("fill", "none")
                    .attr("stroke", "#9ecbda");

                root.append("path")
                    .attr("d", path(this.land110))
                    .attr("fill", colors.land);

                updateLocation(...location, false);

                root.on("mousemove", handleMouse)
                    .on("mousedown", handleMouse);
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
                .attr("id", "daylight-app")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [0, 0, width, height]);

            svg.style("user-select", "none")
                .style("-webkit-user-select", "none");

            const margin = { top: 0, left: 16, right: 16, bottom: 0, inner: 32 };
            const contentWidth = width - margin.left - margin.right - margin.inner;
            const columnWidth = contentWidth / 2;

            const dom = document.getElementById("daylight-app");

            let selection = {
                date: dom != null ? this.value.date : new Date(),
                hour: dom != null ? this.value.hour : new Date().getHours()
            }

            const location = this.location;

            const renderPlot = () => {
                svg.selectAll("#plot *").remove();
                svg.select("#plot").call(daylightPlot, {
                    width: columnWidth,
                    height: height * 0.8 - margin.top - margin.bottom,
                    year: new Date().getFullYear(),
                    latitude: location[1],
                    defaultDate: selection.date,
                    defaultHour: selection.hour
                })
            }

            const renderSolarSystem = () => {
                svg.selectAll("#solar-system *").remove();
                svg.selectAll("#solar-system").call(solarSystem,
                    columnWidth,
                    location,
                    selection.date,
                    selection.hour);
            }

            const renderGlobe = () => {
                svg.selectAll("#globe *").remove();
                svg.selectAll("#globe").call(globe, { width: columnWidth / 2, location, ...selection });
            }

            const setSelection = (newSelection, forceRender = false) => {
                const prev = { ...selection };
                selection = newSelection;

                svg.node().value = selection;

                if (forceRender) {
                    renderPlot();
                    renderSolarSystem();
                    renderGlobe();
                } else if (prev.hour !== selection.hour || prev.date !== selection.date) {
                    renderSolarSystem();
                    renderGlobe();
                }
            }

            const plot = svg.append("g")
                .attr("id", "plot")
                .attr("transform", `translate(${margin.left}, ${height / 10})`);

            svg.append("g")
                .attr("id", "solar-system")
                .attr("transform", `translate(${margin.left + margin.inner + columnWidth}, ${margin.top + height / 4})`);

            svg.append("g")
                .attr("id", "globe")
                .attr("transform", `translate(${margin.left + margin.inner + 1.25 * columnWidth}, ${margin.top + height / 2})`);

            setSelection(selection, true);

            const handleDateHourChange = ({ target, detail: { date, hour } }) => {
                if (date != null && hour != null) setSelection({ ...selection, date, hour });
            }

            svg.node().addEventListener(this.EventType.DateHourChange, handleDateHourChange, false);

            return svg.node();
        },
    }
}

</script>
  
<style>
</style>