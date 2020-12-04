<template>
  <div id="register">
    <v-card width="500" class="mx-auto mt-9">
      <h1>Register User</h1>
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
                  label="Edad"
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
              </form>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="pl-5">
          <v-btn @click="register" :disabled="!valid"> Register </v-btn>
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
      valid: true,
      email: "",
      emailRules: [
        (v) =>
          !!v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Ingrese un E-mail valido",
      ],
      password: "",
      passwordR: [(val) => !!val || "Porfavor alguna Contraseña"],
      showPassword: false,

      name: "",
      nameR: [(val) => !!val || "Porfavor ingrese un Nombre"],

      apellido: "",
      lastnameR: [(val) => !!val || "Porfavor ingrese un Apellido"],

      pass: false,
      uid: null,
      edad: 0,
      age: [(val) => val > 17 || "Usted no es mayor de edad"],
    };
  },
  methods: {
    async register() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            (user) => {
              let uid = user.user.uid;
              firebase.firestore().collection("empleados").doc(uid).set({
                nombre: this.name,
                apellido: this.apellido,
                jefe: "",
                manager: false,
                edad: this.edad,
              }),
                firebase
                  .firestore()
                  .collection("empleados")
                  .doc(uid)
                  .collection("gastos")
                  .doc()
                  .set({
                    titulo:"",
                    nafta:""
                  });
            },

            alert("Su usuario ha sido creado"),
            (this.pass = true),
            (err) => {
              alert(err);
            }
          );
      }
    },
    nextPage: function () {
      this.$router.go({ path: this.$router.path });
    },
  },
};
</script>
