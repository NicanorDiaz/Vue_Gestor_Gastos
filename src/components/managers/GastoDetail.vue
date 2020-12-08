<template>
  <v-container class="pa-0">
    <v-card>
      <v-card-text>
        <h1 class="text-center">{{ detail.titulo }}</h1>
        <br />
        <h3 class="text-center grey--text">{{ detail.date }}</h3>
        <br />
        <h2>Nafta: {{ detail.nafta }}$</h2>
        <br />
        <v-divider></v-divider>
        <br />
        <h2>Comida: {{ detail.comida }}$</h2>
        <br />
        <v-divider></v-divider>
        <br />
        <h2>Hospedaje: {{ detail.hospedaje }}$</h2>
        <br />
        <v-divider></v-divider>
        <br />
        <h2 class="green--text">Total: {{ detail.total }}$</h2>
        <br />
        <h2 class="red--text">{{ detail.Empleado }}</h2>
      </v-card-text>
      <v-card-actions>
        <v-btn
          outlined
          rounded
          text
          color="red"
          @click="update(false)"
        >
          Denegar
        </v-btn>
          <v-btn
          outlined
          rounded
          text
          color="green"
          @click="update(true)"
        >
          Aceptar
        </v-btn>
    </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import {db, fieldValue} from "../firebaseInit";
export default {
  props: ["detail"],
  data() {
    return {
      empleadoData: [],
    };
  },
  methods: {
    update(isAccepted) {
      this.$emit('update-gasto', this.detail.id, isAccepted);
    }
  }
};
</script>
