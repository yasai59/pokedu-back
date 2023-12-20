import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoute.js";
import projectRoute from "../routes/projectRoute.js";
import itemRoute from "../routes/itemRoute.js";
import activityRoute from "../routes/activityRoute.js";
export default class Server {

  constructor() {

    // inicializar express
    this.app = express();

    // definir variables del servidor
    this.port = process.env.PORT;
    this.userPath = "/api/users";
    this.projectPath = "/api/projects";
    this.itemPath = "/api/items";
    this.activityPath = "/api/activities";

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
    this.app.use(this.projectPath, projectRoute);
    this.app.use(this.itemPath, itemRoute);
    this.app.use(this.activityPath, activityRoute);
  }
  // Aviso log esta escuchando en el puerto
  async listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto: ${this.port} 🚀`);
    });
  }
}
