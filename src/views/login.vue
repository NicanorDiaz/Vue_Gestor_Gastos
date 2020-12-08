<template>
  <v-card flat>
    <h1 class="text-center pt-3 red--text">Login </h1>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field
              label="Email"
              v-model="email"
              prepend-icon="mdi-account-circle"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              ref="password"
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword =!showPassword"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="pl-5">
        <v-btn @click="login" class="log"> Login </v-btn>
        <v-snackbar v-model="snackBar" v-click-outside ="outSideSnack" color="red">{{text}}</v-snackbar>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Nav from "@/components/NavBar.vue";

export default {
  name: "Login",
  components: { Nav },
  data() {
    return {
      email: "",
      password: "",
      showPassword:false,
      snackBar:false,
      text: null,
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
    };
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.go({path: this.$router.path})
          },
          (err) => {
            this.text =err;
            this.snackBar = true;
          }
        )
    },
    outSideSnack(){
      this.snackBar=false
    }
  },
};
</script>
