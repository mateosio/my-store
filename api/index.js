const express = require("express");
const routerApi = require("./routes");
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require("./middlewares/error.handlers");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const list = ["http://localhost:8080", "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    if (list.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
};

app.use(cors(options));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal, sirve frontend.html desde la carpeta "api"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "api", "frontend.html"));
});

// Ruta de la API
app.get("/api", (req, res) => {
  res.send("Hola server");
});

// Rutas adicionales de la API
routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require("express");
// const routerApi = require("./routes");
// const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require("./middlewares/error.handlers");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());


// // app.get("/nueva-ruta", (req, res)=>{
//   //   res.json({
//     //     producto: "Puerta"
//     //   })
//     // });

//     const list = ["http://localhost:8080", "https://myapp.co"];
//     const options = {
//       origin: (origin, callback) => {
//         if(list.includes(origin) || !origin){
//           callback(null, true);
//         } else{
//           callback(new Error("No permitido"));
//         }
//       }
//     };


//     app.use(cors(options));

//     app.get("/api", (req, res)=>{
//       res.send("Hola server")
//     });

//     routerApi(app);

//     app.use(logErrors);
//     app.use(ormErrorHandler);
//     app.use(boomErrorHandler);
//     app.use(errorHandler);

//     app.listen(port, ()=>{
//       console.log("Server");
//     });


