import { Outlet } from 'react-router-dom';
import Header from './Header.component';
import Footer from './Footer.component';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: '20px', minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
