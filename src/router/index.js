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
        children: [
            {
                path: 'products',
                component: () => import('../components/admin/AdminProducts.vue')
            },
            // {
            //     path: 'orders',
            //     component: () => import('src/components/admin/...')
            // },
            {
                path: 'reports',
                component: () => import('../views/SalesReportView.vue'),
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('/src/views/LoginView.vue'),
    },
    {
        path: '/order-success/:id',
        name: 'order-success',
        component: () => import('/src/views/OrderSuccessView.vue')
    },
]

const router = createRouter({ history: createWebHistory(), routes })

export default router