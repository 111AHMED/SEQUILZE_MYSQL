const isAdmin = (req, res, next) => {
  if (req.currentMarket.firstName !== "ass") {
    return res.status(400).send({ msg: "You are not alloawed" });
  }
  next();
};

module.exports = isAdmin;
