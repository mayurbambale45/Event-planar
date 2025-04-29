import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const fetchEvents = () => API.get('/events');
export const createEvent = (data, token) => API.post('/events', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateEvent = (id, data, token) => API.put(`/events/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteEvent = (id, token) => API.delete(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const registerEvent = (data, token) => API.post('/registration', data, { headers: { Authorization: `Bearer ${token}` } });
