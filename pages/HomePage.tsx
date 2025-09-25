
import React, { useState, useMemo } from 'react';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';
import { MOCK_JOBS } from '../constants';
import type { Job } from '../types';

const HomePage: React.FC = () => {
  const [jobs] = useState<Job[]>(MOCK_JOBS);
  const [filters, setFilters] = useState({
    searchTerm: '',
    location: '',
    category: '',
    type: '',
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  
  const handleResetFilters = () => {
    setFilters({ searchTerm: '', location: '', category: '', type: '' });
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const searchTermMatch =
        job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      const locationMatch = job.location.toLowerCase().includes(filters.location.toLowerCase());
      const categoryMatch = filters.category ? job.category === filters.category : true;
      const typeMatch = filters.type ? job.type === filters.type : true;
      return searchTermMatch && locationMatch && categoryMatch && typeMatch;
    });
  }, [jobs, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside className="md:col-span-1">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
      </aside>
      <section className="md:col-span-3">
        <h1 className="text-3xl font-bold mb-6">Find Your Next Opportunity</h1>
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No jobs match your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
