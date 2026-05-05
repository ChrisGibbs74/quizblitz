import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/play', name: 'play', component: PlayView },
  { path: '/leaderboard', name: 'leaderboard', component: LeaderboardView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.name === 'play') {
    return import('../stores/gameStore.js').then(({ useGameStore }) => {
      const store = useGameStore()
      if (store.gameState !== 'playing') {
        return { name: 'home' }
      }
    })
  }
})

export default router
