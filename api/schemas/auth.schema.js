const Joi = require("joi");

const email = Joi.string().email();
const password = Joi.string().min(8);


const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const recoveryAuthSchema = Joi.object({
  email: email.required(),
})

module.exports = {loginAuthSchema, recoveryAuthSchema}
