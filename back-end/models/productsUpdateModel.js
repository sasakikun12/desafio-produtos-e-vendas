const { DataTypes } = require("sequelize");
const db = require("../db");
const UserRepository = require("./usersModel");
const ProductRepository = require("./productsModel");

module.exports = db.define("productUpdate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductRepository,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserRepository,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  oldValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  newValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
