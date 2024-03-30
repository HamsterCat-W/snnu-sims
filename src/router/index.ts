import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../components/Home.vue')
const StuList = () => import('../components/StudentList.vue')

const routes: any[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'students',
        name: 'stulist',
        component: StuList
      }
    ]
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
