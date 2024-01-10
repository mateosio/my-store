const {boom} = require("@hapi/boom");
const {models} = require("../libs/sequelize");
const bcrypt = require("bcrypt");

class CustomerService {

  constructor(){

  }

  async find(){
      const rta = await models.Customer.findAll();
      return rta;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound("cutomer not found")
    }
    return customer;
}

  async create(data){
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ["user"]
    });

    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes){
    const model = await this.findOne(id);
    const rta = model.update(changes);
    return rta;
  }

  async delete(id){
    const model = await this.findOne(id);
    await model.destroy();
    return {rta: true}
  }
}

module.exports = CustomerService;
