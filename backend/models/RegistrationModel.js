const db = require('./db');

async function registerUserForEvent(userId, eventId) {
  await db.query(
    'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)',
    [userId, eventId]
  );
}

module.exports = { registerUserForEvent };
