import {Router} from 'express';

import {CasoListarCapitulos,CasoAgregarCapitulos} from '../../application/index'

import {MysqlCapituloRepository} from '../repository/Mysql.Repository'

import {CapituloController} from '../controllers/capitulo.controllers'

const router = Router();

///repo
const CapituloRepo = new MysqlCapituloRepository();

//caso de uso 
const listar = new CasoListarCapitulos(CapituloRepo);
const agregar = new CasoAgregarCapitulos(CapituloRepo);

//controlador

const  capitulo = new CapituloController(listar,agregar);

router.get('/:id',capitulo.ListarCapitulos)
router.post('/agregar/:id',capitulo.AgregarCapitulo)

export default router;