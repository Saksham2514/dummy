const User = require("../model/Users");

const createUser = (req, res) => {
  console.log(req.body);
  User.create(
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      contact: req?.body?.contact,
      email: req?.body?.email,
      password: req?.body?.password,
    },
    (err, User) => {
      if (err) {
        res.send(err);
      } else res.json(User);
    }
  );
};

const getUsers = (req, res) => {
  // console.log(`entered else : ${req.body.email} ${req.body.password}`);
  User.find((err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

const loginUsers = (req, res) => {
  User.find(
    {
      email: req.body.email,
      password: req.body.password,
    },
    (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    }
  );
};

const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    {
      $set: {
        contact: req.body.contact,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pin: req.body.pin,
        contact: req.body.contact,
        role: req.body.role,
      },
    },
    { new: true },
    (err, User) => {
      if (err) {
        res.send(err);
      } else res.json(User);
    }
  );
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.userID })
    .then(() => res.json({ message: "User Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getUsers,
  loginUsers,
  createUser,
  updateUser,
  deleteUser,
};
