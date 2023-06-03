import { Mensaje } from "../../server/domain/mensaje.entity";
import { novelaRepository } from "../doman/novelas.repository";

export class CasoNovelaPorId {
  constructor(private readonly novelaRepo: novelaRepository) {}

  async Run(id: string): Promise<Mensaje> {

    const datos = await this.novelaRepo.findById(id);

    const mensaje: Mensaje = {
      msj: "Novela encontrada",
      status: 200,
      Datos: datos,
    };
    return mensaje;
  }
}
