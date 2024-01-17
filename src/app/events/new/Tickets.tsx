import React from 'react';
import { TicketType } from '../event.types';
import InputField from '@/components/InputField';
import { FaDollarSign, FaTicketAlt } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';
import { v4 as uuid4 } from 'uuid';

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
                            inputLeft={<FaDollarSign className="text-gray-500" />}
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
