import dbQuery from "../db/dbConnection.js";


//Request es los que recoje la informacion que se envia, res es la respuesta que se envia
export const usersGet = async(req, res) => {
 
  let result;
  try {

    result =  await dbQuery("SELECT * FROM USUARIOS");

  }catch(e){
    return res.json({
      error: "Invalid query" ,
    });
  }
  

  res.json({

    msg:  result,
  });
};
