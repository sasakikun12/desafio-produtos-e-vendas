const { DataTypes } = require("sequelize");
const db = require("../db");
const UserRepository = require("./usersModel");
const ProductRepository = require("./productsModel");

module.exports = db.define("sales", {
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
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserRepository,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  saleDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
});
