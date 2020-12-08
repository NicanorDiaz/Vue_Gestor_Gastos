<template>
  <v-row v-if="!loading">
    <v-col>
      <v-col align="center">
        <v-avatar class="avatar" size="80" color="indigo">
          <v-icon size="40">mdi-chess-knight</v-icon>
        </v-avatar>
        <h2 class="nombre-apellido red--text">
          {{ empleado.nombre + " " + empleado.apellido }}
        </h2>

        <h3 class="grey--text">{{ email }}</h3>
      </v-col>
      <br />

      <v-row class="rowCargo pl-5">
        <v-icon color="green pl-10" size="30">mdi-tie</v-icon>
        <h2 class="cargo mr-5 pl-2">Cargo:</h2>
        <h2 class="manager grey--text">Empleado</h2>
      </v-row>
      <br />
      <v-row class="rowEdad pl-5">
        <v-icon color="green pl-10" size="30">mdi-human-greeting</v-icon>
        <h2 class="edad mr-5 pl-2">Edad:</h2>
        <h2 class="edads grey--text">{{ empleado.edad }}</h2>
      </v-row>
      <br />
      <v-row class="rowJefe pl-5">
        <v-icon color="green" size="30">mdi-chess-king</v-icon>
        <h2 class="edad mr-5 pl-2">Jefe:</h2>
        <h2 class="grey--text" v-if="mid">
          {{ managerD.nombre + " " + managerD.apellido }}
        </h2>
        <h2 class="grey--text" v-if="!mid">Sin jefe Asignado</h2>
      </v-row>
    </v-col>
  </v-row>
</template>


<script>
import firebase from "firebase/app";
import {db, fieldValue} from "../firebaseInit";
export default {
  name: "ProfileEmpleado",

  data() {
    return {
      email: null,
      empleado: null,
      managerD: null,
      mid: null,
      loading: true,
    };
  },
  methods: {},
  async created() {
    let user = firebase.auth().currentUser;
    this.email = user.email;

    let uid = user.uid;
    const doc = await db.collection('empleados').doc(uid).get();
    if (doc.exists) {
      const empleado = doc.data();
      this.empleado = empleado;
      this.mid = empleado.jefe.id;

      const jefeDoc = await db.collection('empleados').doc(this.mid).get();
      if (jefeDoc.exists) {
        this.managerD = jefeDoc.data();
      }

      this.loading = false;
    }
    // let getEmpleado = db
    //   .collection("empleados")
    //   .doc(uid)
    //   .get()
    //   .then(async (doc) => {
    //     if (!doc.exists) {
    //       console.log("No such document!");
    //     } else {
    //       let newData = doc.data();
    //       this.empleado = newData;
    //       this.mid = newData.jefe;

    //       db.collection("empleados")
    //         .doc(this.mid.id)
    //         .get()
    //         .then((doc) => {
    //           if (!doc.exists) {
    //             console.log("No such document!");
    //           } else {
    //             var managerData = doc.data();
    //             this.managerD = managerData;
    //           }
    //         });
    //     }
    //   });
  },
};
</script>