const jwt = require('jsonwebtoken');
const User = require('../model/Users');

const requireAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, 'mysecretkey');
    const user = await User.findOne({ _id: decodedToken._id, token: token });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;

    if (user.role !== 'admin') {
      return res.status(401).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const requireSeller = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, 'mysecretkey');
    const user = await User.findOne({ _id: decodedToken._id, token: token });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;

    if (user.role === 'admin' || user.role === "seller") {
      next();
    }
    else   return res.status(401).json({ error: 'Access denied' });

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = {requireAuth,requireSeller} ;
