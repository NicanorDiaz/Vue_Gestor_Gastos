import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import RegisterUser from '../views/registerUser.vue'
import RegisterAdmin from '../views/registerAdmin.vue'

import firebase from "firebase/app";
import 'firebase/auth';

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/registerUser',
    name: 'RegisterUser',
    component: RegisterUser,
    meta:{
      requiresGuest:true
    }
  },
  {
    path: '/registerAdmin',
    name: 'RegisterAdmin',
    component: RegisterAdmin,
    meta:{
      requiresGuest:true
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta:{
      requiresGuest:true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth:true
    }
  },
  
  {
    path: '/profile',
    name: 'Profile',
    meta:{
      requiresAuth:true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if( !firebase.auth().currentUser){
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        },
      });
    }else{
      next(); 
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    if( firebase.auth().currentUser){
      next({
        path: '/home',
        query: {
          redirect: to.fullPath
        },
      });
    }else{
      next(); 
    }
  }else{
    next();
  }
})