import mariadb from "mariadb";

class DbConnection {
  constructor() {
    this.conn = mariadb.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });
  }
}

const dbConnection = new DbConnection();

export default dbConnection;
