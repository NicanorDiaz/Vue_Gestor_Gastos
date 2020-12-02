<template>
  <v-row>
    <v-col>
      <br />
      <h3>{{ email }}</h3>
      <br />
      <h3>{{ empleado.nombre }}</h3>
      <br />
      <h3>{{ empleado.apellido }}</h3>
      <br />
      <h3 v-if="isorNot">{{empleado.empleados}}</h3>
      <h3 v-if="!isorNot">{{empleado.jefe}}</h3>
      <h3 v-if="isorNot">Manager</h3>
      <h3 v-if="!isorNot">Empleado</h3>
      <br />
      <h3>{{ empleado.jefe }}</h3>
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