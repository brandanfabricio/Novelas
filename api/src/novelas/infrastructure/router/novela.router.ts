import { Router } from "express";

import {MysqlRepository} from '../repository/mysql.repository'

import {CasoTodasLasNovelas,CasoNovelaPorId,CasoNovelaPorNombre,CasoAgregarNovela} from '../../application/index'

import {NovelaController} from '../controllers/Novela.controllers'
const router = Router();

//instancio repo 
const mysql = new MysqlRepository();

//instancio caso de uso

const listaNovelas = new CasoTodasLasNovelas(mysql);
const porId = new CasoNovelaPorId(mysql);
const porNombre = new CasoNovelaPorNombre(mysql)
const agregarNovela = new CasoAgregarNovela(mysql);


//controlador
const novela = new NovelaController(listaNovelas,porId,porNombre,agregarNovela);

//rutas
router.get('/',novela.ListaNovelas)
router.get('/:id',novela.NovelaPorId)
router.post('/',novela.NovelaPorNombre)

router.post('/agregar',novela.AgregarNovela)

export default router;
