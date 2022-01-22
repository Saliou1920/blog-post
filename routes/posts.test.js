const request = require("supertest");
const posts = require("./posts");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", posts);

describe("Get /api/ping", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });
});

describe("Get /api/posts?tags=tech", () => {
  it("should return 200", async () => {
    const response = await request(app).get("?tags=tech");
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});

describe("GET /api/posts", () => {
  it("should return missing tags", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Missing tags" });
  });
});
