const axios = require("axios");
const Redis = require("redis");
const apiUrl = "https://api.hatchways.io/assessment/blog/posts?";

const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION_TIME = 3600;

function getOrSetCache(key, callback) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, cached) => {
      if (err) {
        return reject(err);
      }

      if (cached) {
        return resolve(JSON.parse(cached));
      }

      const result = await callback();
      redisClient.setex(key, DEFAULT_EXPIRATION_TIME, JSON.stringify(result));
      return resolve(result);
    });
  });
}

const fetchPosts = async (tag) => {
  const url = `${apiUrl}tag=${tag}`;
  const posts = await getOrSetCache(`posts?${tag}`, () => {
    const { data } = axios.get(url);
    return data.posts;
  });
  return posts;
};

// const fetchPosts = async (tag) => {
//   const url = `${apiUrl}tag=${tag}`;
//   try {
//     const { data } = await axios.get(url);
//     return data.posts;
//   } catch (err) {
//     console.error(err);
//   }
// };

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
