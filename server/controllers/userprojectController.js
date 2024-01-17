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
    // Get the IDs of the notes associated with the project and student
    const noteIds = await dbQuery(
      `SELECT id FROM NOTAS WHERE alumne = '${user}' AND activitat IN (SELECT id FROM ACTIVITATS WHERE projecte = '${projecte}');`
    );

    // Delete the user-project relationship
    result = await dbQuery(
      `DELETE FROM USUARIOS_PROJECTES WHERE alumne = '${user}' AND projecte = '${projecte}';`
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        error: "Invalid query",
      });
    }
    // Delete all associated notes
    if (noteIds.length > 0) {
      await dbQuery(
        `DELETE FROM NOTAS WHERE id IN (${noteIds
          .map((note) => note.id)
          .join(",")});`
      );
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

// Crear un valor de la tabla USUARIOS_PROJECTES
export const userprojectPost = async (req, res) => {
  const { userprojectProjecte, userprojectAlumne } = req.body;

  let result;
  try {
    // Verificar si ya existe la relación usuario-proyecto
    const existingRelation = await dbQuery(
      `SELECT * FROM USUARIOS_PROJECTES WHERE alumne='${userprojectAlumne}' AND projecte='${userprojectProjecte}';`
    );

    if (existingRelation.length > 0) {
      // Si ya existe, no realizar la inserción y devolver un mensaje
      return res.status(400).json({
        error: "La relación ya existe",
      });
    }

    // Si no existe, realizar la inserción
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
    // Verificar si ya existen relaciones usuario-proyecto
    const existingRelations = await dbQuery(
      `SELECT * FROM USUARIOS_PROJECTES WHERE projecte='${userprojectProjecte}' AND alumne IN ('${userprojectAlumnes.join(
        "','"
      )}');`
    );

    if (existingRelations.length > 0) {
      // Filtrar los usuarios que ya existen en la base de datos
      const existingUsers = existingRelations.map(
        (relation) => relation.alumne
      );
      const duplicateUsers = userprojectAlumnes.filter((alumne) =>
        existingUsers.includes(alumne)
      );

      return res.status(400).json({
        error: `Algun alumno ya existe en el proyecto: ${duplicateUsers.join(
          ", "
        )}`,
      });
    }

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
