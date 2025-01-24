import React, { useContext, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../context/mainContex';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, setToken, setUser } = useContext(mainContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleLogout = () => {
    setToken('');
    setUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Machine Task</h1>

        <nav className="hidden md:flex space-x-6 items-center">
          <a href="/" className="hover:text-blue-500">
            Home
          </a>
          <a href="/feed" className="hover:text-blue-500">
            Feed
          </a>
          <a href="/tasks" className="hover:text-blue-500">
            Tasks
          </a>
          <a href="/profile" className="hover:text-blue-500">
            Profile
          </a>
          {!token ? (
            <button
              onClick={handleLogin}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
            >
              Logout
            </button>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-gray-100 border-t border-gray-300">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <a href="/" className="block text-gray-700 hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="/feed" className="block text-gray-700 hover:text-blue-500">
                Feed
              </a>
            </li>
            <li>
              <a href="/tasks" className="block text-gray-700 hover:text-blue-500">
                Tasks
              </a>
            </li>
            <li>
              <a href="/profile" className="block text-gray-700 hover:text-blue-500">
                Profile
              </a>
            </li>
            <li>
              {!token ? (
                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
