<template>
    <footer class="footer">
        <div class="footer-text">
            <p>中山大学本科生毕业设计</p>
            <p>极地科考的故事地图</p>
        </div>
        <!-- <div class="footer__logo-container">
            <img class="footer__logo" src="/path/to/logo.png" alt="Logo"> 
            <div class="logo">Story Map for Antarctica</div>
        </div>
        <div class="footer__navigation">
            <router-link class="footer__navigation-item" to="/">Home</router-link>
            <router-link class="footer__navigation-item" to="/about">About</router-link>
        </div> -->
    </footer>
</template>
  
<style scoped>
.footer {
    background-color: #2a2929;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 30px 50px;
}

.footer-text {
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.footer__logo-container {
    flex: 0 0 200px;
    display: flex;
    align-items: center;
}

.footer__logo {
    max-width: 100%;
    height: auto;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    margin-left: 40px;
    color: #fff;
}

.footer__navigation {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
}

.footer__navigation-item {
    margin: 0 15px;
    font-size: 14px;
    color: #fff;
    text-decoration: none;
}

@media (max-width: 768px) {
    .footer {
        padding: 30px;
    }

    .footer__navigation {
        margin-top: 20px;
        justify-content: center;
        order: -1;
    }

    .footer__navigation-item {
        margin: 0 10px;
        font-size: 12px;
    }
}
</style>
  