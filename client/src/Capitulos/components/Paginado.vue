<template>
  <div class="container">
    <nav aria-label="...">
      <ul class="paginado pagination">
        <li class="page-item">
          <button class="page-link" @click="$emit('previo')">Previous</button>
        </li>

        <li v-for=" pagina in 25  " class="page-item" :id="'pagina' + pagina">
          <button class="page-link" @click="$emit('actual', pagina - 1)">
            {{ pagina }}
          </button>
        </li>

        <li class="page-item">
          <button class="page-link" @click="$emit('next')">Next</button>
        </li>
      </ul>
    </nav>
    <!-- {{ Math.floor(Cantidad / 5) }} -->
  </div>
</template>

<script lang="ts">
export default {
  name: "Paginado",
  props: ["Cantidad", "Next", "Pagina"],

  mounted() {
    // let cantidadInicial = 24;

    // let fracionCantidad = this.Cantidad - (this.Cantidad - cantidadInicial);

    // for (let i = 0; i < fracionCantidad; i++) {
    //   console.log(i);
    // }
  },
};
</script>
<style>
.paginado {
  display: flex;
  flex-wrap: wrap;
}
</style>
