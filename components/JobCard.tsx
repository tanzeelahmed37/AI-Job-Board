
import React from 'react';
import { Link } from 'react-router-dom';
import type { Job } from '../types';
import { ICONS } from '../constants';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex items-start space-x-4">
        <img src={job.companyLogo} alt={`${job.companyName} logo`} className="w-16 h-16 rounded-md object-cover" />
        <div className="flex-1">
          <p className="text-sm text-gray-500">{job.companyName}</p>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span className="flex items-center">{ICONS.location}{job.location}</span>
            <span className="mx-2">|</span>
            <span className="flex items-center">{ICONS.briefcase}{job.type}</span>
          </div>
        </div>
        <Link to={`/job/${job.id}`} className="self-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-100 transition duration-300">
          View Details
        </Link>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
         <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">{skill}</span>
            ))}
            {job.skills.length > 3 && <span className="text-xs text-gray-500 self-center">+{job.skills.length - 3} more</span>}
        </div>
        <p className="text-xs text-gray-400">Posted on {new Date(job.postedDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default JobCard;
