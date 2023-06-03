import { DataTypes } from "sequelize";
import { db } from "../db";

const Novela = db.define(
  "novelas",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    url: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.TEXT },
    paginas: { type: DataTypes.STRING }
  },
  {
    timestamps: false,
  }
);

export default Novela;
