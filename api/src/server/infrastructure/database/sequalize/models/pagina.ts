import { DataTypes } from "sequelize";
import { db } from "../db";
import Novela from "./novela";

const Pagina = db.define(
  "pagina",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pagina: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

Novela.hasMany(Pagina, {
  foreignKey: "novelaId",
  sourceKey: "id",
});

Pagina.belongsTo(Novela, {
  foreignKey: "novelaId",
  targetKey: "id",
});

export default Pagina;
