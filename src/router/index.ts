import { createRouter, createWebHistory } from 'vue-router'

const About = () => import('../components/About.vue')
const Home = () => import('../components/Home.vue')

const routes: any[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
