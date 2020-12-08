<template>
  <div class="home pa-0">
    <div v-if="idm">
      <v-flex>
      <v-list class="pt-0">
        <div v-for="file in archivos" :key="file.id">
          <v-list-item>
            <v-list-item-content @click="onClick(file)">
              <v-list-item-title :class="[file.aceptado ? 'green--text' : 'red--text']">{{ file.titulo }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <v-dialog v-model="showCard">
        <Detail :detail="this.gasto" />
      </v-dialog>
      </v-flex>
    </div>
    <div v-if="!idm">
      <h2>Usted todavia no tiene un jefe asignado. Porfavor espere</h2>
    </div>
  </div>
</template>

<script>
import Detail from "./CarDetails.vue";
import firebase from "firebase/app";
import {db, fieldValue} from "../firebaseInit";

export default {
  name: "InboxManager",
  components: { Detail },
  data() {
    return {
      valid: true,
      dialog: false,
      showCard: false,
      gasto: {},
      archivos: [],
      idm: null,
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    let uid = user.uid;
    db.collection("empleados")
      .doc(uid)
      .collection("gastos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          this.archivos.push(data);
          
        });
      });

    db.collection("empleados")
      .doc(uid)
      .get()
      .then(async (doc) => {
        let emplData = doc.data();
        this.idm = emplData.jefe;
      });
  },
  methods: {
    onClick(file) {
      this.showCard = true;
      this.gasto = file;
    },
  },
};
</script>