<script lang="ts">
export default {
  name: "AgregarNovela",
  data() {
    let url: string = "";
    return {
      url,
    };
  },

  methods: {
    verModal() {
      let modal: any;
      modal = window.document.getElementById("myModalAgregar");
      modal.style.display = "block";
    },
    cerrar() {
      let modal: any;
      modal = window.document.getElementById("myModalAgregar");
      modal.style.display = "none";
    },

    async GuardarNovela() {
      if (this.url == "") {
        alert("El campo esta vacio");
        return;
      }
      const dato: any = {
        url: this.url,
      };
      let respuesta: any = await fetch(
        `${import.meta.env.VITE_API}/api/novela/agregar`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(dato),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      respuesta = await respuesta.json();
      if (respuesta.status == 200) {
        this.url = "";
        this.$emit('recargar')
        return;
      }
      if (respuesta.status == 201) {
        this.url = "";
        this.cerrar();
        this.$emit('recargar')
        return;
      }
    },
  },
};
</script>

<template>
  <div class="row">
    <button @click="verModal">Agregar Novela</button>
    <div id="myModalAgregar" class="modalAgregar">
      <div class="modal-xl">
        <div class="modal-body">
          <div class="card mb-3">
            <div class="modal-header titulo">
              <h1 class="modal-title fs-5 titulo">Agregar Novela</h1>
              <button
                type="button"
                @click="cerrar"
                class="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <hr />
            <div class="card-body">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3 basic-addon4"
                  placeholder="https://tunovelaligera.com/novelas/"
                  v-model="url"
                />

                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  @click="GuardarNovela"
                >
                  Agregar
                </button>
              </div>
            </div>
            <hr />
            <div class="btn-foo">
              <button type="button" class="btn btn-secondary" @click="cerrar">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.titulo {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
}

.separar {
  width: 14rem;
  transition-duration: 0s;
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

.modalAgregar {
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
