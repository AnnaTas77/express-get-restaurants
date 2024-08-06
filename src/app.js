const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/restaurants", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();

  res.status(200).send(allRestaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;

  const currentRestaurant = await Restaurant.findByPk(restaurantId);

  res.json(currentRestaurant);
});

app.post("/restaurants", async (req, res) => {
  const createNewRestaurant = await Restaurant.create(req.body);
  res.json(createNewRestaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  let restaurantId = req.params.id;
  let updateObject = req.body;
  const updatedRestaurant = await Restaurant.update(updateObject, {
    where: { id: restaurantId },
  });
  res.json(updatedRestaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  let restaurantId = req.params.id;
  const deletedRestaurant = await Restaurant.destroy({
    where: { id: restaurantId },
  });
  res.json(deletedRestaurant);
});

module.exports = app;
