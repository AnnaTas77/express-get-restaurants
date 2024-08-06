const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();

  res.status(200).send(allRestaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;

  const currentRestaurant = await Restaurant.findByPk(restaurantId);

  res.json(currentRestaurant);
});

module.exports = app;
