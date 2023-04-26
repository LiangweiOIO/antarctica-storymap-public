<template>
    <div style="margin: 0px;padding:0px;">
        <section id="scrolly">
            <figure id="figure1">
                <h1 id="title">Antarctica</h1>
            </figure>

            <article>
                <div class="step" data-step="0">
                </div>
                <div class="step" data-step="1">
                    <div>
                        {{ text1 }}
                    </div>
                    <div>
                        {{ text2 }}
                    </div>
                </div>
                <div class="step" data-step="2">
                </div>
            </article>
        </section>
    </div>
</template>

<script>
import scrollama from 'scrollama';
import * as d3 from 'd3';
// import axios from 'axios';

export default {
    data() {
        return {
            text1: '地球上有两极。一个是北极（The Arctic），其名字来自于希腊文Arktikos，意为"of the North"。另一个是南极（The Antarctic），意为"opposite of North"，即与北极相反。',
            text2: '南极是地球上最寒冷、最荒凉的地方之一，被覆盖着厚厚的冰层，几乎没有植被和动物生存。当人们谈起南极时，他们往往想到无尽的冰凉和荒凉。然而，南极是地球上最不可思议的地方之一，其自然信息之丰富可能超出了你的想象。',
        }
    },
    async mounted() {
        // const _this = this;
        try {
            // let response = await axios.get('/data/USNIC_ANTARC_shelf_2022_merge-sim-nonproj.json');
            // _this.iceshelf = response.data;

            this.initScrollama(this);

        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        initScrollama(_this) {
            // using d3 for convenience
            var main = d3.select("div");
            var scrolly = main.select("#scrolly");
            var figure = scrolly.select("#figure1");
            var article = scrolly.select("article");
            var step = article.selectAll(".step");

            // initialize the scrollama
            var scroller = scrollama();

            // generic window resize listener event
            function handleResize() {
                // 1. update height of step elements
                var stepH = Math.floor(window.innerWidth * 0.45);
                step.style("height", stepH + "px");

                // var figureHeight = window.innerHeight / 2;
                // var figureMarginTop = (window.innerHeight - figureHeight) / 2;

                var figureHeight = window.innerHeight;
                // var figureHeight = window.innerWidth;
                var figureMarginTop = (window.innerHeight - figureHeight) / 2;

                figure
                    .style("height", window.innerHeight + "px")
                    .style("top", figureMarginTop + "px");

                // 3. tell scrollama to update new element dimensions
                scroller.resize();
            }

            // scrollama event handlers
            function handleStepEnter(response) {

                // add color to current step only
                step.classed("is-active", function (d, i) {
                    if (response.index != 0) {
                        d3.select("#title")
                            .transition()
                            .duration(500)
                            .style("display", "none");
                    } else {
                        d3.select("#title")
                            .transition()
                            .duration(500)
                            .style("display", null);
                    }
                    return i === response.index;
                });
            }

            function init() {

                // 1. force a resize on load to ensure proper dimensions are sent to scrollama
                handleResize();

                // 2. setup the scroller passing options
                // 		this will also initialize trigger observations
                // 3. bind scrollama event handlers (this can be chained like below)
                scroller
                    .setup({
                        step: "#scrolly article .step",
                        offset: 0.5,
                        debug: false
                    })
                    .onStepEnter(handleStepEnter);
            }

            // kick things off
            init();
            // kick things off
        }
    }
}
</script>

<style scoped>
#scrolly {
    position: relative;
    background-color: #f3f3f3;
    /* min-width: 1000px; */
}

article {
    position: relative;
    padding: 0;
    max-width: 50%;
    margin: 0 auto;
}

figure {
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    width: 100%;
    margin: 0;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    background-color: transparent;
    background-image: url('/img/antarctica-NASA.jpg');
    background-size: cover;
    z-index: 0;
}

figure h1 {
    text-align: center;
    position: absolute;
    top: 10%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 5rem;
    font-weight: 900;
    color: #fff;
}

.step {
    margin: 10rem auto 10rem auto;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    /* height: fit-content; */
    transition: background-color 0.3s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.step:last-child {
    margin-bottom: 0;
}

.step.is-active {
    background-color: rgba(0, 0, 0, 0.7);
}

.step[data-step="0"],
.step[data-step="2"] {
    opacity: 0;
}

.step p {
    text-align: center;
    padding: 2rem;
    font-size: 1.5rem;
    background-color: #3b3b3b;
}

.step div {
    text-align: center;
    padding: 1rem 4rem;
    font-size: 1rem;
    text-indent: 2em;
    text-align: justify;
    line-height: 1.8;
}

.title {
    font-size: 100px;
}
</style>