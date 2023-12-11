import dotenv from "dotenv";
import Server from "./server/models/Server.js";

dotenv.config();

const server = new Server();
server.listen();
