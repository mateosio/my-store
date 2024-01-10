const express = require("express")
const productRouter = require("./products.router");
const usersRouter = require("./users.router");
const categoriesRouter = require("./category.router");
const orderRouter = require("./orders.router");
const customerRouter = require("./customers.router");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");


function routerApi (app){
  const router = express.Router();

  app.use("/api/v1", router);
  router.use("/products", productRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customerRouter);
  router.use("/auth", authRouter);
  router.use("/profile", profileRouter);
};

module.exports = routerApi;
