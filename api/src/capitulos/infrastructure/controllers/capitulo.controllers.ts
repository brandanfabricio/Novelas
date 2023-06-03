import { Request, Response } from "express";
import { CasoAgregarCapitulos, CasoListarCapitulos } from "../../application";

export class CapituloController {
  constructor(
    private readonly listar: CasoListarCapitulos,
    private readonly agregarCap: CasoAgregarCapitulos
  ) {}

  public ListarCapitulos = async (req: Request, res: Response) => {
    const { id } = req.params;

    const qry = req.query;
    // limite = qry.limite || "5";
    // pagina = qry.pagina || "0";
    let limite = Number(qry.limite);
    let pagina = Number(qry.pagina) - 1;

    // console.log(typeof(limite))
    // console.log(typeof(pagina))
    const msj = await this.listar.Run(id,limite,pagina);

    res.status(msj.status || 404).json(msj);
  };
  public AgregarCapitulo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { url } = req.body;

    const msj = await this.agregarCap.Run(id, url);

    res.status(msj.status || 404).json(msj);
  };
}
