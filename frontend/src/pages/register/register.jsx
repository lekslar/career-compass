import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import './register.css';

function Register({ onRegister }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают!');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов!');
      return;
    }
    setError('');
    
    // Сохранение пользователя в имитированную БД
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const newUser = { name, email };
    
    // Предотвращение дубликатов по email
    if (!users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
    
    onRegister(newUser);
    navigate('/dashboard');
  };

  return (
    <section className="view active">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="auth-title">Создать аккаунт</h2>
          <p className="auth-subtitle">Начни свой путь в ИТ прямо сейчас!</p>

          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="name-input">
                Имя и фамилия
              </label>
              <div className="form-input-wrapper">
                <input
                  type="text"
                  id="name-input"
                  className="form-input"
                  placeholder="Иван Иванов"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <User className="form-icon" size={20} />
              </div>
            </div>

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

            <div className="form-group">
              <label className="form-label" htmlFor="confirm-password-input">
                Подтверждение пароля
              </label>
              <div className="form-input-wrapper">
                <input
                  type="password"
                  id="confirm-password-input"
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Lock className="form-icon" size={20} />
              </div>
            </div>

            <button type="submit" className="auth-btn-submit">
              Зарегистрироваться
              <UserPlus size={20} />
            </button>
          </form>

          <div className="auth-footer">
            Уже есть аккаунт?
            <Link to="/login" className="auth-link">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
