<template>
  <div class="container-md-4">
    <div class="modal-xl">
      <div class="modal-body">
        <div class="card mb-3">
          <div class="div-img">
            <img :src="imagen" class="card-img-top imagen" :alt="imagen" />
          </div>

          <div class="card-body">
            <h5 class="card-title" style="text-align: center">
              {{ titulo }}
            </h5>
            <p class="card-text">{{ descripcion }}</p>
            <p class="card-text">
              <small class="text-body-secondary">{{ paginas }}</small>
            </p>
          </div>
          <hr />
          <div class="btn-foo">
            <router-link class="btn btn-secondary mb-2" to="/"
              >Cerrar</router-link
            >

            <button
              type="button"
              class="btn btn-primary"
              @click="agregarCapitulos"
            >
              Agregar
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="leer(idActual)"
            >
              Leer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="capitulos.length > 0">
      <Tabla
        :Capitulo="capitulos"
        :Cantidad="cantida"
        v-on:next="siguiente"
        :Pagina="paginaActual"
        v-on:previo="volver"
        v-on:actual="actual"
        v-on:leerNovela="leer"
      />
    </div>
    <div v-else>
      <h3 class="text-center">No tienes capitulos Guardados</h3>
    </div>

    <div id="myModalCapitulo" class="modalCapitulo">
      <LeerCapitulo
        v-if="capituloActual.length != 0"
        :CapituloActual="capituloActual"
        v-on:limpiar="limpiar"
        v-on:siguiente="siguienteCapitulo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Tabla from "./components/TablaCapitulo.vue";
import LeerCapitulo from "./components/ModalCapitulo.vue";
export default {
  name: "Capitulos",
  components: { Tabla, LeerCapitulo },
  data() {
    let id: string = "";
    let paginas: string = "";
    let titulo: string = "";
    let imagen: string = "";
    let descripcion: string = "";
    let url: string = "";
    let cantidadDeCapitulos: string = "";
    let capitulos: Array<string> = [];
    let paginaActual: number = 1;
    let limite: number = 10;
    let cantida: number = 0;
    let capituloActual: Array<any> = [];
    let idActual = 1;
    return {
      idActual,
      cantidadDeCapitulos,
      paginas,
      titulo,
      imagen,
      descripcion,
      capitulos,
      id,
      url,
      paginaActual,
      limite,
      cantida,
      capituloActual,
    };
  },
  mounted() {
    this.Liastar();
  },
  methods: {
    async Liastar() {
      let listaDeCapitulos: any = await fetch(
        `${import.meta.env.VITE_API}/api/capitulo/${
          this.$route.params.id
        }?limite=${this.limite}&pagina=${this.paginaActual}`
      );
      listaDeCapitulos = await listaDeCapitulos.json();
      this.id = listaDeCapitulos.Datos.novela.id;
      this.titulo = listaDeCapitulos.Datos.novela.titulo;
      this.imagen = listaDeCapitulos.Datos.novela.imagen;
      this.descripcion = listaDeCapitulos.Datos.novela.descripcion;
      this.paginas = listaDeCapitulos.Datos.novela.paginas;
      this.url = listaDeCapitulos.Datos.novela.url;
      this.capitulos = listaDeCapitulos.Datos.rows;
      this.cantidadDeCapitulos = listaDeCapitulos.Datos.count;
      this.cantida = Math.floor(listaDeCapitulos.Datos.count / this.limite) + 1;
      this.idActual = listaDeCapitulos.Datos.rows[0].id;
    },
    siguiente() {
      if (this.cantida != this.paginaActual) {
      }
      this.paginaActual += this.limite;
      // console.log("nueva Pagina ", this.paginaActual);
      this.Liastar();
    },
    volver() {
      if (this.paginaActual != 1) {
        this.paginaActual -= this.limite;
        this.Liastar();
      }
    },
    actual(pagina: number) {
      this.paginaActual = pagina * this.limite + 1;

      this.Liastar();
    },

    leer(id: number) {
      let modal: any;
      modal = window.document.getElementById("myModalCapitulo");
      modal.style.display = "block";
      // this.VerNovela = !this.VerNovela;
      // this.MiNovela = this.ListaNovelas.filter((e: any) => e.id == id);
      this.capituloActual = this.capitulos.filter((e: any) => e.id == id);
      console.log(this.capituloActual[0]);
      // alert(`Id novela ${id}`);
    },
    limpiar() {
      let modal: any;
      modal = window.document.getElementById("myModalCapitulo");
      modal.style.display = "none";
      this.capituloActual = [];
    },
    siguienteCapitulo(id: number) {
      // console.log(id)
      // console.log(this.capituloActual[0]);

      this.capituloActual = [];
      if (this.capituloActual.length == 0) {
        this.capituloActual = this.capitulos.filter((e: any) => e.id == id);
      }

      // console.log(this.capituloActual[0]);
    },
    async agregarCapitulos() {
      /**
       *
       */
      if (this.url == "No tiene paginado") {
      }
      const dato = {
        url: this.url,
      };

      // "http://192.168.1.16:4000/api/novela/agregar",
      let respuesta: any = await fetch(
        `${import.meta.env.VITE_API}/api/capitulo/agregar/${this.id}`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(dato),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(respuesta);
    },
  },
};
</script>

<style>
img {
  width: auto;
  height: auto;
}

.separar {
  width: 14rem;
  transition-duration: 0s;
}

p {
  text-align: center;
}

.separar:hover {
  width: 20rem;
  cursor: pointer;

  transform: none;
}

.div-novela {
  position: fixed;
  z-index: 1;
  width: 500px;
  height: 500px;
}

.modalCapitulo {
  padding: 10px;
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
