import dbQuery from "../db/dbConnection.js";

export const activitiesGet = async (req, res) => {
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

export const activityDelete = async (req, res) => {
    const { activityId } = req.body;
    let result;
    try {
        result = await dbQuery(`DELETE FROM NOTAS WHERE id = '${activityId}';`);
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

export const activityGet = async (req, res) => {
    const { activityId } = req.body;
  
    let result;
    try {
      result = await dbQuery(`SELECT * FROM NOTAS WHERE id = ${activityId};`);
    } catch (e) {
      return res.status(400).json({
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: result,
    });
  };
  

  export const activityPost = async (req, res) => {
    const {activityName, activityDataInici, activityDataFinal, activityProjectId} = req.body;

    let result;
    try {
      result = await dbQuery(
        `INSERT INTO NOTAS (nom, doc, \`data-inici\`, \`data-final\`, projecte) VALUES ('${activityName}',NULL,'${activityDataInici}','${activityDataFinal}','${activityProjectId}');`
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

  export const activityPut = async (req, res) => {
    const { activityId, activityDataFinal } = req.body;
  
    let result;
    try {
      result = await dbQuery(
        `UPDATE NOTAS SET data-final = '${activityDataFinal}' WHERE id = '${activityId}'`
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
