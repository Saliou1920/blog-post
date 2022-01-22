const express = require("express");
const router = express.Router();

const { getAllPosts } = require("../controllers/posts");

router.get("/api/ping", (req, res) => {
  res.status(200).json({ success: true });
});

router.get("/", getAllPosts);

module.exports = router;
