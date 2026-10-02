import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from '../composables/useAuth'

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
        meta: { requiresAuth: true, roles: ['KITCHEN'] }
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
            // }
        ],
        meta: { requiresAuth: true, roles: ['ADMIN'] }
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

router.beforeEach((to) => {
    const { isAuthenticated, user } = useAuth()

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return { name: 'login' }
    }

    if (to.meta.roles && to.meta.roles.length > 0) {
        const userRoles = user.value?.roles ?? []
        const hasRole = to.meta.roles.some(role => userRoles.includes(role))
        if (!hasRole) {
            return { name: 'home' }
        }
    }

    return true
})

export default router