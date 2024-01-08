import dbQuery from "../db/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Request es los que recoje la informacion que se envia, res es la respuesta que se envia
export const usersGet = async (req, res) => {
  let result;
  try {
    result = await dbQuery("SELECT * FROM USUARIOS;");
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

export const studentsGet = async (req, res) => {
  let result;
  try {
    result = await dbQuery(
      "SELECT * FROM USUARIOS WHERE tipus = 'STUDENT_ROLE';"
    );
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

export const userDelete = async (req, res) => {
  const { userId } = req.body;
  let result;
  try {
    result = await dbQuery(`DELETE FROM USUARIOS WHERE id = '${userId}';`);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: "ok",
  });
};

export const userGet = async (req, res) => {
  const { userId } = req.query;

  let result;
  try {
    result = await dbQuery(`SELECT * FROM USUARIOS WHERE id = ${userId};`);
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

export const userPost = async (req, res) => {
  const { userUser, userPass, userName, userType } = req.body;
  const temp = req.body;

  const hashedPass = bcrypt.hashSync(userPass, 10);

  let result;
  try {
    result = await dbQuery(
      `INSERT INTO USUARIOS (user,pass,nom,tipus) VALUES ('${userUser}','${hashedPass}','${userName}','${userType}');`
    );
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: "ok",
  });
};

export const userPut = async (req, res) => {
  const { userId, userFoto, user, pass, nom, tipus } = req.body;

  const setClause = [];
  if (userFoto) setClause.push(`foto = '${userFoto}'`);
  if (user) setClause.push(`user = '${user}'`);
  if (pass) setClause.push(`pass = '${pass}'`);
  if (nom) setClause.push(`nom = '${nom}'`);
  if (tipus) setClause.push(`tipus = '${tipus}'`);

  if (setClause.length === 0) {
    return res.status(400).json({
      error: "No parameters provided for update",
    });
  }

  let result;
  try {
    result = await dbQuery(`
      UPDATE USUARIOS 
      SET ${setClause.join(', ')}
      WHERE id = '${userId}'
    `);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: "ok",
  });
};

export const login = async (req, res) => {
  const { userName, userPass } = req.body;

  let result;
  try {
    result = await dbQuery(
      `SELECT id, user, nom, pass, tipus FROM USUARIOS WHERE user = '${userName}'`
    );
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  if (result.length === 0) {
    return res.status(400).json({
      error: "Invalid user or password",
    });
  }

  let user = result[0];

  if (!bcrypt.compareSync(userPass, user.pass)) {
    return res.status(400).json({
      error: "Invalid user or password",
    });
  }
  const token = jwt.sign(user.id, process.env.SECRET);

  delete user.pass;
  res.json({
    user,
    token,
  });
};
