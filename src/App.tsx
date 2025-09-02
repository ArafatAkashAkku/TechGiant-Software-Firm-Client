import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.component';
import HomePage from './pages/Home.page';
import PortfolioPage from './pages/Portfolio.page';
import PortfolioDetailPage from './pages/PortfolioDetail.page';
import CareerPage from './pages/Career.page';
import { ThemeProvider } from './context/Theme.context';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="portfolio/:username" element={<PortfolioDetailPage />} />
            <Route path="careers" element={<CareerPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
