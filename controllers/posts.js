const axios = require("axios");
const apiUrl = "https://api.hatchways.io/assessment/blog/posts?";

const DEFAULT_EXPIRATION_TIME = 3600;

const fetchPosts = async (tag) => {
  const url = `${apiUrl}tags=${tag}`;
};

const getAllPosts = async (req, res) => {
  const { tags, sortBy = "id", direction = "asc" } = req.query;

  if (!tags) {
    return res.status(400).json({ error: "Tags parameter is required" });
  }

  if (tags || sortBy) {
    const posts = await Promise.all(
      tags.split(",").map((tag) => fetchPosts(tag))
    );
    const sortedPosts = posts.flat().sort((a, b) => {
      if (direction === "asc") {
        return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
      }
      if (direction === "desc") {
        return parseFloat(b[sortBy]) - parseFloat(a[sortBy]);
      } else {
        return res.status(400).json({ error: "sortBy parameter is invalid" });
      }
    });
    return res.status(200).json({ sortedPosts });
  }
};

module.exports = {
  getAllPosts,
};
