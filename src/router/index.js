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
      return { x: 0, y: 0 }
    }

    /* scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          const position = {};
          if(to.hash) {
            position.selector = to.hash;
            return false;
          }
        }
      } */
})
export default router