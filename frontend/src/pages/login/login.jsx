import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля!');
      return;
    }
    setError('');
    
    // Получение списка зарегистрированных пользователей для имитации БД
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const registeredUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    const loggedUser = registeredUser || { name: 'Иван Иванов', email: email };
    
    onLogin(loggedUser);
    navigate('/dashboard');
  };

  return (
    <section className="view active">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="auth-title">С возвращением!</h2>
          <p className="auth-subtitle">Войди, чтобы сохранить свой прогресс</p>

          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email-input">
                Электронная почта
              </label>
              <div className="form-input-wrapper">
                <input
                  type="email"
                  id="email-input"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="form-icon" size={20} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password-input">
                Пароль
              </label>
              <div className="form-input-wrapper">
                <input
                  type="password"
                  id="password-input"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="form-icon" size={20} />
              </div>
            </div>

            <button type="submit" className="auth-btn-submit">
              Войти
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="auth-footer">
            Нет аккаунта?
            <Link to="/register" className="auth-link">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
