import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.component';
import HomePage from './pages/Home.page';
import { ThemeProvider } from './context/Theme.context';

const App = () => {
  return (
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
  );
};

export default App;
