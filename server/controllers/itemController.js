import dbQuery from "../db/dbConnection.js";

export const itemsGet = async (req, res) => {
    let result;
    try {
      result = await dbQuery("SELECT * FROM ITEMS;");
    } catch (e) {
      return res.status(400).json(
        {
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: result,
    });
};

export const itemDelete = async (req, res) => {
    const { itemId } = req.body;
    let result;
    try {
        result = await dbQuery(`DELETE FROM ITEMS WHERE id = '${itemId}';`);
    } catch (e) {
        console.log(e);
        return res.status(400).json(
          
{
        error: "Invalid query",
        });
    }

    res.json({
        msg: "ok",
      });
};

export const itemGet = async (req, res) => {
    const { itemId } = req.body;
  
    let result;
    try {
      result = await dbQuery(`SELECT * FROM ITEMS WHERE id = ${itemId};`);
    } catch (e) {
      return res.status(400).json(
        {
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: result,
    });
  };
  
  export const itemsProjectGet = async (req, res) => {
    const { projectId } = req.body;
  
    let result;
    try {
      result = await dbQuery(`SELECT i.*
      FROM ITEMS i
      JOIN NOTAS n ON i.id = n.item
      JOIN ACTIVITATS a ON n.activitat = a.id
      JOIN USUARIOS_PROJECTES up ON a.projecte = up.projecte
      JOIN PROJECTES p ON up.projecte = p.id
      WHERE p.id = ${projectId};
      `);
    } catch (e) {
      return res.status(400).json(
        {
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: result,
    });
  };
  

  export const itemPost = async (req, res) => {
    const {itemName, itemPercentatge, itemFoto} = req.body;

    let result;
    try {
      result = await dbQuery(
        `INSERT INTO ITEMS (nom,percentatge,foto) VALUES ('${itemName}','${itemPercentatge}','${itemFoto}');`
      );
    } catch (e) {
      console.log(e);
      return res.status(400).json(
        {
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: "ok",
    });
  };

  export const itemPut = async (req, res) => {
    const { itemId, itemFoto } = req.body;
  
    let result;
    try {
      result = await dbQuery(
        `UPDATE ITEMS SET foto = '${itemFoto}' WHERE id = '${itemId}'`
      );
    } catch (e) {
      console.log(e);
      return res.status(400).json(
        {
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: "ok",
    });
  };
