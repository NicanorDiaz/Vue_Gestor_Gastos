<template>
  <div class="home pl-1">
    <div v-if="idm">
        <h1 class="pl-10">Crear Gasto</h1>
        <v-card>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit" v-model="valid">
              <v-text-field
                label="Titulo"
                v-model="title"
                :rules="titleR"
              ></v-text-field>
              <v-text-field
                label="Nafta"
                v-model.number="nafta"
                :rules="naftaR"
              ></v-text-field>
              <v-text-field
                label="Hospedaje"
                v-model.number="hospedaje"
                :rules="hospedajeR"
              ></v-text-field>
              <v-text-field
                label="Comida"
                v-model.number="comida"
                :rules="comidaR"
              ></v-text-field>
              <v-date-picker v-model="date" range></v-date-picker>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addFile">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="show"> 
          <v-card>
            <v-card-text>Su Gasto Ha sido enviado</v-card-text>
          </v-card>
        </v-dialog>
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
  name: "Home",
  components: { Detail },
  data() {
    return {
      valid: true,
      gasto: {},
      title: "",
      titleR: [(val) => !!val || "Porfavor ingrese algun Titulo"],

      nafta: 0,
      naftaR: [(val) => !!val || "Ingrese gasto de Nafta"],

      hospedaje: 0,
      hospedajeR: [(val) => !!val || "Ingrese gasto de Nafta"],

      comida: 0,
      comidaR: [(val) => !!val || "Ingrese gasto de Nafta"],

      date: [],

      total: 0,
      empleadoData: [],
      idm: null,

      show:false,
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    let uid = user.uid;
    db.collection("empleados")
      .doc(uid)
      .get()
      .then(async (doc) => {
        let emplData = doc.data();
        this.empleadoData.push(doc.data());
        this.idm = emplData.jefe;
      });
  },
  methods: {
    async addFile() {
      let user = firebase.auth().currentUser;
      let uid = user.uid;

      let empleado = db.collection("empleados");

      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.total =
          parseFloat(this.comida) +
          parseFloat(this.hospedaje) +
          parseFloat(this.nafta);

      const id = +new Date(); 
        let gastosFire = empleado
          .doc(uid)
          .collection("gastos")
          .doc(id.toString())
          .set({
            titulo: this.title,
            nafta: this.nafta,
            comida: this.comida,
            hospedaje: this.hospedaje,
            date: this.date,
            total: this.total,
          });

        let gastoManager = empleado
          .doc(this.idm.id)
          .collection("gastosE")
          .doc(id.toString())
          .set({
            titulo: this.title,
            nafta: this.nafta,
            comida: this.comida,
            hospedaje: this.hospedaje,
            date: this.date,
            total: this.total,
            Empleado: user.email,
            EmpleadoRef: db.collection("empleados").doc(uid)
          });

        this.title = " ";
        this.nafta = "0";
        this.hospedaje = "0";
        this.comida = "0";
        this.total = "0";
        this.date = [];
        this.show = true
      }
    },
  },
};
</script>