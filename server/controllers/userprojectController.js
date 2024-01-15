import dbQuery from "../db/dbConnection.js";

//Querys de la tabla USUARIOS_PROJECTES

//Obtener todos los vlores de la tabla USUARIOS_PROJECTES
export const userprojectsGet = async (req, res) => {
  let result;
  try {
    result = await dbQuery("SELECT * FROM USUARIOS_PROJECTES;");
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

//Borrar un valor de la tabla USUARIOS_PROJECTES
export const userprojectDelete = async (req, res) => {
  const { user, projecte } = req.query;
  let result;
  try {
    result = await dbQuery(
      `DELETE FROM USUARIOS_PROJECTES WHERE alumne = '${user}' AND projecte = '${projecte}';`
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        error: "Invalid query",
      });
    }
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

//Obtener un valor de la tabla USUARIOS_PROJECTES
export const userprojectGet = async (req, res) => {
  const { userprojectId } = req.request;

  let result;
  try {
    result = await dbQuery(
      `SELECT * FROM USUARIOS_PROJECTES WHERE id = ${userprojectId};`
    );
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result[0],
  });
};

//Crear un valor de la tabla USUARIOS_PROJECTES
export const userprojectPost = async (req, res) => {
  const { userprojectProjecte, userprojectAlumne } = req.body;

  let result;
  try {
    result = await dbQuery(
      `INSERT INTO USUARIOS_PROJECTES (alumne, projecte) VALUES ('${userprojectAlumne}','${userprojectProjecte}');`
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

export const userprojectMultiplePost = async (req, res) => {
  const { userprojectProjecte, userprojectAlumnes } = req.body;

  if (!userprojectAlumnes || !userprojectProjecte)
    return res.status(400).json({
      error: "Invalid query",
    });

  if (!Array.isArray(userprojectAlumnes) || userprojectAlumnes.length === 0)
    return res.status(400).json({
      error: "Invalid query",
    });

  try {
    let str = userprojectAlumnes
      .map((alumne) => {
        return `('${alumne}','${userprojectProjecte}'),`;
      })
      .join("")
      .slice(0, -1);

    await dbQuery(
      `INSERT INTO USUARIOS_PROJECTES (alumne, projecte) VALUES ${str};`
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

//Modificar un valor de la tabla USUARIOS_PROJECTES
export const userprojectPut = async (req, res) => {
  const { userprojectId, userprojectProjecte, userprojectAlumne } = req.body;

  let result;
  try {
    result = await dbQuery(
      `UPDATE USUARIOS_PROJECTES SET alumne = '${userprojectAlumne}' WHERE id = '${userprojectId}'``UPDATE USUARIOS_PROJECTES SET projecte = '${userprojectProjecte}' WHERE id = '${userprojectId}'`
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
