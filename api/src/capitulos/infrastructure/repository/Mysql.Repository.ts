import { CapituloRepository } from "../../domain/capitulo.repository";
import Capitulo from "../../../server/infrastructure/database/sequalize/models/capitulos";
import Novela from "../../../server/infrastructure/database/sequalize/models/novela";
import { CapituloEntity } from "../../domain/capitulo.entity";

export class MysqlCapituloRepository implements CapituloRepository {
  async saveCapitulo(dato: any): Promise<void> {
    // console.log(dato);
    await Capitulo.bulkCreate(dato);
  }
  async faindAll(id: string, limite: number, pagina: number): Promise<any> {
    const [novela, { count, rows }] = await Promise.all([
      Novela.findByPk(id),
      Capitulo.findAndCountAll({
        where: {
          novelaId: id,
        },
        limit: limite,
        offset: pagina,
      }),
    ]);
    const dato = {
      novela,
      count,
      rows,
    };
    // console.log(dato);
    return Promise.resolve(dato);
  }
}
