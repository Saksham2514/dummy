const User = require("../model/Users");

const createUser = (req, res) => {
  // console.log(req.body);
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
      } else {res.json(User);}
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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
     user.checkPassword(password, async (err, isMatch) => {
      if (err) {
        throw err;
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // If the email and password are correct, generate a JWT token and send it in the response
      const token = await user.generateAuthToken();
      return res.json({ token:token,role:user.role });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

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
  login,
  createUser,
  updateUser,
  deleteUser,
};
