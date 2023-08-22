const userCollection = require('../models/userModel.js');

const getUser = async (req, res) => {
  try {
    const getUser = await userCollection
      .findById(req.userId)
      .select('+password');
    if (!getUser) return res.status(404).send('User not found');
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getUser };
