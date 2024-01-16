import React from 'react';

interface TicketCardProps {
  type: string;
}

const TicketCard: React.FC<TicketCardProps> = ({ type }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h4 className="text-lg font-bold mb-2">{type}</h4>
      <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis purus.</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-800">Price: $XX.XX</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Select
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
