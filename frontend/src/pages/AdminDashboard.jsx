import { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import Navbar from '../components/Navbar';

function AdminDashboard() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await fetchEvents();
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Admin Dashboard</h2>
      <EventForm refreshEvents={loadEvents} />
      <EventList events={events} refreshEvents={loadEvents} />
    </div>
  );
}

export default AdminDashboard;
