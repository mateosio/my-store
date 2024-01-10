const { Strategy } = require("passport-local");
const AuthService = require("../../../services/auth.service");

const service = new AuthService();

//el objeto que se pasa como primer argumento dentro de new Strategy es opcional y se usa para poder personalizar el nombre de la propiedad que se envía desde el frontend en el body al hacer el post en el endpoint "login" (o rapidApi cuando se hace la prueba). Por defecto cuando envian la información que se debe crear en el body con el metodo POST (en el objeto JSON) con la propiedad username y password (propiedades requeridas por passport para loguearse) podemos cambiarlas y que en lugar de esa propiedad username puedan poner la propiedad email o la que nosotros querramos.
const LocalStrategy = new Strategy({
  usernameField: "email",
  passwordField: "password"
},
  async (email, password, done)=>{
    try{
      const user = await service.getUser(email, password);
      done(null, user);

    } catch(error){
      done(error, false)
    };
});

module.exports = LocalStrategy;
