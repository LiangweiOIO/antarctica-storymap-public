<template>
  <div class="header-container" :class="{ 'is-scrolled': isScrolled }">
    <div class="header">
      <router-link to="/" class="header-logo">
        极地科考的故事地图
      </router-link>
      <nav class="header-nav">
        <!-- <router-link to="/about" class="header-nav-item">
          About
        </router-link> -->
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  z-index: 100;
  transition: all 0.3s ease-in-out;
  height: 80px;
  border-bottom: 1px solid white;
  display: flex;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  /* padding: 20px 0; */
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.header-logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.header-nav {
  display: flex;
  align-items: center;
}

.header-nav-item {
  font-size: 16px;
  color: white;
  font-weight: bold;
  margin: 0 20px;
  text-decoration: none;
}

.header-nav-item:hover {
  text-decoration: green wavy underline;
}

.is-scrolled {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 70px;
  border-bottom: 0.5px solid #f7f7f7;
}

.is-scrolled .header-logo,
.is-scrolled .header-nav-item
{
  color: black;
}
</style>
