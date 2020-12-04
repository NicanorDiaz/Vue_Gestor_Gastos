<template>
  <div class="home pl-6 pt-2">
    <v-list class="pt-0">
      <div v-for="file in archivos" :key="file.id">
        <v-list-item>
          <v-list-item-content @click="onClick(file)">
            <v-list-item-title>{{ file.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <div class="d-flex justify-end mr-5 mt-2">
      <v-btn fab dark right @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="showCard">
      <Detail :detail="this.gasto" />
    </v-dialog>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text>
          <v-text-field label="Titulo" v-model="title"></v-text-field>
          <v-text-field label="nafta" v-model="nafta"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addFile">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Detail from "./CarDetails.vue";
import firebase from "firebase/app";
import db from "./firebaseInit";

export default {
  name: "Home",
  components: { Detail },
  data() {
    return {
      dialog: false,
      showCard: false,
      title: "",
      nafta: "",
      empleado: "",
      archivos: [],
      files: [],
      gasto: {},
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    let uid = user.uid;
    firebase.firestore().collection("empleados").doc(uid).collection("gastos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            titulo: doc.data().titulo,
          };
          this.archivos.push(data);
        });
      });
  },
  methods: {
    addFile() {
      let user = firebase.auth().currentUser;
      let uid = user.uid;

      let empleado = db.collection("empleados");

      let xd = empleado.doc(uid).collection("gastos").doc().set({
        titulo: this.title,
        nafta: this.nafta,
      });
      this.archivos.push({
        id: +new Date(),
        titulo: this.title,
        nafta: this.nafta,
      });
      this.title = " ";
      this.nafta = " ";
      this.dialog = false;
    },
    onClick(file) {
      this.showCard = true;
      this.gasto = file;
    },
  },
};
</script>