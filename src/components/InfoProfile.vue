<template>
  <v-row>
    <v-col>
      <v-col align="center">
        <v-avatar class="avatar" size="80" color="indigo">
          <v-icon v-if="!isorNot" size="40">mdi-chess-knight</v-icon>
          <v-icon v-if="isorNot" size="40">mdi-chess-king</v-icon>
        </v-avatar>
        <h2 class="nombre-apellido red--text">
          {{ empleado.nombre + " " + empleado.apellido }}
        </h2>

        <h3 class="grey--text">{{ email }}</h3>
      </v-col>
      <br />
      <h2 v-if="isorNot">{{ empleado.empleados }}</h2>
      <h2 v-if="!isorNot">{{ empleado.jefe }}</h2>
      <v-row class="rowCargo pl-5">
        <v-icon color="green pl-10" size="30">mdi-tie</v-icon>
        <h2 class="cargo mr-5 pl-2">Cargo:</h2>
        <h2 v-if="isorNot" class="manager grey--text">Manager</h2>
        <h2 v-if="!isorNot" class="empleado grey--text">Empleado</h2>
      </v-row>
      <br />
      <v-row class="rowEdad pl-5">
        <v-icon color="green pl-10" size="30">mdi-human-greeting</v-icon>
        <h2 class="edad mr-5 pl-2">Edad:</h2>
        <h2 class="edads grey--text">{{ empleado.edad }}</h2>
      </v-row>
    </v-col>
  </v-row>
</template>


<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "ProfileInfo",

  data() {
    return { email: null, empleado: [], manager: false, isorNot: false };
  },
  methods: {},
  created() {
    var user = firebase.auth().currentUser;
    this.email = user.email;
    const db = firebase.firestore();

    var uid = user.uid;

    let empleado = db.collection("empleados").doc(uid);
    let getEmpleado = empleado.get().then((doc) => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        var newData = doc.data();
        this.empleado = newData;
        if (newData.manager == true) {
          this.isorNot = true;
        }
      }
    });
  },
};
</script>