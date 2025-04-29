const db = require('./db');

async function createEvent({ name, date, location, description }) {
  await db.query(
    'INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)',
    [name, date, location, description]
  );
}

async function getAllEvents() {
  const [rows] = await db.query('SELECT * FROM events');
  return rows;
}

async function updateEvent(id, { name, date, location, description }) {
  await db.query(
    'UPDATE events SET name=?, date=?, location=?, description=? WHERE id=?',
    [name, date, location, description, id]
  );
}

async function deleteEvent(id) {
  await db.query('DELETE FROM events WHERE id = ?', [id]);
}

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };
