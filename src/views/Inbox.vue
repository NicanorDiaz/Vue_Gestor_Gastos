<template>
  <div class="about pt-0 pl-0">
    <v-col v-if="manager">
      <ManagerInbox />
    </v-col>
    <v-col v-if="!manager">
      <EmpleadoInbox
       />
    </v-col>
  </div>
</template>

<script>
import {db, fieldValue} from "../components/firebaseInit";
import firebase from "firebase/app";
import ManagerInbox from "@/components/managers/ManagerInbox.vue";
import EmpleadoInbox from "@/components/empleados/EmpleadoInbox.vue";
export default {
  components: { ManagerInbox, EmpleadoInbox },
  data() {
    return {manager: false};
  },
  created() {
    let user = firebase.auth().currentUser;
    let uid = user.uid;

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
