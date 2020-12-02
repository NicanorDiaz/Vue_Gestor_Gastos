<template>
    <v-container class="pa-0">
        <v-card>
            <v-card-text>
                {{detail.titulo + ' ' +detail.id}}
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props:['detail'],
}
</script>
