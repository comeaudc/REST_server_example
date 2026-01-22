export default (err, _req, res, _next) => {
  res.status(500).send(`❌ Error: ${err.message}`);
};
