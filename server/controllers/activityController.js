import dbQuery from "../db/dbConnection.js";

export const activitiesGet = async (req, res) => {
    let result;
    try {
      result = await dbQuery("SELECT * FROM ACTIVITATS;");
    } catch (e) {
      return res.json({
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
        result = await dbQuery(`DELETE FROM ACTIVITATS WHERE id = '${activityId}';`);
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

export const activityGet = async (req, res) => {
    const { activityId } = req.body;
  
    let result;
    try {
      result = await dbQuery(`SELECT * FROM ACTIVITATS WHERE id = ${activityId};`);
    } catch (e) {
      return res.json({
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: result,
    });
  };
  

  export const activityPost = async (req, res) => {
    const {activityName, activityPercentatge, activityFoto} = req.body;

    let result;
    try {
      result = await dbQuery(
        `INSERT INTO ACTIVITATS (nom,percentatge,foto) VALUES ('${activityName}','${activityPercentatge}','${activityFoto}');`
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
  };server/controllers/itemController.js

  export const activityPut = async (req, res) => {
    const { activityId, activityDataFinal } = req.body;
  
    let result;
    try {
      result = await dbQuery(
        `UPDATE ACTIVITATS SET data-final = '${activityDataFinal}' WHERE id = '${activityId}'`
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
