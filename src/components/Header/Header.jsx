import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header-inner">
        <div 
          className="logo" 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-icon-wrapper">
            <Compass className="logo-icon" />
          </div>
          <div className="logo-text">
            <h1>карьерный компас</h1>
            <span>твой путь в ИТ</span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/professions'); }}>Профессии</a>
        </nav>
        <div className="auth-btn">
          <button className="btn-outline">Войти</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
