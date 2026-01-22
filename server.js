// Imports
import express from "express";
import globalErr from "./middleware/globalErr.js";
import logReq from "./middleware/logReq.js";
import apiKeyCheck from "./middleware/apiKeyCheck.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import error from "./utilities/error.js";

// Setups
const app = express();
const PORT = 3000;

// (Request) Middleware
app.use(express.json()); // Parses the request body into JSON
app.use(logReq);
app.use("/api", apiKeyCheck);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// 404 catching middleware
app.use((req, res, next) => {
  next(error(404, "Resource not found"));
});

// Global Error Handling Middleware (err, req, res, next)
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
