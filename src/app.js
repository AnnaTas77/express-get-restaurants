const express = require("express");
const app = express();
const { Restaurant } = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/restaurants", async (req, res) => {
  try {
    const allRestaurants = await Restaurant.findAll();
    // const allRestaurants = await Restaurant.findAll({
    //   include: [
    //     {
    //       model: Menu,
    //       as: "menus",
    //       include: [
    //         {
    //           model: Item,
    //           as: "items",
    //         },
    //       ],
    //     },
    //   ],
    // });
    res.status(200).send(allRestaurants);
  } catch (err) {
    console.error("ERROR: ", err);
  }
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;

  const currentRestaurant = await Restaurant.findByPk(restaurantId);

  if (!currentRestaurant) {
    res.status(404).json({ error: "Restaurant not found." });
    return;
  }
  res.json(currentRestaurant);
});

app.post("/restaurants", async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Missing request body." });
  }

  if (!req.body.name) {
    res.status(400).json({ error: "Missing restaurant name." });
    return;
  }

  if (!req.body.location) {
    res.status(400).json({ error: "Missing restaurant location." });
    return;
  }

  if (!req.body.cuisine) {
    res.status(400).json({ error: "Missing restaurant cuisine." });
    return;
  }

  const createNewRestaurant = await Restaurant.create(req.body);

  // 201 - Created
  res.status(201).json(createNewRestaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const updateObject = req.body;

  const currentRestaurant = await Restaurant.findByPk(restaurantId);

  if (!currentRestaurant) {
    res.status(404).json({ error: "Restaurant not found." });
    return;
  }

  const updatedRestaurant = await Restaurant.update(updateObject, {
    where: { id: restaurantId },
  });
  res.json(updatedRestaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;

  const currentRestaurant = await Restaurant.findByPk(restaurantId);

  if (!currentRestaurant) {
    res.status(404).json({ error: "Restaurant not found." });
    return;
  }

  await currentRestaurant.destroy();

  res.status(204).send();
});

module.exports = app;
