// Imports
import express from "express";
import globalErr from "./middleware/globalErr.js";

// Setups
const app = express();
const PORT = 3000;

// (Request) Middleware
app.use(express.json()); // Parses the request body into JSON

// Routes
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("testing route");
});

// Global Error Handling Middleware (err, req, res, next)
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
