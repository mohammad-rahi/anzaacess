import React from 'react';
import { TicketType } from '../event.types';
import InputField from '@/components/InputField';
import { FaTicketAlt } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';
import { v4 as uuid4 } from 'uuid';

const KesIcon = () => (
    <div className='w-6 h-6'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="gray" strokeWidth="2" fill="none" />
            <line x1="12" y1="16" x2="12" y2="12" stroke="gray" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="8" x2="12" y2="8" stroke="gray" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="12" x2="16" y2="12" stroke="gray" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="12" x2="8" y2="12" stroke="gray" strokeWidth="2" strokeLinecap="round" />
        </svg>
    </div>
);

type TicketsProps = {
    tickets: TicketType[];
    setTickets: (tickets: TicketType[]) => void;
}

export default function Tickets({ tickets, setTickets }: TicketsProps) {
    // Function to handle adding a new ticket
    const handleAddTicket = () => {
        setTickets([...tickets, { id: uuid4(), name: '', price: 0, description: '' }]);
    };

    const handleRemoveTicket = (indexToRemove: number) => {
        setTickets(tickets.filter((_, index) => index !== indexToRemove));
    };

    // Function to update ticket details
    const handleTicketChange = (index: number, field: string, value: string) => {
        const updatedTickets = [...tickets];
        (updatedTickets[index] as any)[field] = value;
        setTickets(updatedTickets);
    };

    return (
        <div>
            {tickets.map((ticket, index) => (
                <fieldset key={index} className='border rounded-md p-2 mb-4'>
                    <legend className='font-bold text-sm'>Ticket {index + 1}</legend>
                    <div className='mb-2 flex items-center gap-6'>
                        <InputField
                            type="text"
                            label='Name'
                            placeholder='VIP, Regular, etc.'
                            value={ticket.name}
                            onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                            inputLeft={<FaTicketAlt className="text-gray-500" />}
                        />

                        <InputField
                            type="number"
                            label='Price'
                            placeholder='Enter Ticket Price'
                            value={ticket.price}
                            onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                            inputLeft={<KesIcon />}
                        />

                    </div>

                    <div className='mb-2'>
                        <InputField
                            label='Description'
                            placeholder='Enter Ticket Description...'
                            value={ticket.description}
                            onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                            inputLeft={<FaNoteSticky className="text-gray-500" />}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => handleRemoveTicket(index)}
                        className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                    >
                        Remove Ticket
                    </button>
                </fieldset>
            ))}
            <button
                type="button"
                onClick={handleAddTicket}
                className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
            >
                Add Ticket
            </button>
        </div>
    )
}
