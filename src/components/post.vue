<template>
  <div style="height:260px;"></div>
  <div class="container">
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" @click="goToPost(post.id)" class="post-item">
        <div class="post-thumbnail">
          <img :src="post.thumbnail" alt="post thumbnail">
        </div>
        <div class="post-content">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-description">{{ post.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          thumbnail: './img/cover/one.jpg',
          title: '案例一：南极自然概况图',
          description: '将地图设置为故事焦点，介绍了南极自然概况。'
        },
        {
          id: 2,
          thumbnail: './img/cover/two.jpg',
          title: '案例二：南极极昼/夜可视化',
          description: '通过动画展示南极极昼极夜现象。'
        },
        {
          id: 3,
          thumbnail: './img/cover/three.jpg',
          title: '案例三：南极探险时间轴',
          description: '将地图嵌入信息表，展现南极探险关键事件。'
        },
        {
          id: 4,
          thumbnail: './img/cover/four.png',
          title: '案例四：南极科考站地图',
          description: '通过地图与图表联动，展现南极科考站分布与创建时间。'
        }
      ],
    }
  },
  mounted() {

  },
  methods: {
    goToPost(id) {
      this.$router.push('./chapter' + id)
    },
  },

}
</script>
  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 140vh;
  min-width: 1200px;
}

.post-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1000px;
  margin: 20 auto;
}

.post-item {
  /* width: calc(33.33% - 30px); */
  width: calc(50% - 30px);
  margin: 0 15px 30px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  cursor: pointer;
  overflow: hidden;
}

.post-item:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.post-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  padding: 20px;
}

.post-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

.post-description {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1.5;
}
</style>
