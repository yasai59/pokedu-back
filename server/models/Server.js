import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoute.js";

export default class Server {

  constructor() {

    // inicializar express
    this.app = express();

    // definir variables del servidor
    this.port = process.env.PORT;
    this.userPath = "/api/users";

    // cargar middlewares y rutas
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.userPath, userRoutes);
  }
  // Aviso log esta escuchando en el puerto
  async listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto: ${this.port} 🚀`);
    });
  }
}
