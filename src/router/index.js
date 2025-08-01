import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LogInView.vue')
  },
  {
    path: '/main',
    name: 'Manage',
    // redirect: 'main/home',
    component: () =>
        import ("../views/Manage.vue"),
    children: [
      {
        path:'home',
        name:'Home',
        component: ()=> import("@/views/Home"),
      },
      {
        path:'test',
        name:'test',
        component: ()=> import("@/views/HomeView"),
      },
    ]
  },
  {

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
