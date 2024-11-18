const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const GroceryItem = sequelize.define('GroceryItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = GroceryItem;
