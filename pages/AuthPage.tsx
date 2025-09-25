
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthPage: React.FC = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        if (user.role === 'student') {
            navigate('/student-dashboard');
        } else {
            navigate('/company-dashboard');
        }
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Join AI Job Board</h1>
        <p className="text-gray-600 mb-6">Connect with top talent or find your dream job.</p>
        
        {loading ? (
            <div className="flex justify-center items-center h-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        ) : (
            <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                    <h2 className="font-semibold text-lg">For Students</h2>
                    <p className="text-sm text-gray-500 mb-3">Find jobs, get resume feedback, and launch your career.</p>
                    <button 
                        onClick={() => login('student')}
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Sign In as Student
                    </button>
                </div>
                <div className="p-4 border rounded-lg">
                    <h2 className="font-semibold text-lg">For Companies</h2>
                    <p className="text-sm text-gray-500 mb-3">Post jobs, find qualified candidates, and build your team.</p>
                    <button 
                        onClick={() => login('company')}
                        className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                    >
                        Sign In as Company
                    </button>
                </div>
            </div>
        )}
        
        <p className="text-xs text-gray-400 mt-6">
            This is a simulated login. In a real application, this would be a full sign-up/sign-in form using a service like Clerk.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
