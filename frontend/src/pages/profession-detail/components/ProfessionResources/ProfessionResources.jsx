import './ProfessionResources.css';

function ProfessionResources({ profession }) {
  return (
    <section className="profession-section">
      <h2 className="section-title">Рекомендуемые ресурсы</h2>
      <div className="resources-grid">
        <div className="resource-block">
          <h3>📚 Курсы</h3>
          <ul>
            {profession.resources.courses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>
        </div>
        <div className="resource-block">
          <h3>📖 Книги</h3>
          <ul>
            {profession.resources.books.map((book, idx) => (
              <li key={idx}>{book}</li>
            ))}
          </ul>
        </div>
        <div className="resource-block">
          <h3>🌐 Веб-сайты</h3>
          <ul>
            {profession.resources.websites.map((website, idx) => (
              <li key={idx}>{website}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProfessionResources;
