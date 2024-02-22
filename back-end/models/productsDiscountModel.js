const { DataTypes } = require("sequelize");
const db = require("../db");
const ProductRepository = require("./productsModel");
const UserRepository = require("./usersModel")

module.exports = db.define("productDiscounts", {
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

  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isGreaterThanStartDate() {
        if (this.startDate && this.endDate && this.endDate <= this.startDate) {
          throw new Error("A data final deve ser maior que a data inicial!");
        }
      },
    },
  },

  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      isGreaterThanStartTime() {
        if (this.startTime && this.endTime && this.endTime <= this.startTime) {
          throw new Error("O tempo final deve ser maior que o tempo inicial!");
        }
      },
    },
  },
});
