const db = require('../models/db');
const { sendRegistrationEmail } = require('../utils/emailService');

exports.registerForEvent = (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  // Check if already registered
  const sqlCheck = 'SELECT * FROM registrations WHERE userId = ? AND eventId = ?';
  db.query(sqlCheck, [userId, eventId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', err });

    if (result.length > 0) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Insert new registration
    const sqlInsert = 'INSERT INTO registrations (userId, eventId) VALUES (?, ?)';
    db.query(sqlInsert, [userId, eventId], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error registering', err });

      // Now fetch user email and event name
      const sqlFetchUserEvent = `
        SELECT users.email, events.name 
        FROM users 
        JOIN events ON events.id = ? 
        WHERE users.id = ?
      `;
      db.query(sqlFetchUserEvent, [eventId, userId], async (err, data) => {
        if (err) return res.status(500).json({ message: 'Error fetching email/event', err });

        const { email, name: eventName } = data[0];

        // Send registration email
        await sendRegistrationEmail(email, eventName);

        res.status(201).json({ message: 'Registered successfully' });
      });
    });
  });
};
