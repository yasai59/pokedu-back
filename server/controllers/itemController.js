import dbQuery from "../db/dbConnection.js";

//Querys de la tabla ITEMS

//Obtener todos los items
export const itemsGet = async (req, res) => {
  let result;
  try {
    result = await dbQuery("SELECT * FROM ITEMS;");
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

//Obtener un item en concreto de una actividd
export const itemActivityGet = async (req, res) => {
  const { activityid } = req.query;

  let result;
  try {
    result = await dbQuery(
      `SELECT item FROM NOTAS WHERE activitat = ${activityid};`
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

//Borrar un item
export const itemDelete = async (req, res) => {
  const { itemId } = req.query;
  let result;
  try {
    result = await dbQuery(`DELETE FROM ITEMS WHERE id = '${itemId}';`);
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

//Obtener un item en concreto
export const itemGet = async (req, res) => {
  const { itemId } = req.query;

  let result;
  try {
    result = await dbQuery(`SELECT * FROM ITEMS WHERE id = ${itemId};`);
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result[0],
  });
};

//Conseguir todos los items de un projecto
export const itemsProjectGet = async (req, res) => {
  const { projectId } = req.query;
  let result;
  try {
    result = await dbQuery(`SELECT i.*
      FROM ITEMS i
      JOIN NOTAS n ON i.id = n.item
      JOIN ACTIVITATS a ON n.activitat = a.id
      JOIN USUARIOS_PROJECTES up ON a.projecte = up.projecte
      JOIN PROJECTES p ON up.projecte = p.id
      WHERE p.id = ${projectId} GROUP BY i.id;
      `);
  } catch (e) {
    return res.status(400).json({
      error: "Invalid query",
    });
  }

  res.json({
    msg: result,
  });
};

//Crear un item
export const itemPost = async (req, res) => {
  const { itemName, itemPercentatge, itemFoto } = req.body;

  let result;
  try {
    result = await dbQuery(
      `INSERT INTO ITEMS (nom,percentatge,foto) VALUES ('${itemName}','${itemPercentatge}','${itemFoto}');`
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

// Editar un item
export const itemPut = async (req, res) => {
  const { itemId, itemNom, itemPercentatge, itemFoto } = req.body;

  // Verificar que se proporciona al menos un campo para actualizar
  if (!itemId || (!itemNom && !itemPercentatge && !itemFoto)) {
    return res.status(400).json({
      error: "Se requiere al menos un campo para actualizar",
    });
  }

  // Construir la consulta SQL basada en los campos proporcionados
  let sqlQuery = "UPDATE ITEMS SET ";
  if (itemNom) sqlQuery += `nom = '${itemNom}', `;
  if (itemPercentatge) sqlQuery += `percentatge = '${itemPercentatge}', `;
  if (itemFoto) sqlQuery += `foto = '${itemFoto}', `;

  // Eliminar la coma adicional al final de la consulta
  sqlQuery = sqlQuery.slice(0, -2);

  // Agregar la condición WHERE
  sqlQuery += ` WHERE id = '${itemId}'`;

  let result;
  try {
    result = await dbQuery(sqlQuery);
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

