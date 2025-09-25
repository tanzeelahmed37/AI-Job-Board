
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import type { User } from '../types';
import { MOCK_STUDENT_USER, MOCK_COMPANY_USER } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (role: 'student' | 'company') => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback((role: 'student' | 'company') => {
    setLoading(true);
    setTimeout(() => {
      if (role === 'student') {
        setUser(MOCK_STUDENT_USER);
      } else {
        setUser(MOCK_COMPANY_USER);
      }
      setLoading(false);
    }, 500);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock Clerk components for easy replacement
export const SignedIn: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return user ? <>{children}</> : null;
};

export const SignedOut: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return !user ? <>{children}</> : null;
};

export const UserButton: React.FC = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <img src={user.profileImageUrl} alt="User profile" className="w-full h-full object-cover" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700">{user.name}</div>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};
