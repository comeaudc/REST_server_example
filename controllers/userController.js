import users from "../data/users.js";

const getAll = (req, res) => {
  res.json(users);
};

const createUser = (req, res) => {
  //Destructure (pulled out individual properties as vraibles) the req.body
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
};

const getOneUser = (req, res, next) => {
  let id = req.params.id;

  let foundUser = users.find((user) => user.id == id);

  if (foundUser) res.json(foundUser);
  else next();
};

const patchUser = (req, res, next) => {
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
};

const deleteUser = (req, res, next) => {
  let id = req.params.id;

  let deletedUser = users.find((user, index) => {
    if (user.id == id) {
      return users.splice(index, 1);
    }
  });

  if (deletedUser) res.json({ DeletedUser: deletedUser });
  else next();
};

export default { getAll, createUser, getOneUser, patchUser, deleteUser };
