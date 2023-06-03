import { MysqlDBConfig } from "../../config";

import { Sequelize } from "sequelize";


export const db = new Sequelize(
  MysqlDBConfig.database,
  MysqlDBConfig.user,
  MysqlDBConfig.password,
  {
    host: MysqlDBConfig.host,
    port: MysqlDBConfig.port,
    dialect: "mysql",
  }
);

db.sync({ force: false }).then(() => {
  console.log("Tabalas Sincronizada");
});
