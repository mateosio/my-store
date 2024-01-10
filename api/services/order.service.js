const boom = require('@hapi/boom');
const {models} = require("../libs/sequelize")

class OrderService {

  constructor(){
  }


  async create(userId) {
    const customer = await models.Customer.findOne({
      where: {
        "userId": userId
      }
    });

    if(!customer){
      throw boom.notFound("Customer dont have orders")
    };

    const dataOrder = {
      customerId: customer.id
    };

    const newOrder = await models.Order.create(dataOrder)
    return newOrder;
  };

  async addProduct(data){
    const newItem = await models.OrderProduct.create(data)
    return newItem;
  };

  async find() {
    return [];
  };

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        "$customer.user.id$": userId
      },
      include: [
        {
          association: "customer",
          include: ["user"]
        },
      ]
    })
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"]
        },
        "items"
      ]
    })
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
