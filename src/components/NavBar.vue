<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Gestor de Gastos
          </v-list-item-title>
          <v-list-item-subtitle> Proyecto cole </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav v-if="islog">
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense nav v-if="!islog">
        <v-list-item v-for="auth in auths" :key="auth.title" :to="auth.to">
          <v-list-item-icon>
            <v-icon>{{ auth.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ auth.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-if="islog">
        <v-list-item
          v-for="logoutNavs in logoutNav"
          :key="logoutNavs.title"
          @click="logout(logoutNavs.action)"
        >
          <v-list-item-icon>
            <v-icon>{{ logoutNavs.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ logoutNavs.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="$route.name !='Login' ">{{$route.name}}</v-toolbar-title>
      <v-toolbar-title v-else>Bienvenido</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "../components/firebaseInit";
export default {
  data: () => ({
    drawer: false,
    islog: false,
    currentUser: false,
    items: [
      { title: "Inbox", 
        icon: "mdi-inbox", 
        to: "/inbox" 
      },
      {
        title: "Insertar",
        icon: "mdi-text-box-plus",
        to: "/home",
      },
      {
        title: "Profile",
        icon: "mdi-account",
        to: "/profile",
      },
      
    ],
    auths: [
      {
        title: "Login",
        icon: "mdi-login",
        to: "/",
      },
      {
        title: "RegisterAdmin",
        icon: "mdi-head-minus-outline",
        to: "/registerAdmin",
      },
      {
        title: "RegisterUser",
        icon: "mdi-account-plus",
        to: "/registerUser",
      },
    ],
    logoutNav: [{ title: "LogOut", icon: "mdi-logout", action: "logout" }],
  }),
  created() {
    if (firebase.auth().currentUser) {
      this.islog = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function (action) {
      if (action === "logout") {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.go({ path: this.$router.path });
          });
      }
    },
  },
};
</script>