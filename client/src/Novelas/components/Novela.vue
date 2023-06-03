<script lang="ts">


export default {
  name: "Novela",
  // props: { Novela: Array<any> },
  props: ["MiNovelaActual"],
  data() {
    let id: string = "/capitulos/" + this.MiNovelaActual[0].id;
    let titulo: string = this.MiNovelaActual[0].titulo;
    let imagen: string = this.MiNovelaActual[0].imagen;
    let descripcion: string = this.MiNovelaActual[0].descripcion;
    let capitulos: string = this.MiNovelaActual[0].paginas;
    return {
      id,
      titulo,
      imagen,
      descripcion,
      capitulos,
    };
  },
  methods: {
    cerrar() {
      // this.MiNovela = [];
      alert(this.titulo);

      this.titulo = "";
      this.imagen = "";
      this.descripcion = "";
      this.capitulos = "";
    },
  },
  destroyed() {
    this.cerrar();
  },
};
</script>
<template>
  <div class="container-md-4 div-Minovela">
    <div class="modal-xl">
      <div class="modal-body">
        <div class="card mb-3">
          <div class="modal-header">
            <h1 class="modal-title fs-5">{{ titulo }}</h1>
            <button
              type="button"
              @click="$emit('limpiar')"
              class="btn-close"
              aria-label="Close"
            ></button>
          </div>

          <div class="div-img">
            <img :src="imagen" class="card-img-top imagen" :alt="imagen" />
          </div>

          <div class="card-body">
            <h5 class="card-title" style="text-align: center">{{ titulo }}</h5>
            <p class="card-text">{{ descripcion }}</p>
            <p class="card-text">
              <small class="text-body-secondary">{{ capitulos }}</small>
              
            </p>
          </div>
          <hr />
          <div class="btn-foo">
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('limpiar')"
            >
              Cerrar
            </button>
              <router-link class="btn btn-primary mb-2 " :to="id">Ver</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.imagen {
  height: auto;
  width: auto;
  padding: 20px;
}

.div-img {
  display: flex;
  justify-content: center;
}

.btn-foo {
  display: flex;
  justify-content: space-around;
}
.btn-foo button {
  margin-bottom: 10px;
}
</style>
