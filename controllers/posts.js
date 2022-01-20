const getAllPosts = async (req, res) => {
  res.status(200).send("All posts");
};

const getPostByTag = async (req, res) => {
  const { tag } = req.params;
  res.status(200).send(`Posts with tag ${tag}`);
};

module.exports = {
  getAllPosts,
  getPostByTag,
};
