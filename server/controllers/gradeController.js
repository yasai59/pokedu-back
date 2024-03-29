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
  const { gradeId } = req.query;
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
// Obtener las notas de una actividad
export const gradeActGet = async (req, res) => {
  const { alumno, actividad } = req.query;

  let result;
  try {
    result = await dbQuery(
      `SELECT nota FROM NOTAS WHERE alumne = '${alumno}' AND activitat = '${actividad}' AND nota != -1;`
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

// Obtener las notas de un item
export const gradeItemGet = async (req, res) => {
  const { alumno, item } = req.query;

  let result;
  try {
    result = await dbQuery(
      `SELECT AVG(nota) as nota FROM NOTAS WHERE alumne = '${alumno}' AND item = '${item}' AND nota != '-1';`
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

// Corregir de forma masiva las notas de una actividad
export const gradePutMassive = async (req, res) => {
  const { activityId, marks } = req.body;

  let promises = [];
  try {
    const keys = Object.keys(marks);
    keys.forEach((key) => {
      promises.push(
        dbQuery(
          `UPDATE NOTAS SET nota = '${marks[key]}' WHERE alumne = '${key}' AND activitat = '${activityId}';`
        )
      );
    });
    await Promise.all(promises);
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
