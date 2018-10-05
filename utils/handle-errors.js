const defaultErrorHandler = (err, req, res) => {
  console.log("an error happened: ", err);
  res.status(500).json({ error: "internal server error *" });
};

module.exports = (middleware, errorHandler = defaultErrorHandler) => (
  req,
  res
) =>
  Promise.resolve(middleware(req, res)).catch(error =>
    errorHandler(error, req, res)
  );
