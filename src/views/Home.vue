<template>
  <v-row>
    <v-col v-if="manager">
      <ManagerView />
    </v-col>
    <v-col v-if="!manager">
      <EmpleadoView />
    </v-col>
    
  </v-row>
</template>

<script>
// @ is an alias to /src
import EmpleadoView from "@/components/GastosE.vue";
import ManagerView from "@/components/ShowEmpl.vue";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
 components: { EmpleadoView, ManagerView },
 data (){
   return{ manager: false }
 },
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
          this.manager = true;
        }
      }
    });
  },
};
</script>
