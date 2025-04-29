const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  const { name, date, location, description } = req.body;
  const event = new Event({ name, date, location, description });
  await event.save();
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    event.name = req.body.name || event.name;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;
    event.description = req.body.description || event.description;
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

exports.deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    await event.remove();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};
