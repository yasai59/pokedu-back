import dbQuery from "../db/dbConnection.js";

//Querys de la tabla ACTIVITATS

//Obtener todas las actividades
export const activitiesGet = async (req, res) => {
  let result;
  try {
    result = await dbQuery("SELECT * FROM ACTIVITATS;");
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

export const activitiesGetByProject = async (req, res) => {
  const { projectId } = req.query;
  let result;
  try {
    result = await dbQuery(
      `SELECT * FROM ACTIVITATS WHERE projecte = ${projectId};`
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

//Borrar una actividad
export const activityDelete = async (req, res) => {
  const { activityId } = req.body;
  let result;
  try {
    result = await dbQuery(
      `DELETE FROM ACTIVITATS WHERE id = '${activityId}';`
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

//Obtener una actividad en concreto
export const activityGet = async (req, res) => {
  const { activityId } = req.query;

  let result;
  try {
    result = await dbQuery(
      `SELECT * FROM ACTIVITATS WHERE id = ${activityId};`
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

//Crear una actividad
export const activityPost = async (req, res) => {
  const {
    activityName,
    activityDataInici,
    activityDataFinal,
    activityProjectId,
  } = req.body;

  let result;
  try {
    result = await dbQuery(
      `INSERT INTO ACTIVITATS (nom, doc, \`data-inici\`, \`data-final\`, projecte) VALUES ('${activityName}',NULL,'${activityDataInici}','${activityDataFinal}','${activityProjectId}');`
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

//Editar una actividad
export const activityPut = async (req, res) => {
  const { activityId, activityDataFinal, activityDataInicio } = req.body;

  let result;
  try {
    result = await dbQuery(
      `UPDATE ACTIVITATS SET \`data-final\` = '${activityDataFinal}', \`data-inici\` = '${activityDataInicio}' WHERE id = '${activityId}'`
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

//Que actividades tiene un usuario en concreto y estan activas
export const currentActivityUserGet = async (req, res) => {
  const { userId } = req.query;
  let result;
  try {
    result = await dbQuery(`
        SELECT a.id AS id_actividad, a.nom AS nombre_actividad, a.\`data-inici\` AS fecha_inicio, a.\`data-final\` AS fecha_final
        FROM ACTIVITATS a
        JOIN NOTAS n ON a.id = n.activitat
        JOIN USUARIOS u ON n.alumne = u.id
        WHERE u.id = ${userId} AND a.\`data-final\` > NOW()
        ORDER BY a.\`data-inici\`;
      `);
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }
  res.json(result);
};

//Que actividades tiene un usuario en concreto y estan cerradas
export const finishedActivityUserGet = async (req, res) => {
  const { userId } = req.query;
  let result;
  try {
    result = await dbQuery(`
        SELECT a.id AS id_actividad, a.nom AS nombre_actividad, a.\`data-inici\` AS fecha_inicio, a.\`data-final\` AS fecha_final
        FROM ACTIVITATS a
        JOIN NOTAS n ON a.id = n.activitat
        JOIN USUARIOS u ON n.alumne = u.id
        WHERE u.id = ${userId} AND a.\`data-final\` <= NOW()
        ORDER BY a.\`data-inici\`;
      `);
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }
  res.json(result);
};

// Función para agregar nuevas entradas en la tabla NOTAS
export async function activityPostMassive(req, res) {
  const { activityId, projectId, skillId } = req.body;

  try {
    const alumnos = await obtenerAlumnosEnProyecto(projectId);

    const updatePromises = alumnos.map(async (alumno) => {
      const existingActivityQuery = `
        SELECT * FROM NOTAS
        WHERE activitat = ${activityId} AND alumne = ${alumno.id};
      `;

      const existingActivity = await dbQuery(existingActivityQuery);

      if (existingActivity.length > 0) {
        // Si ya existe la actividad, actualiza la skill
        const updateQuery = `
          UPDATE NOTAS
          SET item = ${skillId}
          WHERE activitat = ${activityId} AND alumne = ${alumno.id};
        `;
        await dbQuery(updateQuery);
      } else {
        // Si no existe la actividad, realiza la inserción
        const insertQuery = `
          INSERT INTO NOTAS (nota, activitat, alumne, item)
          VALUES (-1, ${activityId}, ${alumno.id}, ${skillId});
        `;
        await dbQuery(insertQuery);
      }
    });

    await Promise.all(updatePromises);
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }
  res.json({
    msg: "ok",
  });
}

async function obtenerAlumnosEnProyecto(projectId) {
  const query = `
    SELECT u.id
    FROM USUARIOS u
    JOIN USUARIOS_PROJECTES up ON u.id = up.alumne
    WHERE up.projecte = ${projectId};
  `;

  const results = await dbQuery(query);

  return results;
}
