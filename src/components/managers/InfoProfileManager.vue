<template>
  <v-flex v-if="!loading">
    <v-row>
      <v-col>
        <v-col align="center">
          <v-avatar class="avatar" size="80" color="indigo">
            <v-icon size="40">mdi-chess-king</v-icon>
          </v-avatar>
          <h2 class="nombre-apellido red--text">
            {{ manager.nombre + " " + manager.apellido }}
          </h2>

          <h3 class="grey--text">{{ email }}</h3>
        </v-col>
        <br />
        <v-row class="rowCargo pl-5">
          <v-icon color="green pl-10" size="30">mdi-tie</v-icon>
          <h2 class="cargo mr-5 pl-2">Cargo:</h2>
          <h2 class="manager grey--text">Manager</h2>
        </v-row>
        <br />
        <v-row class="rowEdad pl-5">
          <v-icon color="green pl-10" size="30">mdi-human-greeting</v-icon>
          <h2 class="edad mr-5 pl-2">Edad:</h2>
          <h2 class="edads grey--text">{{ manager.edad }}</h2>
        </v-row>
        <br />
        <v-row class="rowEmpleado pl-5">
          <h2 class="mr-5 pl-2">Emleados a su cargo:</h2>
          <h2
            v-for="empleado in empleados"
            :key="empleado.id"
            
            class="grey--text"
          >
            {{ empleado.nombre + " " + empleado.apellido }},
          </h2>
          <h2 v-if="!haveEmpleado" class="grey--text">Usted no tiene empleados a cargo</h2>
        </v-row>
      </v-col>
    </v-row>
  </v-flex>
</template>


<script>
import firebase from "firebase/app";
import { db, fieldValue } from "../firebaseInit";
export default {
  name: "ProfileManager",

  data() {
    return {
      email: null,
      manager: null,
      eid: null,
      empleados: null,
      loading: true,
      haveEmpleado: false,
    };
  },
  async created() {
    let user = firebase.auth().currentUser;
    this.email = user.email;
    let uid = user.uid;
    const doc = await db.collection("empleados").doc(uid).get();
    this.manager = doc.data();
    if (doc.data().empleadoAC != null) {
      this.haveEmpleado = true;
    }

    if (this.haveEmpleado) {
      // console.log(this.manager.empleadoAC.map((x) => x.id));
      const empleados = await Promise.all(
        this.manager.empleadoAC.map((x) =>
          db.collection("empleados").doc(x.id).get()
        )
      );

      this.empleados = empleados.map((x) => x.data());
    }
    this.loading = false;
  },
};
</script>