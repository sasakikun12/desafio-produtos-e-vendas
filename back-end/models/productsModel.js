const { DataTypes } = require("sequelize");
const db = require("../db");
const UserRepository = require("./usersModel");

module.exports = db.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
