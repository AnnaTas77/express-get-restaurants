const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");
const { describe, it, expect, beforeAll, afterEach } = require("@jest/globals");

const request = require("supertest");
const { db } = require("./db/connection");
const Restaurant = require("./models/index");
const app = require("./src/app");
const { seedRestaurant, seedMenu, seedItem } = require("./seedData");

describe("GET /restaurants endpoint", () => {
  test("testing if the GET request is successful", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  test("testing the response data", async () => {
    const response = await request(app).get("/restaurants");
    const restaurantsData = response.body;

    expect(Array.isArray(restaurantsData)).toBe(true);

    expect(restaurantsData.length).toBe(seedRestaurant.length);

    // the expect statement below expects an array of only objects and will check all of them
    expect(restaurantsData).toEqual(
      restaurantsData.map(() =>
        expect.objectContaining({
          name: expect.any(String),
          location: expect.any(String),
          cuisine: expect.any(String),
        })
      )
    );
  });
});

describe("GET /restaurants/:id", () => {
  test("returns the correct data", async () => {
    const response = await request(app).get("/restaurants/1");

    expect(response.body.id).toBe(1);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        location: expect.any(String),
        cuisine: expect.any(String),
      })
    );
  });
});

describe("POST /restaurants", () => {
  test("returns the restaurants array which has been updated with the new value. ", async () => {
    const newRestaurant = {
      name: "Happy",
      location: "London",
      cuisine: "Bulgarian",
    };

    const response = await request(app)
      .post("/restaurants")
      .send(newRestaurant);

    // console.log(response.body);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: "Happy",
        location: "London",
        cuisine: "Bulgarian",
      })
    );
  });
});

describe("PUT /restaurants/:id", () => {
  test("updates the restaurant array with the provided value", async () => {
    const newRestaurant = {
      name: "Five Guys",
      location: "London",
      cuisine: "American",
    };

    const response = await request(app)
      .put("/restaurants/2")
      .send(newRestaurant);

    const restaurantAfterUpdate = await Restaurant.findByPk(2);

    expect(restaurantAfterUpdate.toJSON()).toEqual(
      expect.objectContaining({
        name: "Five Guys",
        location: "London",
        cuisine: "American",
      })
    );
  });
});

describe("DELETE /restaurants/:id", () => {
  test("deletes the restaurant with the provided id from the array", async () => {
    const response = await request(app).delete("/restaurants/2");
    const restaurantAfterDelete = await Restaurant.findByPk(2);
    expect(restaurantAfterDelete).toBeNull();
  });
});
