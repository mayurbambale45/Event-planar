const db = require('./db');

async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser(name, email, hashedPassword) {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
    [name, email, hashedPassword]
  );
  return result.insertId;
}

async function findUserById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { findUserByEmail, createUser, findUserById };
