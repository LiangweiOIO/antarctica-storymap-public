<template>
    <div class="image-gallery">
        <div class="article">
            <p>
                {{ text1 }}
            </p>
            <p>
                {{ text2 }}
            </p>
        </div>
        <div class="row" v-for="(row, index) in rows" :key="index">
            <div class="col" v-for="(image, idx) in row" :key="idx">
                <div class="image-wrapper" @mouseenter="handleMouseEnter(image)" @mouseleave="handleMouseLeave(image)">
                    <img :src="image.src" :alt="image.title" class="image">
                    <div class="overlay" :class="{ active: activeImage === image }">
                        <div class="title">{{ image.title }}</div>
                        <!-- <div class="description">{{ image.description }}</div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            text1: '与其他大洋相比，南极生物的种类相对较少，但也有丰富多样的生命形式。由于寒冷的气候和艰苦的生存条件，南极的生物有一大特点一一种类不多，但是数量庞大。由于陆地基本被冰雪覆盖，几乎所有南极生物的生活都与海有关，或生活在海里，或栖息在海岸。',
            text2: '独特的地理条件，使南极生物拥有特殊的生活规律。每到夏季，充分的光照让附近海域变得富饶，数十亿吨的磷虾吸引了大量的鲸和海鸟等动物参与饕餮盛宴。而到了寒冷的冬季，冰层增长，大多数的南极旅客离开了，只剩下一些种类的企鹅、海豹和少数几种鸟坚守这个冰雪世界。',
            activeImage: null,
            rows: [
                [
                    {
                        src: "/img/animal/penguin.jpg",
                        title: "企鹅",
                        description: "Description for Image 1"
                    },
                    {
                        src: "/img/animal/seal.jpg",
                        title: "海豹",
                        description: "海豹是海洋动物也是胎生哺乳动物。它们的身体呈流线型，四肢鳍状，身披滑溜溜的短毛，脑袋圆圆的，眼睛也是圆溜溜的，是天生可爱的萌物。"
                    },
                    {
                        src: "/img/animal/krill.jpg",
                        title: "南极磷虾",
                        description: "Description for Image 3"
                    }
                ],
                [
                    {
                        src: "/img/animal/skua.jpg",
                        title: "贼鸥",
                        description: "Description for Image 4"
                    },
                    {
                        src: "/img/animal/snow petrel.jpg",
                        title: "雪海燕",
                        description: "Description for Image 5"
                    },
                    {
                        src: "/img/animal/killer whale.jpg",
                        title: "虎鲸",
                        description: "被称为“海中狼群”的虎鲸，部分虎鲸会终年停留于南极海域，是大海里横行霸道的狠角色，连鲨鱼都能轻易秒杀。"
                    }
                ]
            ]
        }
    },
    methods: {
        handleMouseEnter(image) {
            this.activeImage = image;
        },
        handleMouseLeave(image) {
            this.activeImage = null;
        }
    }
}
</script>
  
<style scoped>
.image-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #fff;
    flex-direction: column;

    padding: 0 12rem;
    max-width: 1200px;
}
.article p {
    text-align: center;
    /* padding-left: 5rem; */
    text-indent: 2rem;
    text-align: justify;
    color: #000;
    font-size: 1rem;
    line-height: 1.8;
}
.article{
    /* padding: 2rem 0; */
    max-width: 560px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 5rem;
    margin-bottom: 2rem;
}

.col {
    width: calc(33.3% - 1rem);
    margin-right: 1rem;
    /* margin-bottom: 1rem; */
    position: relative;
}

.image-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
}

.image {
    display: block;
    width: 100%;
    height: auto;
    /* height: 100%;
    width: auto; */
    transition: all 0.3s ease;
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
}

.overlay.active {
    opacity: 1;
    transform: translateY(0);
}

.title {
    font-size: 1.5rem;
    font-weight: bold;
    /* margin */
}
</style>