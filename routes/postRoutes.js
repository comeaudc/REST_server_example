import express from "express";
import posts from "../data/posts.js";

const router = express.Router();

// @route: /api/posts
router
  .route("/")
  // @desc: Show All Posts Route
  .get((req, res) => {
    res.json(posts);
  })
  // @desc: Create a new post
  .post((req, res) => {
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

  // @route: /api/posts/:id
router
  .route("/:id")
  // @desc: Show One Post Route
  .get((req, res, next) => {
    let id = req.params.id;

    let foundPost = posts.find((post) => post.id == id);

    if (foundPost) res.json(foundPost);
    else next();
  })
  // @desc: Patch/Update User
  .patch((req, res, next) => {
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
  })
  //  @desc: Delete User
  .delete((req, res, next) => {
    let id = req.params.id;

    let deletedPost = posts.find((post, index) => {
      if (post.id == id) {
        return posts.splice(index, 1);
      }
    });

    if (deletedPost) res.json({ DeletedPost: deletedPost });
    else next();
  });

export default router;
