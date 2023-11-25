const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize");

class UserService {
  constructor() {

  }

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async find() {
    const data = await models.User.findAll({
      includes: ["customer"]
    });
    return data ;
  }

  async findOne(id) {
    const data = await models.User.findByPk(id);
    if(!data){
      throw boom.notFound("User not found")
    }else{
      return data;
    }
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);

    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy(id);
    return { id };
  }
}

module.exports = UserService;
