<script lang="ts">
import ModalNovela from './Novela.vue';

export default {
    name: "ListaNovelas",
    components: { ModalNovela },
    data() {
        let VerNovela: boolean = false;
        let MiNovela: Array<any> = [];

        return {
            VerNovela,
            MiNovela
        }
    },

    // props: { ListaNovelas: Array<any> },
    props: ['ListaNovelas'],
    methods: {
        verModal(id: string) {
            let modal: any;
            //    this.window.document.getElementById("myModal")?.style.display = 'block';
            modal = window.document.getElementById('myModal');
            modal.style.display = 'block';
            // modal.style.display = "block";

            this.VerNovela = !this.VerNovela;
            this.MiNovela = this.ListaNovelas.filter((e: any) => e.id == id);
        },
        borrar() {
            let modal: any;
            //    this.window.document.getElementById("myModal")?.style.display = 'block';
            modal = window.document.getElementById('myModal');
            modal.style.display = 'none';
            this.MiNovela = [];
            this.VerNovela = false;
        }
    },


}


</script>

<template>
    <div class="row novleas-row" >


        <div class="col-md-6 card separar" v-for="novela in  ListaNovelas " v-bind:key="novela.id"
            @click="verModal(novela.id)">
            <img :src="novela.imagen" alt="1" />
            <div class="card-body">
                <p class="card-text">{{ novela.titulo }}</p>
            </div>
        </div>

        <div id="myModal" class="modal">
            <ModalNovela v-if="VerNovela && MiNovela.length != 0" :MiNovelaActual="MiNovela" v-on:limpiar="borrar" />
        </div>
        
    </div>
</template>

<style>
.novleas-row{
    display: flex;
    justify-content:  center;
    gap: 20px;
}
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

.modal {
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
