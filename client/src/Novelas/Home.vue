<script lang="ts">
import AgregarNovela from "./components/AgregarNovela.vue";
import ListadoDeNovelas from "./components/ListaNovelas.vue";

export default {
  name: "Home",
  components: { ListadoDeNovelas, AgregarNovela },
  data() {
    let ListaNovelas: Array<any> = [];
    return {
      ListaNovelas,
    };
  },
  async mounted() {
    await this.TodasLasNovelas();

  },
  methods: {
    async TodasLasNovelas(): Promise<void> {
      const novelas = await fetch(`${import.meta.env.VITE_API}/api/novela`);
      const datos = await novelas.json();

      console.log(datos);
      this.ListaNovelas = await datos.Datos;
    },
    async Recarga() {
      await this.TodasLasNovelas();
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row-lg-12 m-5">
      <AgregarNovela v-on:recargar="Recarga" class="Agregarnovela" />
      <ListadoDeNovelas :ListaNovelas="ListaNovelas" />
    </div>
  </div>
</template>

<style>
.Agregarnovela {
  background-color: rebeccapurple;
  margin-bottom: 20px;
}
</style>
