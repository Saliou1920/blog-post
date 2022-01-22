const errorHanlder = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: "Something went wrong" });
};

module.exports = errorHanlder;
