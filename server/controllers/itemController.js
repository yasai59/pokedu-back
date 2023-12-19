import dbQuery from "../db/dbConnection.js";

export const itemsGet = async (req, res) => {
    let result;
    try {
      result = await dbQuery("SELECT * FROM ITEMS;");
    } catch (e) {
      return res.json({
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
        return res.json({
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
      return res.json({
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
      return res.json({
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
      return res.json({
        error: "Invalid query",
      });
    }
  
    res.json({
      msg: "ok",
    });
  };
