import mariadb from "mariadb";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Crear pool de conexiones ( conexion permanente)
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "pokedu",
});

// Funcion para realizar consultas a la base de datos
async function dbQuery(query) {
  let result = false;
  try {
    result = pool.query(query);
  } catch (e) {
    console.log("Fallo en la query", e);
  }
  return result;
}

export default dbQuery;
