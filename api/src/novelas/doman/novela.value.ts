import { NovelaEntity } from "./novelas.entity";
import { v4 as uuid } from "uuid";

export class Novela implements NovelaEntity {
  id: string;
  titulo: string;
  imagen: string;
  url: string;
  descripcion: string;
  paginas: string;

  constructor({ titulo, imagen, url, descripcion, paginas }: NovelaEntity) {
    this.id = uuid();
    this.titulo = titulo;
    this.imagen = imagen;
    this.url = url;
    this.descripcion = descripcion;
    this.paginas = paginas;
  }
}
