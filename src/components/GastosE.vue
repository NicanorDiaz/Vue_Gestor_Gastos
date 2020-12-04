<template>
  <div class="home pl-1 pt-2">
    <v-list class="pt-0">
      <div v-for="file in archivos" :key="file.id" >
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
          <v-form ref="form" @submit.prevent="submit" v-model="valid">
            <v-text-field label="Titulo" v-model="title" :rules="titleR"></v-text-field>
            <v-text-field label="Nafta" v-model.number="nafta" :rules="naftaR"></v-text-field>
            <v-text-field
              label="Hospedaje"
              v-model.number="hospedaje"
              :rules="hospedajeR"
            ></v-text-field>
            <v-text-field label="Comida" v-model.number="comida" :rules="comidaR"></v-text-field>
            <v-date-picker v-model="date" range></v-date-picker>
          </v-form>
          
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
      valid:true,
      dialog: false,
      showCard: false,
      title: "",
      titleR: [(val) => !!val || "Porfavor ingrese algun Titulo"],
      
      nafta: 0,
      naftaR: [(val) => !!val || "Ingrese gasto de Nafta"],

      hospedaje: 0,
      hospedajeR: [(val) => !!val || "Ingrese gasto de Nafta"],

      comida: 0,
      comidaR: [(val) => !!val || "Ingrese gasto de Nafta"],
      
      date: '2020-12-04',
      

      total:0,
      archivos: [],
      gasto: {},
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    let uid = user.uid;
  
    firebase
      .firestore()
      .collection("empleados")
      .doc(uid)
      .collection("gastos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            titulo: doc.data().titulo,
            nafta: doc.data().nafta,
            hospedaje: doc.data().hospedaje,
            comida: doc.data().comida,
            date:doc.data().date,
            total: doc.data().total
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

      this.$refs.form.validate();
      if( this.$refs.form.validate()){
        this.total = parseFloat(this.comida)+ parseFloat(this.hospedaje) +parseFloat(this.nafta)

      let gastosFire = empleado.doc(uid).collection("gastos").doc().set({
        titulo: this.title,
        nafta: this.nafta,
        comida: this.comida,
        hospedaje:this.hospedaje,
        date:this.date,
        total: this.total
      });
      
      this.archivos.push({
        id: +new Date(),
        titulo: this.title,
        nafta: this.nafta,
        hospedaje: this.hospedaje,
        comida:this.comida,
        date: this.date,
        total: this.total
      });
    
      this.title = " ";
      this.nafta = "0";
      this.hospedaje="0";
      this.comida= "0";
      this.total= "0";
      this.dialog = false;
      }

      
    },
    onClick(file) {
      this.showCard = true;
      this.gasto = file;
    },
  },
};
</script>