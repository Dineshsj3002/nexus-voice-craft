
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Alumni, alumniData } from '@/data/alumni';
import AlumniCard from '@/components/AlumniCard';
import AlumniFilters from '@/components/AlumniFilters';
import { Input } from '@/components/ui/input';
import { Search, UserPlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AlumniPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: 'all_years',
    industry: 'all_industries',
    location: 'all_locations',
  });

  // Filter alumni based on search query and filters
  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch = 
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = filters.graduationYear === 'all_years' || alumni.graduationYear === filters.graduationYear;
    const matchesIndustry = filters.industry === 'all_industries' || alumni.industry === filters.industry;
    const matchesLocation = filters.location === 'all_locations' || alumni.location.toLowerCase().includes(filters.location.toLowerCase());
    
    return matchesSearch && matchesYear && matchesIndustry && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold font-display mb-4">Alumni Directory</h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect with our diverse network of successful alumni from various industries around the world.
          </p>
          
          {/* Search and Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alumni by name, company, or role"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <AlumniFilters filters={filters} setFilters={setFilters} />
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {filteredAlumni.length} of {alumniData.length} alumni
            </div>
          </div>
          
          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
          
          {filteredAlumni.length === 0 && (
            <div className="text-center py-16 px-4 bg-gray-50 rounded-lg border border-gray-200">
              <UserPlus2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">We couldn't find alumni matching your current filters</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try broadening your search criteria or check out our 'Suggested Mentors' section for personalized recommendations.
              </p>
              <div className="space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      graduationYear: 'all_years',
                      industry: 'all_industries',
                      location: 'all_locations',
                    });
                  }}
                >
                  Clear all filters
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  className="bg-nexus-primary hover:bg-nexus-primary/90"
                >
                  View recommended alumni
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default AlumniPage;
