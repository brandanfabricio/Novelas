import { Mensaje } from "../../server/domain/mensaje.entity";
import { novelaRepository } from "../doman/novelas.repository";

export class CasoTodasLasNovelas {
  constructor(private readonly novelaRepo: novelaRepository) {}

  async Run(): Promise<Mensaje> {


     const datos = await this.novelaRepo.findAll();

    const mensaje: Mensaje = {
      msj: "Todas las novelas",
      status: 200,
      Datos: datos,
    };
    return mensaje;
  }
}
