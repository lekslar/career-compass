import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Карьерный Компас. Все права защищены.</p>
    </footer>
  );
}

export default Footer;