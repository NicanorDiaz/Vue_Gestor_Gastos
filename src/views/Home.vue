<template>
  <v-row>
    <v-col v-if="!manager">
      <ManagerView />
    </v-col>
    <v-col v-if="manager">
      <EmpleadoView />
    </v-col>
    
  </v-row>
</template>

<script>
// @ is an alias to /src
import EmpleadoView from "@/components/empleados/GastosE.vue";
import ManagerView from "@/components/managers/ShowEmpl.vue";
import firebase from "firebase/app";
import db from "../components/firebaseInit";

export default {
 components: { EmpleadoView, ManagerView },
 data (){
   return{ manager: true }
 },
 created() {
    var user = firebase.auth().currentUser;
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
          this.manager = false;
        }
      }
    });
  },
};
</script>
