const Joi = require("joi");

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required()
});

const createOrderSchema = Joi.object({
  customerId: customerId.required()
});

//schema para agregar un producto a una orden de compra, voy a necesitar a que orden agregarlo, que producto agregar y que cantidad.
const addItemSchema = Joi.object({
orderId: orderId.required(),
productId: productId.required(),
amount: amount.required(),
})

module.exports = {getOrderSchema, createOrderSchema, addItemSchema}
