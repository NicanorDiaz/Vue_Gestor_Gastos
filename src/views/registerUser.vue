<template>
  <div id="register">
    <v-card width="500" class="mx-auto mt-9">
      <h1>Register User</h1>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field
                label="Nombre"
                v-model="name"
                prepend-icon="mdi-alpha-n-box"
                required
              ></v-text-field>
              <v-text-field
                label="Apellido"
                v-model="apellido"
                prepend-icon="mdi-alpha-a-box"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
                prepend-icon="mdi-account-circle"
                required
              ></v-text-field>
              <v-text-field
                ref="password"
                v-model="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="pl-5">
          <v-btn @click="register"> Register </v-btn>
          <v-btn @click="nextPage" v-if="pass"> Siguiente </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  name: "Register_User",

  data() {
    return {
      email: "",
      password: "",
      name: "",
      apellido: "",
      showPassword: false,
      pass: false,
      uid:null,
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
    };
  },
  methods: {
    register: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            var uid = user.user.uid;
            return firebase.firestore().collection("empleados").doc(uid).set({
              nombre: this.name,
              apellido: this.apellido,
              jefe:"",
              manager:false
            });
          },
          alert("Su usuario ha sido creado"),
          this.pass = true,
          (err) => {
            alert(err);
          }
        );
    },
    nextPage: function () {
      this.$router.go({ path: this.$router.path });
    },
  },
};
</script>
