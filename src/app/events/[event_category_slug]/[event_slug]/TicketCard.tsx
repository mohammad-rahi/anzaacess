import React from 'react';
import { TicketTypes } from '../../event.types';
import { Button } from '@/components';

interface TicketCardProps {
  ticket: TicketTypes;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-200 to-blue-300 p-6 rounded-md shadow-md">
      <h4 className="text-xl font-bold mb-2">{ticket.name}</h4>
      <p className="text-gray-600 mb-4">{ticket.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-800">Price: ${ticket.price}</p>
        <Button>
          Add to Cart
        </Button>
      </div>
      <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-md">
        Best Value
      </div>
    </div>
  );
};

export default TicketCard;
