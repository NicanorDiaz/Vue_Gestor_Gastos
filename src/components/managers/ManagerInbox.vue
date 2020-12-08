<template>
  <div>
    <v-flex>
      <v-list class="pa-0 text-center" cols="12">
        <div v-for="i in gastosPendientes" :key="i.id">
          <v-list-item>
            <v-list-item-content @click="onClick(i)">
              <v-list-item-title>{{ i.titulo }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <v-dialog v-model="showCard">
        <GastoDetail :detail="this.gasto" @update-gasto="updateGasto" />
      </v-dialog>
    </v-flex>
  </div>
</template>

<script>
import firebase from "firebase/app";
import {db,fieldValue} from "../firebaseInit";
import GastoDetail from "./GastoDetail.vue";
export default {
  name: "EmpleadosAC",
  components: { GastoDetail },
  data() {
    return {
      gastosManager: [],
      empleadoData: [],
      eid: null,
      showCard: false,
      gasto: {},
      user: null,
    };
  },
  computed: {
    gastosPendientes() {
      return this.gastosManager.filter(x => (x.aceptado === undefined));
    }
  },
  created() {
    this.user = firebase.auth().currentUser;
    const { uid } = this.user;
    db.collection("empleados")
      .doc(uid)
      .collection("gastosE")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          var data = doc.data();
          this.gastosManager.push({id: doc.id, ...data});
          this.eid = await data.Empleado.id;
          db.collection("empleados")
            .doc(this.eid)
            .get()
            .then((doc) => {
              var emplData = doc.data();
              this.empleadoData.push(doc.data());
            });
        });
      });
  },
  methods: {
    onClick(i) {
      this.showCard = true;
      this.gasto = i;
    },
    async updateGasto(id, aceptado) {
      const gasto = this.gastosManager.find(x => x.id === id);
      console.log(gasto.EmpleadoRef.id);
      this.showCard = false;
      db.collection('empleados').doc(this.user.uid).collection('gastosE').doc(id).update({
        aceptado,
      });
      db.collection('empleados').doc(gasto.EmpleadoRef.id).collection('gastos').doc(id).update({
        aceptado,
      });
      // const empleado = await db.collection('empleados').doc(gasto.EmpleadoRef.id).get();
      // empleado.forEach(x => console.log(x.data()))
      this.gastosManager = this.gastosManager.filter(x => x.id !== id);
    }
  },
};
</script>

