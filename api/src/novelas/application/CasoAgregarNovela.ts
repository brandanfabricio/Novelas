import { Mensaje } from "../../server/domain/mensaje.entity";
import { novelaRepository } from "../doman/novelas.repository";
import ExtraerNovela from "../doman/lib/ExtraerNovela";
export class CasoAgregarNovela {
  constructor(private readonly novelaRepo: novelaRepository) {}

  async Run(url: string): Promise<Mensaje> {
    // const datos = await this.novelaRepo.findById(id);

    const dato = await ExtraerNovela(url);
    if (dato == null) {
      console.log("Error");
      throw "Error";
    }
    console.log(dato);
    const existe = await this.novelaRepo.existe(dato.titulo, dato.url);

    if (existe.length == 0) {

      console.log(dato)
      await this.novelaRepo.save(dato);

      console.log("############################");
      console.log("#### La novela Guardada   ####");
      console.log("############################");

      const mensaje: Mensaje = {
        msj: "Novela Agregada",
        status: 201,
        Datos: dato,
      };
      return mensaje;
    }
    console.log("############################");
    console.log("#### La novela ya existe ####");
    console.log("############################");

    const mensaje: Mensaje = {
      msj: "La novela ya existe",
      status: 200,
    };
    return mensaje;
  }
}
