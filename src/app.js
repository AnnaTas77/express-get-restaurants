const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();

  res.status(200).send(allRestaurants);
});

module.exports = app;
