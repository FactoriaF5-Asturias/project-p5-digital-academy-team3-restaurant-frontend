import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('/src/views/HomeView.vue'),
    },
    {
        path: '/kitchen',
        name: 'kitchen',
        component: () => import('/src/views/KitchenDashboardView.vue'),
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('/src/views/CartPageView.vue'),
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('/src/views/AdminView.vue'),
        // children: [
        //     {
        //         path: 'products',
        //         component: () => import('src/components/admin/...')
        //     },
        //     {
        //         path: 'orders',
        //         component: () => import('src/components/admin/...')
        //     }
        // ]
    }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router