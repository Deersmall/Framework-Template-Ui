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
    component: () => import(/* webpackChunkName: "about" */ '@/views/LogInView')
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/TableView')
  },
  {
    path: '/t1',
    name: 't1',
    component: () => import(/* webpackChunkName: "about" */ '@/components/table/t1')
  },
  {
    path: '/t2',
    name: 't2',
    component: () => import(/* webpackChunkName: "about" */ '@/components/table/t2')
  },
  {
    path: '/',
    name: 'Manage',
    // redirect: 'main/home',
    component: () =>
        import ("@/views/Manage.vue"),
    children: [
      // {
      //   path:'/home',
      //   name:'Home',
      //   component: ()=> import("@/views/Home"),
      // },
      {
        path:'/test',
        name:'test',
        component: ()=> import("@/views/TableView"),
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/system/setting/menuSetting')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/system/setting/roleSetting')
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
