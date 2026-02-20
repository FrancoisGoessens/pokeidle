import { createRouter, createWebHistory } from 'vue-router'
import LoaderView from '../views/LoaderView.vue'
import GameView from '../views/GameView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoaderView },
    { path: '/game', component: GameView },
  ],
})

export default router
