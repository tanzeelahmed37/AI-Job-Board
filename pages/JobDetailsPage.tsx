
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_JOBS, ICONS } from '../constants';
import { useAuth, SignedIn, SignedOut } from '../hooks/useAuth';
import type { Job } from '../types';

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job] = useState<Job | undefined>(MOCK_JOBS.find(j => j.id === jobId));
  const { user } = useAuth();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleApply = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would submit the application here.
      setApplicationStatus('success');
      setIsApplying(false);
    }, 1500);
  };

  if (!job) {
    return <div className="text-center text-xl">Job not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center space-x-6 mb-6 pb-6 border-b">
        <img src={job.companyLogo} alt={`${job.companyName} logo`} className="w-24 h-24 rounded-lg object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-xl text-gray-600">{job.companyName}</p>
          <div className="mt-2 flex items-center text-md text-gray-500">
            <span className="flex items-center">{ICONS.location}{job.location}</span>
            <span className="mx-3">|</span>
            <span className="flex items-center">{ICONS.briefcase}{job.type}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Required Skills</h2>
        <div className="flex flex-wrap gap-3">
          {job.skills.map(skill => (
            <span key={skill} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
          ))}
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <SignedIn>
            {user?.role === 'student' && (
                 <>
                    {applicationStatus === 'idle' && (
                        <button 
                            onClick={handleApply}
                            disabled={isApplying}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-300"
                        >
                            {isApplying ? 'Submitting...' : 'Apply Now'}
                        </button>
                    )}
                    {applicationStatus === 'success' && (
                         <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                            Application submitted successfully! The company will review your profile.
                         </div>
                    )}
                 </>
            )}
            {user?.role === 'company' && (
                 <p className="text-gray-500 italic">You are viewing this job as a company.</p>
            )}
        </SignedIn>
        <SignedOut>
            <p className="text-gray-500">Please log in or sign up as a student to apply.</p>
        </SignedOut>
      </div>

    </div>
  );
};

export default JobDetailsPage;
