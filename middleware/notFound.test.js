const request = require("supertest");
const notFound = require("./notFound");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", notFound);

describe("Route not Found", () => {
  it("should return 404", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Route does not exist" });
  });
});
