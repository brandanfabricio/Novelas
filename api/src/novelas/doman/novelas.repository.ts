import { NovelaEntity } from "./novelas.entity";

export interface novelaRepository {
  findAll(): Promise<any>;
  findById(id: string): Promise<any>;
  findByName(titulo: string): Promise<any>;
  save(novela:NovelaEntity):void;
  existe(titulo:string,url:string):Promise<any>
}
