
import React from 'react';
import { JOB_CATEGORIES, JOB_TYPES } from '../constants';

interface FilterState {
  searchTerm: string;
  location: string;
  category: string;
  type: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">Keywords</label>
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            value={filters.searchTerm}
            onChange={handleChange}
            placeholder="Job title, skills..."
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="City or 'Remote'"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            id="category"
            value={filters.category}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            name="type"
            id="type"
            value={filters.type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Types</option>
            {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <button onClick={onReset} className="w-full text-center text-sm text-gray-600 hover:text-indigo-600 mt-2">
            Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
