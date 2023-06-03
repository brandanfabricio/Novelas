import { Response, Request } from "express";
import {
  CasoAgregarNovela,
  CasoNovelaPorId,
  CasoNovelaPorNombre,
  CasoTodasLasNovelas,
} from "../../application";
export class NovelaController {
  constructor(
    private readonly listarNovelas: CasoTodasLasNovelas,
    private readonly porId: CasoNovelaPorId,
    private readonly porNombre: CasoNovelaPorNombre,
    private readonly agregarNovela: CasoAgregarNovela
  ) {}

  public ListaNovelas = async (req: Request, res: Response) => {
    const msj = await this.listarNovelas.Run();
    res.status(msj.status || 404).json(msj);
  };

  public NovelaPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const msj = await this.porId.Run(id);
    res.status(msj.status || 404).json(msj);
  };
  public NovelaPorNombre = async (req: Request, res: Response) => {
    const { titulo } = req.body;
    const msj = await this.porNombre.Run(titulo);
    res.status(msj.status || 404).json(msj);
  };

  public AgregarNovela = async (req: Request, res: Response) => {
    const { url } = req.body;
    const msj = await this.agregarNovela.Run(url);
    res.status(msj.status || 404).json(msj);
  };
}
