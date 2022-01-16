import { createApp, h } from 'vue'
import App from './App.vue'
//import './index.css'
//import {router} from './router'

import { createRouter, createWebHistory } from "vue-router";
import Home from './components/Home.vue';
import Sphere from './components/Sphere.vue';
import Twist from './components/Twist.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      beforeEnter: (to, from, next) => {
        //console.log('route(home):beforeEnter');
        //testf();
        next();
      }
    },
    {
      path: '/sphere',
      nema: 'sphere',
      component: Sphere,
      beforeEnter: (to, from, next) => {
        //console.log('route(home):beforeEnter');
        next();
      }
    },
    {
      path: '/twist',
      nema: 'twist',
      component: Twist,
      beforeEnter: (to, from, next) => {
        //console.log('route(home):beforeEnter');
        next();
      }
    },
  ],
});

/*router.beforeEach(() => {
  // ...
  // explicitly return false to cancel the navigation
  console.log(router.path);
  return false
});*/

/*router.afterEach((to, from) => {
  //sendToAnalytics(to.fullPath)
  console.log(to.fullPath + "," + from.fullPath);
})*/

var app = createApp({ render: () => h(App)})
app.use(router)
app.mount('#app')



