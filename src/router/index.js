import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pptcontent/:id',
    name: 'pptcontent',
    component: () => import('../views/pptcontent/pptcontent.vue'),
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/me/me.vue'),
    children: [
      {
        'path': 'down',
        'name': 'download',
        component: () => import('../views/me/download/down.vue')
      },
      {
        'path': 'profile',
        'name': 'profile',
        component: () => import('../views/me/profile/profile.vue')
      },
      {
        'path': 'fvrt',
        'name': 'favourite',
        component: () => import('../views/me/favourite/fvrt.vue')
      },
      {
        'path': 'myUpload',
        'name': 'myUpload',
        component: () => import('../views/me/myUpload/myUpload.vue')
      }
    ]
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/upload/upload.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/search.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/TestView.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('../views/test/TestView2.vue')
  },
  {
    path: '/test3',
    name: 'test3',
    component: () => import('../views/test/TestView3.vue'),
    children: [
      {
        path: 'test4',
        component: () => import('../views/test/TestView4.vue')
      },
      {
        path: 'test5',
        component: () => import('../views/test/TestView5.vue')
      }
    ]
  },
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
