import dbQuery from "../db/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Request es los que recoje la informacion que se envia, res es la respuesta que se envia
export const usersGet = async (req, res) => {
  let result;
  try {
    result = await dbQuery("SELECT * FROM USUARIOS;");
  } catch (e) {
    return res.json({
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
    result = await dbQuery(`DELETE FROM USUARIOS WHERE Id = '${userId}';`);
  } catch (e) {
    console.log(e);
    return res.json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: "ok",
  });
};

export const userGet = async (req, res) => {
  const { userId } = req.body;

  let result;
  try {
    result = await dbQuery(`SELECT * FROM USUARIOS WHERE Id = ${userId};`);
  } catch (e) {
    return res.json({
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
      `INSERT INTO USUARIOS (User,Pass,Nom,Tipus) VALUES ('${userUser}','${hashedPass}','${userName}','${userType}');`
    );
  } catch (e) {
    console.log(e);
    return res.json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: "ok",
  });
};

export const userPut = async (req, res) => {
  const { userId, userFoto } = req.body;

  let result;
  try {
    result = await dbQuery(
      `UPDATE USUARIOS SET Foto = '${userFoto}' WHERE Id = '${userId}'`
    );
  } catch (e) {
    console.log(e);
    return res.json({
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
      `SELECT Id, User, Nom, Pass FROM USUARIOS WHERE User = '${userName}'`
    );
  } catch (e) {
    return res.json({
      error: "Invalid query",
    });
  }

  if (result.length === 0) {
    return res.status(400).json({
      error: "Invalid user or password",
    });
  }

  let user = result[0];

  if (!bcrypt.compareSync(userPass, user.Pass)) {
    return res.status(400).json({
      error: "Invalid user or password",
    });
  }
  const token = jwt.sign(user.Id, process.env.SECRET);

  delete user.Pass;
  res.json({
    user,
    token,
  });
};
