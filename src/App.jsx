import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/main/main';
import ProfessionsPage from './pages/professions/professions';
import ProfessionDetailPage from './pages/profession-detail/profession-detail';
import './styles/index.css';

function AppContent() {
  return (
    <>
      <Header />

      <main className="container" id="app-container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/professions" element={<ProfessionsPage />} />
          <Route path="/profession/:slug" element={<ProfessionDetailPage />} />
        </Routes>
      </main>

      <Footer />
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
