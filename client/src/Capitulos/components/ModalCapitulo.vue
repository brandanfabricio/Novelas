<script lang="ts">
export default {
  name: "Novela",
  // props: { Novela: Array<any> },
  props: ["CapituloActual"],
  data() {
    let id: string = this.CapituloActual[0].id;
    let cap: string = this.CapituloActual[0].cap;
    let titulo: string = this.CapituloActual[0].titulo;
    let contenido: string = this.CapituloActual[0].contenido;
    let Ncap: string = this.CapituloActual[0].Ncap;
    let Vertitulo: string = "#Mititulo";
    return {
      id,
      titulo,
      cap,
      contenido,
      Ncap,
      Vertitulo,
    };
  },
  mounted() {
    this.cargar();
  },
  updated() {
    this.id = this.CapituloActual[0].id;
    this.cap = this.CapituloActual[0].cap;
    this.titulo = this.CapituloActual[0].titulo;
    this.contenido = this.CapituloActual[0].contenido;
    this.Ncap = this.CapituloActual[0].Ncap;
    this.cargar();
  },

  methods: {
    cerrar() {
      this.id = "";
      this.cap = "";

      this.titulo = "";
      this.contenido = "";
      this.Ncap = "";
      this.$emit("limpiar");
    },
    siguinete() {
      let capituloSiguiente = Number(this.id) + 1;
      // console.log()
      // console.log(this.Ncap);

      // console.log(capituloSiguiente);
      this.$emit("siguiente", capituloSiguiente);
    },
    cargar() {
      let divContendio: any;
      divContendio = document.querySelector(".contenido-capitulo");
      divContendio.innerHTML = `${this.contenido}`;
    },
  },
};
</script>
<template>
  <div class="container-md-4 div-Minovela " id="Mititulo">
    <div class="modal-xl">
      <div class="modal-body">
        <div class="card mb-3">
          <div class="modal-header btn-cerrar">
            <!-- <h1 class="modal-title fs-5">{{ Ncap }}</h1> -->

            <button
              type="button"
              @click="cerrar"
              class="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="card-body">
            <h5 class="card-title"  style="text-align: center">
              {{ titulo }}
            </h5>
            <div class="contenido-capitulo">ñs
              <!-- {{ contenido }} -->
            </div>
          </div>
          <hr />
          <div class="btn-foo">
            <button type="button" class="btn btn-secondary" @click="cerrar">
              Cerrar
            </button>
            <button type="button" class="btn btn-secondary" @click="siguinete">
              <a class="link" href="#Mititulo">Siguiente</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.link{
  text-decoration: none;
}
.btn-cerrar {
  display: flex;
  justify-content: end;
  margin: 5px;
  padding: 5px;
}
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
.contenido-capitulo {
  display: flex;
  justify-content: center;
  text-align: justify;
  margin: auto;
  padding: auto;
}
</style>
