import { CapituloEntity } from "./capitulo.entity"

export interface CapituloRepository {

    faindAll(id:string,limite:number,pagina:number):Promise<any>
    saveCapitulo(dato:CapituloEntity):Promise<void>
}
