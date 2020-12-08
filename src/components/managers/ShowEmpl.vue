<template>
  <div class="home pl-6 pt-2">
    <h2>Empleados sin Jefes:</h2>
    <div class="form-group form-check" v-for="file in empleados" :key="file.id">
      <v-row>
        <v-col>
          <v-checkbox
            :value="file.id"
            :id="file.nombre"
            v-model="chequeados.check"
            :v-for="file.id"
            :label="file.nombre + ' ' + file.apellido"
          >
          </v-checkbox>
        </v-col>
      </v-row>
    </div>
    <div class="form-group">
      {{ chequeados.check }}
    </div>

    <div class="d-flex justify-end mr-5 mt-2">
      <v-btn fab dark right @click="confirmar">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { db, fieldValue } from "../firebaseInit";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "ShowEmpleados",
  props: ["detail"],
  data() {
    return {
      empleados: [],
      chequeados: {
        check: [],
      },
    };
  },
  created() {
    db.collection("empleados")
      .where("manager", "==", false)
      .where("jefe", "==", "")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
          };
          this.empleados.push(data);
        });
      });
  },
  methods: {
    confirmar() {
      let manager = firebase.auth().currentUser;
      let mid = manager.uid;
      let managerFirestore = db.collection("empleados").doc(mid);
      // managerFirestore.update({
      //   empleadoAC: fieldValue.arrayUnion(
      //     { empleado: this.chequeados.check.map((x) => db.collection("empleados").doc(x))}
      //   ),
      // });

      // let transaction = db.runTransaction((t) => {
      //   return t.get(managerFirestore).then((doc) => {
      //     t.update(managerFirestore, {
      //       empleadoAC: [
      //         ...doc.data().empleadoAC,
      //         this.chequeados.check.map((x) =>
      //           db.collection("empleados").doc(x)
      //         ),
      //       ],
      //     });
      //   });
      // });

      db.collection("empleados")
        .doc(mid)
        .update({
          empleadoAC: this.chequeados.check.map((x) =>
            db.collection("empleados").doc(x)
          ),
        })
        .then(
          this.chequeados.check.map((x) =>
            db
              .collection("empleados")
              .doc(x)
              .update({ jefe: db.collection("empleados").doc(mid) })
          )
        );
    },
  },
};
</script>