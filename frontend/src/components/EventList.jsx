import { deleteEvent } from '../services/api';

function EventList({ events, refreshEvents }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id, user.token);
      refreshEvents();
    }
  };

  return (
    <div>
      <h3>Event List</h3>
      {events.map(event => (
        <div key={event.id}>
          <h4>{event.name}</h4>
          <p>{event.location} - {new Date(event.date).toLocaleDateString()}</p>
          <p>{event.description}</p>
          {user?.user?.role === 'admin' && (
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default EventList;
