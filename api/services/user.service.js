const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {

  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    })
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const data = await models.User.findAll({
      includes: ["customer"]
    });
    return data ;
  }

  async findByEmail(email) {
    const data = await models.User.findOne({
      where: {email}
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
