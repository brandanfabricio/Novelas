import { Op } from "sequelize";
import { novelaRepository } from "../../doman/novelas.repository";
import Novelas from "../../../server/infrastructure/database/sequalize/models/novela";
import { NovelaEntity } from "../../doman/novelas.entity";

export class MysqlRepository implements novelaRepository {
  async existe(titulo: string, url: string): Promise<any> {
    const dato = await Novelas.findAll({
      where: {
        titulo: titulo,
        url: url,
      },
    });
    return Promise.resolve(dato);
  }
  async save(novela: NovelaEntity): Promise<void> {
    await Novelas.create({
      id: novela.id,
      titulo: novela.titulo,
      imagen: novela.imagen,
      url: novela.url,
      descripcion: novela.descripcion,
      paginas:novela.paginas
    });
  }
  async findById(id: string): Promise<any> {
    const datos = await Novelas.findByPk(id);
    return Promise.resolve(datos);
  }
  async findByName(name: string): Promise<any> {
    const datos = await Novelas.findAll({
      where: {
        titulo: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    return Promise.resolve(datos);
  }
  async findAll(): Promise<any> {
    const datos = await Novelas.findAll();
    return Promise.resolve(datos);
  }
}
