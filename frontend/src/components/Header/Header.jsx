import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header-inner">
        <div 
          className="logo" 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <img src="/logo.png" alt="карьерный компас" className="logo-img" />
          <div className="logo-text">
            <h1>карьерный компас</h1>
            <span>твой путь в ИТ</span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/professions'); }}>Профессии</a>
        </nav>
        <div className="auth-btn">
          {user ? (
            <button className="btn-outline" onClick={() => navigate('/dashboard')}>
              {user.name}
            </button>
          ) : (
            <button className="btn-outline" onClick={() => navigate('/login')}>
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
