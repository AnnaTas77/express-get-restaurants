const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/connection");

const Restaurant = db.define("restaurants", {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  cuisine: DataTypes.STRING,
});

module.exports = Restaurant;
