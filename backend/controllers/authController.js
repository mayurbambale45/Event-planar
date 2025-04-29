const db = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const sqlCheck = 'SELECT * FROM users WHERE email = ?';
  db.query(sqlCheck, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', err });

    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const sqlInsert = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sqlInsert, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating user', err });

      const userId = result.insertId;
      const token = generateToken(userId);

      res.status(201).json({
        _id: userId,
        name,
        email,
        role: 'user',
        token
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sqlSelect = 'SELECT * FROM users WHERE email = ?';
  db.query(sqlSelect, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', err });

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  });
};
