const {Model, DataTypes, Sequelize} = require("sequelize");
const {CATEGORY_TABLE} = require("./category.model")

const PRODUCT_TABLE = "products";

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Product extends Model {
  //belongTo es porque el producto solo pertenece a una sola categoría. El as es un alías que va a tener la relación y vamos a usar en los servicios para hacer querys o peticiones anidadas.
  static associate (models){
    this.belongsTo(models.Category, {as: "category"})
  }

  static config (sequelize){
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false
    }

  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product}
