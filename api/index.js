const express = require("express");
const routerApi = require("./routes/index");
const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require("./middlewares/error.handlers");
const cors = require("cors");
//Con el require del archivo auth se le dice a la aplicación que tiene que usar las estrategias de passport que esten definidas en el index
require("./utils/auth")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// app.get("/nueva-ruta", (req, res)=>{
  //   res.json({
    //     producto: "Puerta"
    //   })
    // });

    // const list = ["http://localhost:8080", "https://myapp.co"];
    // const options = {
    //   origin: (origin, callback) => {
    //     if(list.includes(origin) || !origin){
    //       callback(null, true);
    //     } else{
    //       callback(new Error("No permitido"));
    //     }
    //   }
    // };


    app.use(cors());

    // app.use(cors(options));

    app.get("/api", (req, res)=>{
      res.send("Hola server")
    });

    routerApi(app);

    app.use(logErrors);
    app.use(ormErrorHandler);
    app.use(boomErrorHandler);
    app.use(errorHandler);

    app.listen(port, ()=>{
      console.log("Server");
    });


