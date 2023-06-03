import express from "express";
import cors from "cors";
import morgan from "morgan";
import RutasExpress from "./infrastructure/router";

import { PORT } from "./infrastructure/config";

//
export default class Servidor {
  private app = express();
  private PORT: Number = PORT;

  constructor() {
    this.middleware();
    this.Rutas();
    this.ConectarDB();
  }

  private Rutas(): void {
    this.app.use(RutasExpress);
    // // this.app.get("/", (req, res) => {
    // //     res.send("Hola");
    // // });
  }
  private ConectarDB(): void {
    require("./infrastructure/database/sequalize/db");
  }
  private middleware(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }
  Start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`[APP] Servidor andando en el puerto', ${this.PORT} 🛩️✈️✈️`);
    });
  }
}
