// Imports
import express from "express";
import globalErr from "./middleware/globalErr.js";

// Data
import users from "./data/users.js";
import posts from "./data/posts.js";

// Setups
const app = express();
const PORT = 3000;

// (Request) Middleware
app.use(express.json()); // Parses the request body into JSON

// Routes
// @route: GET /api/users
// @desc: Show All Users Route
app.get("/api/users", (req, res) => {
  res.json(users);
});

// @route: POST /api/users
// @desc: Create a new user
app.post("/api/users", (req, res) => {
  //Destructure the req.body
  const { name, username, email } = req.body;

  //checked we had all needed data
  if (username && name && email) {
    // checked if username already existed
    if (users.find((user) => user.username == username)) {
      res.json({ error: "Username Already Taken" });
      return;
    }

    // Created new user with data
    let newUser = {
      id: users[users.length - 1].id + 1, //grabs the last user in DB and adds one to there id Number
      ...req.body,
    };

    // added to db
    users.push(newUser);

    //responded to frontend
    res.status(201).json({ "New User": newUser });
  } else res.json({ error: "Insufficient Data" });
});

// @desc: Show One User Route
app.get("/api/users/:id", (req, res, next) => {
  let id = req.params.id;

  let foundUser = users.find((user) => user.id == id);

  if (foundUser) res.json(foundUser);
  else next();
});

// @desc: Patch/Update User
app.patch("/api/users/:id", (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (user) res.json(user);
  else next();
});

//  @desc: Delete User
app.delete("/api/users/:id", (req, res, next) => {
  let id = req.params.id;

  let deletedUser = users.find((user, index) => {
    if (user.id == id) {
      return users.splice(index, 1);
    }
  });

  if (deletedUser) res.json({ DeletedUser: deletedUser });
  else next();
});

// @desc: Show All Posts Route
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// @route: POST /api/posts
// @desc: Create a new post
app.post("/api/posts", (req, res) => {
  //Destructure the req.body
  const { userId, title, content } = req.body;

  //checked we had all needed data
  if (userId && title && content) {
    // Created new user with data
    let newPost = {
      id: posts[posts.length - 1].id + 1, //grabs the last user in DB and adds one to there id Number
      ...req.body,
    };

    // added to db
    posts.push(newPost);

    //responded to frontend
    res.status(201).json({ "New Post": newPost });
  } else res.json({ error: "Insufficient Data" });
});

// @desc: Show One Post Route
app.get("/api/posts/:id", (req, res, next) => {
  let id = req.params.id;

  let foundPost = posts.find((post) => post.id == id);

  if (foundPost) res.json(foundPost);
  else next();
});

// @desc: Patch/Update User
app.patch("/api/posts/:id", (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const post = posts.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});

//  @desc: Delete User
app.delete("/api/posts/:id", (req, res, next) => {
  let id = req.params.id;

  let deletedPost = posts.find((post, index) => {
    if (post.id == id) {
      return posts.splice(index, 1);
    }
  });

  if (deletedPost) res.json({ DeletedPost: deletedPost });
  else next();
});


// Global Error Handling Middleware (err, req, res, next)
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
