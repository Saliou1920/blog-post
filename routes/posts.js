const express = require("express");
const router = express.Router();

const { getAllPosts, getPostByTag } = require("../controllers/posts");

router.get("/api/ping", (req, res) => {
  res.status(200).send({ success: true });
});

router.get("/api/posts", getAllPosts);
router.get("/api/posts/:tag", getPostByTag);

module.exports = router;
