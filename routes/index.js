const express = require("express")
const productRouter = require("./products");
const usersRouter = require("./users");


function routerApi (app){
  const router = express.Router();

  app.use("/api/v1", router);
  router.use("/products", productRouter);
  // router.use("/category", categoryRouter);
  // router.use("/users", usersRouter);
};

module.exports = routerApi;
