import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TravelInsurance from '../views/TravelInsurance.vue'
import ThankYouPage from '../views/ThankYouPage.vue'
// import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/travel-insurance',
    name: 'TravelInsurance',
    component: TravelInsurance,
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYouPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
