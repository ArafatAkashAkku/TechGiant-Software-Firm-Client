import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.component';
import HomePage from './pages/Home.page';
import PortfolioPage from './pages/Portfolio.page';
import PortfolioDetailPage from './pages/PortfolioDetail.page';
import CareerPage from './pages/Career.page';
import BlogPage from './pages/Blog.page';
import BlogDetailPage from './pages/BlogDetail.page';
import AdminLogin from './pages/admin/AdminLogin.page';
import AdminDashboard from './pages/admin/AdminDashboard.page';
import ProtectedRoute from './components/admin/ProtectedRoute.component';
import { ThemeProvider } from './context/Theme.context';
import { AuthProvider } from './context/admin/Auth.context';
import { SiteSettingsProvider } from './context/SiteSettings.context';

const App = () => {
  return (
    <SiteSettingsProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="portfolio/:username" element={<PortfolioDetailPage />} />
                <Route path="careers" element={<CareerPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:blogId" element={<BlogDetailPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </SiteSettingsProvider>
  );
};

export default App;
