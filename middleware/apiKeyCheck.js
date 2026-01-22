import error from "../utilities/error.js";

export default function (req, res, next) {
  let apiKeys = ["superTopSecret", "kindasecret", "easy"];
  
  var key = req.query["api-key"];

  // Check for the absence of a key.
  if (!key) next(error(400, "API Key Required"))

  // Check for key validity.
  if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"))

  // Valid key! Store it in req.key for route access.
  req.key = key;
  next();
}
