<template>
  <!-- id
novelaId
titulo
contenido
Ncap
cap -->

  <div class="container">
    <table class="table">
      
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Capitulo</th>
          <th scope="col">Titulo</th>
          <th scope="col">Accion</th>
        </tr>
      </thead>
      <tbody v-for="cap in Capitulo" :key="cap.id">
        <tr>
          <th scope="row">{{ cap.id }}</th>
          <td>{{ cap.Ncap }}</td>
          <td>{{ cap.titulo }}</td>
          <td><button class="btn btn-info" @click="$emit('leerNovela',cap.id)">Leer</button></td>
        </tr>
      </tbody>
    </table>
    <Paginado
      :Cantidad="Cantidad"
      v-on:next="next"
      :Pagina="Pagina"
      v-on:previo="previo"
      v-on:actual="actual"
    />
  </div>
</template>

<script lang="ts">
import Paginado from "./Paginado.vue";
export default {
  name: "TablaCapitulo",
  components: { Paginado },
  props: ["Capitulo", "Cantidad", "Pagina"],
  methods: {
    next() {
      this.$emit("next");
    },
    previo() {
      this.$emit("previo");
    },
    actual(pagina: number) {
      this.$emit("actual", pagina);
    },
  },
};
</script>
