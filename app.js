require("express-async-errors");
const posts = require("./routes/posts");
const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorHandler");

const express = require("express");
const app = express();

app.use(express.json());

app.use("/", posts);
app.use("/api/posts", posts);
// error handling middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen(port);
    console.log(`Server running on port ${port}`);
  } catch (err) {
    console.error(err);
  }
};

start();
