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
import "firebase/firestore";
import "firebase/auth";

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
      archivos: {},
      files: [],
      gasto: {},
    };
  },
  async created() {
    const gastosRef = await firebase.firestore().collectionGroup("gastos");
      gastosRef.onSnapshot((snap) => {
        snap.forEach((doc) => {
          this.archivos[doc.id] = {
            id: doc.id,
            ...doc.data(),
          };
        });
      });
  },
  methods: {
    addFile() {
      let newFile = {
        id: +Date.now(),
        title: this.title,
        nafta: this.nafta,
      };
      this.files.push(newFile);
      this.dialog = false;

      var user = firebase.auth().currentUser;
      const db = firebase.firestore();

      var uid = user.uid;
      let empleado = db.collection("empleados");

      let xd = empleado.doc(uid).collection("gastos").doc().set({
        titulo: this.title,
        nafta: this.nafta,
      });
    },
    onClick(file) {
      this.showCard = true;
      this.gasto = file;
    },
  },
};
</script>