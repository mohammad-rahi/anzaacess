// FilterOptions.tsx
import React from 'react';

interface FilterOptionsProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  ticketTypeOptions: string[];
  selectedTicketType: string;
  setSelectedTicketType: React.Dispatch<React.SetStateAction<string>>;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  selectedCategory,
  setSelectedCategory,
  ticketTypeOptions,
  selectedTicketType,
  setSelectedTicketType,
}) => {
  return (
    <div className='flex items-center gap-8'>
      {/* Category filter */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-600'>Category</label>
        <select
          className='mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value=''>All Categories</option>
          {['Category 1', 'Category 2', 'Category 3'].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Ticket Type filter */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-600'>Ticket Type</label>
        <select
          className='mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
          value={selectedTicketType}
          onChange={(e) => setSelectedTicketType(e.target.value)}
        >
          <option value=''>All Ticket Types</option>
          {ticketTypeOptions.map((ticketType) => (
            <option key={ticketType} value={ticketType}>
              {ticketType}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
