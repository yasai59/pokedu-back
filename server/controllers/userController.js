import dbQuery from "../db/dbConnection.js";


//Request es los que recoje la informacion que se envia, res es la respuesta que se envia
export const usersGet = async(req, res) => {

  
  let result;
  try {

    result =  await dbQuery("SELECT * FROM USUARIOS;");

  }catch(e){
    return res.json({
      error: "Invalid query" ,
    });
  }
  

  res.json({

    msg:  result,
  });
};


export const userGet = async(req, res) => {

  const { userId } = req.body;
  
  let result;
  try {

    result =  await dbQuery(`DELTE FROM USUARIOS WHERE ID = ${userId};`);

  }catch(e){
    return res.json({
      error: "Invalid query" ,
    });
  }
  

  res.json({

    msg:  result,
  });
};


export const userDelGet = async(req, res) => {

  const { userId } = req.body;
  
  let result;
  try {

    result =  await dbQuery(`SELECT * FROM USUARIOS WHERE ID = ${userId};`);

  }catch(e){
    return res.json({
      error: "Invalid query" ,
    });
  }
  

  res.json({

    msg:  result,
  });
};

export const userInsGet = async(req, res) => {

  const {userUser,userPass, userName,userType } = req.body
  
  let result;
  try {

    result =  await dbQuery(`INSERT INTO USUARIOS (USUARIO,CONTRASEÑA,NOMBRE,TIPO) VALUES (${userUser},${userPass},${userName},${userType});`);

  }catch(e){
    return res.json({
      error: "Invalid query" ,
    });
  }
  

  res.json({

    msg:  result,
  });
};

export const userAlterGet = async(req, res) => {

  const {userId, userFoto } = req.body
  
  let result;
  try {

    result =  await dbQuery(`ALTER TABLE USUARIOS SET FOTO = ${userFoto} WHERE ID = ${userId}`);

  }catch(e){
    return res.json({
      error: "Invalid query" ,
    });
  }
  

  res.json({

    msg:  result,
  });
};

