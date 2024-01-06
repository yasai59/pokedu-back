import dbQuery from "../db/dbConnection.js";

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

export const gradeGet = async (req, res) => {
    const { gradeId } = req.body;
  
    let result;
    try {
      result = await dbQuery(`SELECT * FROM NOTAS WHERE id = ${gradeId};`);
    } catch (e) {
      return res.status(400).json({
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: result,
    });
  };
  

  export const gradePost = async (req, res) => {
    const {gradeNota, gradeActivitat, gradeAlumne, gradeItem} = req.body;

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

  export const gradePut = async (req, res) => {
    const { gradeId, gradeNota } = req.body;
  
    let result;
    try {
      result = await dbQuery(
        `UPDATE NOTAS SET nota = '${gradeNota}' WHERE id = '${gradeId}'`
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
