import { DataTypes } from "sequelize";
import { db } from "../db";
import Novela from "./novela";

const Capitulo = db.define(
  "capitulo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    cap: {
      type: DataTypes.STRING,
    },
    titulo: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      defaultValue: false,
    },
    Ncap: {
      type: DataTypes.INTEGER,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

Novela.hasMany(Capitulo, {
  foreignKey: "novelaId",
  sourceKey: "id",
});

Capitulo.belongsTo(Novela, {
  foreignKey: "novelaId",
  targetKey: "id",
});

export default Capitulo;
