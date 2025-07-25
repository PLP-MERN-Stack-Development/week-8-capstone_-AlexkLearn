import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx'; // Ensure you have this context

const Navbar = () => {
  const { user, logout } = useAuth();
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
        MtaaFix
      </Link>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDark(!dark)}
          className="text-sm border px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>

        {!user ? (
          <>
            <Link to="/login" className="bg-lime-500 hover:bg-lime-400 text-white font-semibold py-2 px-4 rounded transition">
              Login
            </Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {user.role === 'provider' && (
              <Link to="/add-profile" className="text-gray-700 dark:text-gray-300">
                My Profile
              </Link>
            )}
            <Link to="/profile" className="text-gray-700 dark:text-gray-300">
              Profile
            </Link>
            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;