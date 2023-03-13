const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  line1: {
    type: String,
  },
  line2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pin: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum:['admin','seller','user']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
  tokenExpiresAt: {
    type: Date,
  },
});

UserSchema.post('save', async function(user, next) {
  try {
    if (!user.token) { // Only generate a token if one doesn't already exist
      const token = jwt.sign({ _id: user._id.toString() }, 'mysecretkey', { expiresIn: '1d' });
      user.token = token;
      user.tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // set the token expiration to 1 day from now
      await user.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});


UserSchema.methods.checkPassword = function(plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'mysecretkey', { expiresIn: '1d' });

  user.token = token;
  
  user.tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // set the token expiration to 1 day from now
  await user.save();
  
  return token;
};



module.exports = mongoose.model("User", UserSchema);
