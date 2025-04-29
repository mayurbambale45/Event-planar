import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/events" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        {user?.user?.role === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
