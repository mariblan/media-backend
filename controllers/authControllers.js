const userCollection = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const foundUser = await userCollection.findOne({ email });
    if (foundUser) return res.status(400).send('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const { _id } = await userCollection.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email }).select('+password');
    if (!user) return res.status(404).send('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { registerUser, loginUser };
