import { Link } from 'react-router-dom';
import { useTheme } from '../context/Theme.context';

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-white">
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div className="flex gap-4">
        <button
          onClick={() => setTheme('light')}
          className={`px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 ${
            theme === 'light' ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`px-4 py-2 rounded bg-slate-800 text-white hover:bg-slate-700 ${
            theme === 'dark' ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 ${
            theme === 'system' ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          System
        </button>
      </div>
    </header>
  );
};

export default Header;
