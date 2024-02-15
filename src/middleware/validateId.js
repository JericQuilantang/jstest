function validateId(req, res, next) {
  const id = req.params.id;
  if (id && isNaN(id)) {
    return res.status(400).send({
      status: "fail",
      error: "Invalid ID",
    });
  }
  next();
}
module.exports = validateId;
