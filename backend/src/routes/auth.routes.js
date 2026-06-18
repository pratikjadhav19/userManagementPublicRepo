const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// helper: create a signed token for a user
const sign = (user) =>
  jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

// POST /auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email already used' });
    const hash = await bcrypt.hash(password, 10);                 // hash with salt rounds = 10
    const user = await User.create({ name, email, password: hash });
    res.status(201).json({ token: sign(user) });                 // log them in immediately
  } catch (e) { next(e); }
});

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });  // same message both cases
    res.json({ token: sign(user) });
  } catch (e) { next(e); }
});

module.exports = router;
