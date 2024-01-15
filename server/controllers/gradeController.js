import dbQuery from "../db/dbConnection.js";

//Querys de la tabla NOTAS

//Obtener todas las notas
export const gradesGet = async (req, res) => {
  let result;
  try {
    result = await dbQuery("SELECT * FROM NOTAS;");
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

//Borrar una nota
export const gradeDelete = async (req, res) => {
  const { gradeId } = req.body;
  let result;
  try {
    result = await dbQuery(`DELETE FROM NOTAS WHERE id = '${gradeId}';`);
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

//Obtener una nota en concreto
export const gradeGet = async (req, res) => {
  const { gradeId } = req.request;

  let result;
  try {
    result = await dbQuery(`SELECT * FROM NOTAS WHERE id = ${gradeId};`);
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result[0],
  });
};

//Crear una nota
export const gradePost = async (req, res) => {
  const { gradeNota, gradeActivitat, gradeAlumne, gradeItem } = req.body;

  let result;
  try {
    result = await dbQuery(
      `INSERT INTO NOTAS (nota, activitat, alumne, item) VALUES ('${gradeNota}','${gradeActivitat}','${gradeAlumne}','${gradeItem}');`
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

//Modificar una nota
export const gradePut = async (req, res) => {
  const { user, activityId, gradeNota } = req.body;

  let result;
  try {
    result = await dbQuery(
      `UPDATE NOTAS SET nota = '${gradeNota}' WHERE alumne = '${user}' AND activitat = '${activityId}';`
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
