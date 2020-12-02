<template>
    <v-container class="pa-0">
        <v-btn
          fab
          dark
          right
          @click="dialog = !dialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
export default {
    props:['detail'],
}
</script>