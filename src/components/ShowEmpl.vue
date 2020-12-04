<template>
  <div class="home pl-6 pt-2">
    <div class="form-group form-check" v-for="file in empleados" :key="file.id">
      <label class="form-check-label" :for="file.id">{{ file.nombre }}</label>
      <input
        type="checkbox"
        v-model="chequeados.check"
        :id="file.nombre"
        :value="file.id"
      />
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
import db from "./firebaseInit";
import firebase from "firebase/app";

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
    async confirmar() {
      let manager = firebase.auth().currentUser;
      let mid = manager.uid;
      let i =0;
      let eid = JSON.parse(JSON.stringify(this.chequeados.check));

      console.log(eid);
      
      // for (i in eid){
      //   db.collection("empleados").doc(mid).update({
      //     empleadoAC: db.collection("empleados").doc(i.value)
      //   })
      // }

      // for (i in eid){
      //   console.log(i);
      // }

     
    },
  },
};
</script>