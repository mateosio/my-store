const boom = require("@hapi/boom");

function checkAdminRole(req, res, next){
  const user = req.user;

  if(user.role === "admin"){
    next();
  }else{
    next(boom.unauthorized());
  }
};

function checkRoles(...roles){
//Esto es un scope, función que retorna otra función (en este caso un middleware).
//El spread operator transforma los datos que reciba en el argumento a un array. Es decir guarda lo que viene dentro de un array.
  return (req, res, next)=>{
    const user = req.user;

    if(roles.includes(user.role)){
      next();
    }else{
      next(boom.unauthorized());
  }
  }

};

module.exports = {checkAdminRole, checkRoles};
