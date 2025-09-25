
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import CompanyDashboardPage from './pages/CompanyDashboardPage';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/job/:jobId" element={<JobDetailsPage />} />
              <Route path="/student-dashboard" element={<StudentDashboardPage />} />
              <Route path="/company-dashboard" element={<CompanyDashboardPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
          <footer className="bg-slate-800 text-white p-4 text-center mt-8">
            <p>&copy; 2024 AI Job Board. All rights reserved.</p>
          </footer>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
