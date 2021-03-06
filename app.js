require("express-async-errors");

const posts = require("./routes/posts");

const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorHandler");

// Security
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const express = require("express");
const app = express();

app.use(express.json());

app.use("/", posts);
app.use("/api/posts", posts);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

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
