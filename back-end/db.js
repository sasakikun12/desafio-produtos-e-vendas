const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.PGDATABASE;
const dbUser = process.env.PGUSER;
const dbHost = process.env.PGHOST;
const dbPassword = process.env.PGPASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost,
});

module.exports = sequelize;
