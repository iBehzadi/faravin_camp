import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/:id", name: "showSuraContent", component: () => import('../views/showSuraContent.vue') },
]
0
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
          }
      }
})
export default router