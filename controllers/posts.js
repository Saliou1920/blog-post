const axios = require("axios");
const apiUrl = "https://api.hatchways.io/assessment/blog/posts?";

const fetchPosts = async (tag) => {
  const url = `${apiUrl}tag=${tag}`;
  try {
    const { data } = await axios.get(url);
    return data.posts;
  } catch (err) {
    console.error(err);
  }
};

const getAllPosts = async (req, res) => {
  const { tags, sortBy = "id", direction = "asc" } = req.query;

  if (!tags) {
    return res.status(400).json({ error: "Missing tags" });
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
        return res.status(400).json({ error: "Invalid sort direction" });
      }
    });
    return res.status(200).json({ sortedPosts });
  }
};

module.exports = {
  getAllPosts,
};
