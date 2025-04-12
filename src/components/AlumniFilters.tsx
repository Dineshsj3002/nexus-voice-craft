
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  getUniqueGraduationYears, 
  getUniqueIndustries, 
  getUniqueLocations 
} from '@/data/alumni';

interface FiltersState {
  graduationYear: string;
  industry: string;
  location: string;
}

interface AlumniFiltersProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const AlumniFilters = ({ filters, setFilters }: AlumniFiltersProps) => {
  const industries = getUniqueIndustries();
  const years = getUniqueGraduationYears();
  const locations = getUniqueLocations();

  const handleChange = (value: string, filterType: keyof FiltersState) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select
        value={filters.graduationYear}
        onValueChange={(value) => handleChange(value, 'graduationYear')}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Graduation Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_years">All Years</SelectItem>
          {years.map(year => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.industry}
        onValueChange={(value) => handleChange(value, 'industry')}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_industries">All Industries</SelectItem>
          {industries.map(industry => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.location}
        onValueChange={(value) => handleChange(value, 'location')}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_locations">All Locations</SelectItem>
          {locations.map(location => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AlumniFilters;
