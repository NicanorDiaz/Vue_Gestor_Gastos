<template>
  <div class="home pl-6 pt-2">
    <div v-for="file in empleados" :key="file.id">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ file.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "ShowEmpleados",
  data() {
    return {
      empleados: {},
    };
  },
  created() {
    const db = firebase.firestore();
    let empleado = db.collection("empleados");
    // let query = empleado
    //   .where("manager", "==", false)
    //   .get()
    //   .then((snapshot) => {
    //     if (snapshot.empty) {
    //       console.log("No matching documents.");
    //       return;
    //     }

    //     snapshot.forEach((doc) => {
    //     //   console.log(doc.id, "=>", doc.data());
    //       this.empleados = (doc.id, "=>", doc.data());
    //       console.log(this.empleados);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("Error getting documents", err);
    //   });

    let fua = empleado.where("manager", '==', false);
    fua.onSnapshot((snap) => {
        snap.forEach((doc) => {
            this.empleados[doc.id] = {
                id: doc.id,
            ...doc.data(),
            }
        })
        console.log(this.empleados);
    })

  },
  methods: {
    onClick() {},
  },
};
</script>