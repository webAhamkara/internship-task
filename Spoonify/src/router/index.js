import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/Home.vue'),
    },
    { path: '/dishes', component: () => import('@/components/DishQuest.vue') },
    { path: '/ingredients', component: () => import('@/components/Ingredients.vue') },
    { path: '/wine', component: () => import('@/components/Wine.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
export default router
