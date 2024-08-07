const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/connection");

const Menu = db.define("restaurants", {
  title: DataTypes.STRING,
});

module.exports = Menu;
