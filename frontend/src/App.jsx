import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/main/main';
import ProfessionsPage from './pages/professions/professions';
import ProfessionDetailPage from './pages/profession-detail/profession-detail';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Dashboard from './pages/dashboard/dashboard';
import RoadmapPage from './pages/roadmap/roadmap';
import './styles/index.css';

function AppContent() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />

      <main className="container" id="app-container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/professions" element={<ProfessionsPage />} />
          <Route path="/profession/:slug" element={<ProfessionDetailPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
          <Route path="/roadmap/:slug" element={<RoadmapPage />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

