import { Router } from 'express';
// const { Usuarios, Tienda, Platos, Orden, Redes, Pedidos } = require('../services')
import Novelas from '../../../novelas/infrastructure/router/novela.router';
import Capitulos from '../../../capitulos/infrastructure/routers/capitulo.router';
import { Error404 } from './middleware';


const router = Router();
const routerApi = Router();

 routerApi.use('/novela', Novelas)
 routerApi.use('/capitulo', Capitulos)


router.use('/api/', routerApi)
router.use(Error404)
export default router;