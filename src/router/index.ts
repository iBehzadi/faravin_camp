import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/:id", name: "showSuraContent", component: () => import('../views/showSuraContent.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
      return {top: 0}
    }
})
export default router