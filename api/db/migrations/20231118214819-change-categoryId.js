'use strict';
const { PRODUCT_TABLE, ProductSchema } = require("../models/product.model");
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PRODUCT_TABLE, "categoryId", {
      field: 'category_id',
      allowNull: false,
      type: DataTypes.INTEGER,
    })
  },

  async down (queryInterface, Sequelize) {

  }
};
