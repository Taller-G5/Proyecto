'use strict'
function isAuth(req,res,next){
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== "undefined"){
    const token = bearerHeader.split(" ")[1];
    if(token != undefined){
        next();
    }
    else{
      return res.json({
        success:false,
        message:"No tiene permisos para estas acciones."
      })
    }
  }
  else{
    return res.json({
      success:false,
      message:"No ha iniciado Sesion."
    })
  }
}
module.exports = isAuth
