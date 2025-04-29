import { useState } from 'react';
import { createEvent } from '../services/api';

function EventForm({ refreshEvents }) {
  const [event, setEvent] = useState({ name: '', date: '', location: '', description: '' });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    await createEvent(event, user.token);
    setEvent({ name: '', date: '', location: '', description: '' });
    refreshEvents();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Event</h3>
      <input name="name" placeholder="Event Name" value={event.name} onChange={handleChange} required />
      <input name="date" type="date" value={event.date} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={event.location} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={event.description} onChange={handleChange} required />
      <button type="submit">Create</button>
    </form>
  );
}

export default EventForm;
