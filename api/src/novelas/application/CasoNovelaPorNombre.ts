import { Mensaje } from "../../server/domain/mensaje.entity";
import { novelaRepository } from "../doman/novelas.repository";

export class CasoNovelaPorNombre {
  constructor(private readonly novelaRepo: novelaRepository) {}

  async Run(name: string): Promise<Mensaje> {

    const datos = await this.novelaRepo.findByName(name)

    const mensaje: Mensaje = {
      msj: "Novela encontrada",
      status: 200,
      Datos: datos,
    };
    return mensaje;
  }
}
