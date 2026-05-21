import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p>© {new Date().getFullYear()} Карьерный Компас. Все права защищены.</p>
        </div>
        <div className="footer-links">
          <Link to="/professions">Профессии</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
