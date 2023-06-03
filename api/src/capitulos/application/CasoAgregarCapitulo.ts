import { Mensaje } from "../../server/domain/mensaje.entity";
import { CapituloRepository } from "../domain/capitulo.repository";

import { ExtraerContenido } from "../domain/lib/ExtraeCapitulos";

export class CasoAgregarCapitulos {
  constructor(private readonly CapituloRepo: CapituloRepository) {}

  public async Run(id: string, url: string): Promise<Mensaje> {
    const Miurl = new URL(url);
    const cantidadPagina = Number(Miurl.searchParams.get("lcp_page0"));

    const capitulos = new ExtraerContenido();

    try {
      for (let i = cantidadPagina; i >= 1; i--) {
        Miurl.searchParams.set("lcp_page0", i.toString());
        console.log(
          "################### Capitulos de la Pagina",
          Miurl.href,
          " ##########################"
        );

        let nuevosCapitulos: any = await capitulos.ExtrarCapitulo(
          Miurl.href,
          id
        );

        await this.CapituloRepo.saveCapitulo(nuevosCapitulos);

        if (nuevosCapitulos == "faltan capitulos y clases") { 
          console.log(nuevosCapitulos);
          let mensaje: Mensaje = {        
            msj: "Faltan capitulos  y clases",
            status: 403,
          };
          return mensaje;
        }
      }

      console.log("#### Capitulos Guardados  ####");
      console.log("############################");
      let mensaje: Mensaje = { msj: "Capitulos guardandose", status: 200 };
      return mensaje;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
