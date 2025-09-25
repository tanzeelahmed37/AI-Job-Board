
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { MOCK_JOBS, JOB_CATEGORIES, JOB_TYPES } from '../constants';
import { enhanceJobDescription } from '../services/geminiService';
import Spinner from '../components/Spinner';
import type { Job } from '../types';

const CompanyDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    category: 'Engineering' as Job['category'],
    type: 'Full-time' as Job['type'],
    description: '',
    skills: '',
  });
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleEnhanceDescription = async () => {
    if (!newJob.description) return;
    setIsEnhancing(true);
    try {
      const enhanced = await enhanceJobDescription(newJob.description);
      setNewJob(prev => ({ ...prev, description: enhanced }));
    } catch (error) {
      console.error("Failed to enhance description", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend.
    console.log('Posting new job:', newJob);
    // Add to mock data for demonstration
    const newJobData: Job = {
        ...newJob,
        id: (MOCK_JOBS.length + 1).toString(),
        companyId: user!.id,
        companyName: user!.name,
        companyLogo: user!.profileImageUrl || '',
        skills: newJob.skills.split(',').map(s => s.trim()),
        postedDate: new Date().toISOString().split('T')[0]
    };
    MOCK_JOBS.unshift(newJobData);
    setIsPostingJob(false);
    setNewJob({ title: '', location: '', category: 'Engineering', type: 'Full-time', description: '', skills: '' });
  };
  
  if (!user || user.role !== 'company') {
    return <div className="text-center text-xl">Access Denied. Please log in as a company.</div>;
  }

  const companyJobs = MOCK_JOBS.filter(job => job.companyId === user.id);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Welcome, {user.name}!</h1>
        <button onClick={() => setIsPostingJob(!isPostingJob)} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          {isPostingJob ? 'Cancel' : '+ Post New Job'}
        </button>
      </div>

      {isPostingJob && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create New Job Posting</h2>
          <form onSubmit={handlePostJob} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="title" placeholder="Job Title" value={newJob.title} onChange={handleInputChange} required className="border-gray-300 rounded-md shadow-sm" />
              <input type="text" name="location" placeholder="Location (e.g., San Francisco, CA or Remote)" value={newJob.location} onChange={handleInputChange} required className="border-gray-300 rounded-md shadow-sm" />
              <select name="category" value={newJob.category} onChange={handleInputChange} className="border-gray-300 rounded-md shadow-sm">
                {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="type" value={newJob.type} onChange={handleInputChange} className="border-gray-300 rounded-md shadow-sm">
                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <textarea name="description" placeholder="Job Description" value={newJob.description} onChange={handleInputChange} required rows={8} className="w-full border-gray-300 rounded-md shadow-sm"></textarea>
              <div className="text-right">
                <button type="button" onClick={handleEnhanceDescription} disabled={isEnhancing || !newJob.description} className="text-sm text-indigo-600 hover:text-indigo-800 disabled:text-gray-400">
                    {isEnhancing ? <Spinner /> : '✨ Enhance with AI'}
                </button>
              </div>
            </div>
            <input type="text" name="skills" placeholder="Required Skills (comma-separated)" value={newJob.skills} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm" />
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">Post Job</button>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Job Postings</h2>
        <div className="space-y-4">
            {companyJobs.length > 0 ? companyJobs.map(job => (
                <div key={job.id} className="p-4 border rounded-md flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.location} | {job.type}</p>
                    </div>
                    <div>
                        <button className="text-sm text-blue-600 hover:underline">View Applicants (0)</button>
                    </div>
                </div>
            )) : <p>You haven't posted any jobs yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboardPage;
