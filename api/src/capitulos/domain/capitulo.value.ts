import { CapituloEntity } from "./capitulo.entity";

export class Capituilo implements CapituloEntity {
  cap: string;
  titulo: string;
  contenido: string;
  Ncap: number;
  novelaId: string;

  constructor({ cap, titulo, contenido, Ncap, novelaId }: CapituloEntity) {
    this.cap = cap;
    this.titulo = titulo;
    this.contenido = contenido.split(".").join(".<br><br>");
    this.Ncap = Ncap;
    this.novelaId = novelaId;
  }
}
