export default (err, _req, res, _next) => {
  res.status(err.status).send(`❌ Error: ${err.message}`);
}