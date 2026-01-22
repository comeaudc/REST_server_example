// Imports
import express from "express";
import globalErr from "./middleware/globalErr.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// Setups
const app = express();
const PORT = 3000;

// (Request) Middleware
app.use(express.json()); // Parses the request body into JSON

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Global Error Handling Middleware (err, req, res, next)
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});