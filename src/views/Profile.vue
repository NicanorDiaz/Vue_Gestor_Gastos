<template>
  <div class="about pt-5 pl-2" v-if="!loading">
    <v-col v-if="isManager">
      <InfoManager />
    </v-col>
    <v-col v-if="!isManager">
      <InfoEmpleado />
    </v-col>
  </div>
</template>


<script>
import InfoEmpleado from "@/components/empleados/InfoProfileEmpleado.vue";
import InfoManager from "@/components/managers/InfoProfileManager.vue";
import {db, fieldValue} from "../components/firebaseInit";
import firebase from "firebase/app";

export default {
  components: { InfoEmpleado, InfoManager },
  data() {
    return { 
      isManager: false,
      loading: true,
    };
  },
  async created() {
    let user = firebase.auth().currentUser;
    let uid = user.uid;

    const empleado = await db.collection("empleados").doc(uid).get();
    if (empleado.exists) {
      const data = empleado.data();
      this.isManager = data.manager;
      this.loading = false;
    }
    // let getEmpleado = empleado.get().then((doc) => {
    //   if (!doc.exists) {
    //     console.log("No such document!");
    //   } else {
    //     let newData = doc.data();
    //     this.empleado = newData;
    //     if (newData.manager == true) {
    //       this.manager = true;
    //     }
    //   }
    // });
  },
};
</script>
  