<template>
  <v-app id="inspire">
    <Nav />
    

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Nav from "@/components/NavBar.vue";

export default {
  components: { Nav },
  
};
</script>
