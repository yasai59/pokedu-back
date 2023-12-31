import dbQuery from "../db/dbConnection.js";

//Querys de la tabla USUARIOS_PROJECTES

//Obtener todos los vlores de la tabla USUARIOS_PROJECTES
export const gradeprojectsGet = async (req, res) => {
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
export const gradeprojectDelete = async (req, res) => {
    const { gradeprojectId } = req.body;
    let result;
    try {
        result = await dbQuery(`DELETE FROM USUARIOS_PROJECTES WHERE id = '${gradeprojectId}';`);
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
export const gradeprojectGet = async (req, res) => {
    const { gradeprojectId } = req.request;
  
    let result;
    try {
      result = await dbQuery(`SELECT * FROM USUARIOS_PROJECTES WHERE id = ${gradeprojectId};`);
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
  export const gradeprojectPost = async (req, res) => {
    const {gradeprojectProjecte,gradeprojectAlumne} = req.body;

    let result;
    try {
      result = await dbQuery(
        `INSERT INTO USUARIOS_PROJECTES (alumne, projecte) VALUES ('${gradeprojectAlumne}','${gradeprojectProjecte}');`
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
  export const gradeprojectPut = async (req, res) => {
    const { gradeprojectId, gradeprojectProjecte,gradeprojectAlumne } = req.body;
  
    let result;
    try {
      result = await dbQuery(
        `UPDATE USUARIOS_PROJECTES SET alumne = '${gradeprojectAlumne}' WHERE id = '${gradeprojectId}'`
        `UPDATE USUARIOS_PROJECTES SET projecte = '${gradeprojectProjecte}' WHERE id = '${gradeprojectId}'`
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
