const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/components/home.vue'),
    }, {
        path: '/',
        name: 'home',
        component: () => import('@/components/home.vue'),
    },
    ,
    {
        path: '/about',
        name: 'about',
        component: () => import('@/components/maps/southPole.vue'),
    },
    {
        path: '/chapter1',
        name: 'chapter1',
        component: () => import('@/components/pages/chapterOne.vue'),
    },
    {
        path: '/chapter2',
        name: 'chapter2',
        component: () => import('@/components/pages/chapterTwo.vue'),
    },
    {
        path: '/chapter3',
        name: 'chapter3',
        component: () => import('@/components/pages/chapterThree.vue'),
    },
    {
        path: '/chapter4',
        name: 'chapter4',
        component: () => import('@/components/pages/chapterFour.vue'),
    },
    
];

export default routes
