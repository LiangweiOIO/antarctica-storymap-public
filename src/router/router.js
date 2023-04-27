const routes = [
    {
        path: '/antarctica-storymap-public/home',
        name: 'home',
        component: () => import('@/components/home.vue'),
    }, {
        path: '/antarctica-storymap-public/',
        name: 'home',
        component: () => import('@/components/home.vue'),
    },
    {
        path: '/antarctica-storymap-public/about',
        name: 'about',
        component: () => import('@/components/maps/southPole.vue'),
    },
    {
        path: '/antarctica-storymap-public/chapter1',
        name: 'chapter1',
        component: () => import('@/components/pages/chapterOne.vue'),
    },
    {
        path: '/antarctica-storymap-public/chapter2',
        name: 'chapter2',
        component: () => import('@/components/pages/chapterTwo.vue'),
    },
    {
        path: '/antarctica-storymap-public/chapter3',
        name: 'chapter3',
        component: () => import('@/components/pages/chapterThree.vue'),
    },
    {
        path: '/antarctica-storymap-public/chapter4',
        name: 'chapter4',
        component: () => import('@/components/pages/chapterFour.vue'),
    },
    
];

export default routes
