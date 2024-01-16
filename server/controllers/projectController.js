import dbQuery from "../db/dbConnection.js";

//Querys de la tabla PROJECTES

//Obtener todos los projectos
export const projectsGet = async (req, res) => {
  let result;
  try {
    result = await dbQuery("SELECT * FROM PROJECTES;");
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

//Borrar un projecto
export const projectDelete = async (req, res) => {
  const { projectId } = req.query;
  let result;
  try {
    result = await dbQuery(`DELETE FROM PROJECTES WHERE id = '${projectId}';`);
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

//Obtener un projecto en concreto
export const projectGet = async (req, res) => {
  const { projectId } = req.query;

  let result;
  try {
    result = await dbQuery(`SELECT * FROM PROJECTES WHERE id = ${projectId};`);
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result[0],
  });
};

export const projectActivityGet = async (req, res) => {
  const { activityId } = req.query;

  try {
    const projectInfoQuery = `
      SELECT PROJECTES.*
      FROM ACTIVITATS
      JOIN PROJECTES ON ACTIVITATS.projecte = PROJECTES.id
      WHERE ACTIVITATS.id = ${activityId};
    `;
    const projectInfoResult = await dbQuery(projectInfoQuery);

    if (projectInfoResult.length === 0) {
      return res.status(404).json({
        error: "No se encontró información del proyecto asociado a la actividad.",
      });
    }

    res.json({
      msg: projectInfoResult[0],
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

//Crear un projecto
export const projectPost = async (req, res) => {
  const { projectName } = req.body;

  let result;
  try {
    result = await dbQuery(
      `INSERT INTO PROJECTES (nom) VALUES ('${projectName}');`
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

//Modificar un projecto
export const projectPut = async (req, res) => {
  const { projectId, projectName } = req.body;

  let result;
  try {
    result = await dbQuery(
      `UPDATE PROJECTES SET nom = '${projectName}' WHERE id = '${projectId}'`
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

//Conseguir todos los projectos de un usuario
export const projectUserGet = async (req, res) => {
  const { userId } = req.query;

  let result;
  try {
    result = await dbQuery(
      ` SELECT p.*
        FROM PROJECTES p
        JOIN USUARIOS_PROJECTES up ON p.id = up.projecte
        WHERE up.alumne = '${userId}' GROUP BY p.id;
        `
    );
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};
