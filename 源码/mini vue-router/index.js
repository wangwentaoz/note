import {
  createRouter,
  createWebHashHistory,
} from './grouter/index'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Counter from '../components/Counter.vue'

const routes = [
{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/about',
  name: 'About',
  component: About
},
{
  path: '/counter',
  name: 'Counter',
  component: Counter
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
