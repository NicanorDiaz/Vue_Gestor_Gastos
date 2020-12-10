<template>
  <div id="register">
    <v-card width="500" class="mx-auto mt-9">
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col>
              <form ref="form" :v-model="valid">
                <v-text-field
                  label="Nombre"
                  v-model="name"
                  prepend-icon="mdi-alpha-n-box"
                  :rules="nameR"
                ></v-text-field>
                <v-text-field
                  label="Apellido"
                  v-model="apellido"
                  prepend-icon="mdi-alpha-a-box"
                  :rules="lastnameR"
                ></v-text-field>
                <v-text-field
                  v-model.number="edad"
                  prepend-icon="mdi-alpha-e-box"
                  :rules="age"
                  type="number"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="mdi-account-circle"
                ></v-text-field>
                <v-text-field
                  ref="password"
                  v-model="password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="passwordR"
                ></v-text-field>
                <v-text-field
                  ref="password"
                  v-model="passwordManager"
                  label="Password Admin"
                  :type="showPasswordM ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  :append-icon="showPasswordM ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPasswordM = !showPasswordM"
                  :rules="passwordMR"
                ></v-text-field>
              </form>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="pl-5">
          <v-btn @click="register"> Register </v-btn>
          <v-btn @click="nextPage" v-if="pass"> Siguiente </v-btn>
          <v-snackbar v-model="snackBar" v-click-outside ="outSideSnack" color="red">{{text}}</v-snackbar>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import {db, fieldValue} from "../components/firebaseInit";

export default {
  name: "Register_Admin",

  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        (v) =>
          !!v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Ingrese un E-mail valido",
      ],
      name: "",
      nameR: [(val) => !!val || "Porfavor ingrese un Nombre"],

      apellido: "",
      lastnameR: [(val) => !!val || "Porfavor ingrese un Apellido"],

      pass: false,
      uid: null,
      edad: 0,
      age: [(val) => val > 17   ||  "Usted es Menor de Edad" ],

      password: "",
      passwordR: [(val) => !!val || "Porfavor alguna Contraseña"],
      showPassword: false,

      passwordManager: "",
      passwordMR: [
        (val) => val==='manager123' || "Contraseña manager incorrecta",
      ],
      showPasswordM: false,
      snackBar:false,
      text:"",
    };
  },
  methods: {
    async register() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            let uid = user.user.uid;
            firebase.firestore().collection("empleados").doc(uid).set({
              nombre: this.name,
              apellido: this.apellido,
              empleadoAC: [],
              manager: true,
              edad: this.edad,
              email: this.email,
              
            });
          })
          .then(
            alert("Su usuario ha sido creado"),
            (this.pass = true),
            (err) => {
              alert(err);
            }
          );
      }
    },
    outSideSnack(){
      this.snackBar=false
    },
    nextPage: function () {
      this.$router.go({ path: this.$router.path });
    },
  },
};
</script>
