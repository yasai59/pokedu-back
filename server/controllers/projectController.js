import dbQuery from "../db/dbConnection.js";

export const projectsGet = async (req, res) => {
    let result;
    try {
      result = await dbQuery("SELECT * FROM PROJECTES;");
    } catch (e) {
      return res.json({
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: result,
    });
};

export const projectDelete = async (req, res) => {
    const { projectId } = req.body;
    let result;
    try {
        result = await dbQuery(`DELETE FROM PROJECTES WHERE id = '${projectId}';`);
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

export const projectGet = async (req, res) => {
    const { projectId } = req.body;
  
    let result;
    try {
      result = await dbQuery(`SELECT * FROM PROJECTES WHERE id = ${projectId};`);
    } catch (e) {
      return res.json({
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: result,
    });
  };
  

  export const projectPost = async (req, res) => {
    const { projectName} = req.body;

    let result;
    try {
      result = await dbQuery(
        `INSERT INTO PROJECTES (nom) VALUES ('${projectName}');`
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

  export const projectPut = async (req, res) => {
    const { projectId, projectName } = req.body;
  
    let result;
    try {
      result = await dbQuery(
        `UPDATE PROJECTES SET nom = '${projectName}' WHERE id = '${projectId}'`
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
