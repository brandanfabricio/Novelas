import { Mensaje } from "../../server/domain/mensaje.entity";
import { CapituloRepository } from "../domain/capitulo.repository";

export class CasoListarCapitulos {
  constructor(private readonly CapituloRepo: CapituloRepository) {}
  public async Run(
    id: string,
    limite: number,
    pagina: number
  ): Promise<Mensaje> {
    const datos = await this.CapituloRepo.faindAll(id, limite, pagina);

    const mensaje: Mensaje = {
      msj: "Lista de capitulos",
      status: 200,
      Datos: datos,
    };
    return mensaje;
  }
}
