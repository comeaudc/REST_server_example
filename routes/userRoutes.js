// Imports
import express from "express";
import userCTRL from "../controllers/userController.js";

// instantiate a new router
const router = express.Router();

router
  .route("/")
  // @route: GET /api/users
  // @desc: GET All Users Route
  .get(userCTRL.getAll)
  // @desc: POST Create a new user
  .post(userCTRL.createUser);

// @route: /api/users/:id
router
  .route("/:id")
  // @desc: Show One User Route
  .get(userCTRL.getOneUser)
  // @desc: Patch/Update User
  .patch(userCTRL.patchUser)
  //  @desc: Delete User
  .delete(userCTRL.deleteUser);

export default router;
