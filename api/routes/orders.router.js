const express = require('express');
const passport = require("passport");

const OrderService = require("../services/order.service");
const validatorHandler = require("../middlewares/validatorHandler");
const {getOrderSchema, createOrderSchema, addItemSchema} = require("../schemas/order.schema");

const router = express.Router();
const service = new OrderService();

router.get("/:id",
validatorHandler(getOrderSchema, "params"),
async(req, res, next) =>{
 try {
  const {id} = req.params;
  const product = await service.findOne(id);
  res.json(product);
 } catch (error) {
  next(error)
 }
});

router.post('/',
// validatorHandler(createOrderSchema, "body"),
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try{
      const user = req.user;

      res.status(201).json(await service.create(user.sub));
    } catch(error){
      next(error)
    }
});

router.post('/add-item',
validatorHandler(addItemSchema, "body"),
async (req, res, next) => {
  try{
    const body = req.body;
    const newItem = await service.addProduct(body);
    res.status(201).json(newItem);
  } catch(error){
    next(error)
  }
});

module.exports = router;
