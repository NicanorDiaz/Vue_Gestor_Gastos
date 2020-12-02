import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import VueTextareaAutosize from 'vue-textarea-autosize'

import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBcIhcvsUfUGavWlGV-jFMhMVWH6onyOFQ",
  authDomain: "gestor-gastos-ntec-7c6f2.firebaseapp.com",
  databaseURL: "https://gestor-gastos-ntec-7c6f2.firebaseio.com",
  projectId: "gestor-gastos-ntec-7c6f2",
  storageBucket: "gestor-gastos-ntec-7c6f2.appspot.com",
  messagingSenderId: "862324325968",
  appId: "1:862324325968:web:9461b0f24dcdf23d3c5b55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
    
  }
});


