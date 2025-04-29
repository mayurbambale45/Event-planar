import { useEffect, useState } from 'react';
import { fetchEvents, registerEvent } from '../services/api';
import Navbar from '../components/Navbar';

function Events() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await fetchEvents();
    setEvents(res.data);
  };

  const handleRegister = async (eventId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login first');
      return;
    }
    await registerEvent({ eventId }, user.token);
    alert('Registered successfully!');
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Events</h2>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.location} - {new Date(event.date).toDateString()}</p>
          <p>{event.description}</p>
          <button onClick={() => handleRegister(event.id)}>Register</button>
        </div>
      ))}
    </div>
  );
}

export default Events;
