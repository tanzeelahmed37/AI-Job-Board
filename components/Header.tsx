import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, SignedIn, SignedOut, UserButton } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          AI Job Board
        </Link>
        <div className="flex items-center space-x-4">
          <SignedIn>
            {user?.role === 'student' && (
              <Link to="/student-dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
            )}
            {user?.role === 'company' && (
              <Link to="/company-dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
            )}
            <UserButton />
          </SignedIn>
          <SignedOut>
             <button onClick={() => navigate('/auth')} className="text-gray-600 hover:text-indigo-600 font-medium">
                Log In
            </button>
            <button onClick={() => navigate('/auth')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                Sign Up
            </button>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
