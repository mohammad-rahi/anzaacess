import { TicketTypes } from '@/app/events/event.types'
import { Button, Modal } from '@/components'
import InputField from '@/components/InputField'
import { supabase } from '@/config/supabase'
import React, { useEffect, useState } from 'react'
import { FaTicketAlt } from 'react-icons/fa'
import { FaNoteSticky } from 'react-icons/fa6'
import { HiXMark } from 'react-icons/hi2'
import { BarLoader } from 'react-spinners'

const KesIcon = () => (
    <p className='text-gray-400 font-medium text-xs pr-1'>KSH</p>
);

const EditTicketModal = ({ onClose, data: { event, ticketToUpdate } }: {
    onClose: () => void, data: {
        event: { id: number, event_name: string }, ticketToUpdate: TicketTypes
    }
}) => {
    const [ticketsSubmitLoading, setTicketSubmitLoading] = useState<boolean>(false);
    const [ticket, setTicket] = useState<TicketTypes>({
        event_id: 0,
        profile_id: 0,
        name: '',
        price: 0,
        description: '',
        quantity_available: 0
    });

    useEffect(() => {
        if (ticketToUpdate) {
            setTicket(ticketToUpdate);
        }
    }, [ticketToUpdate]);


    const handleSubmitTicket = async () => {
        try {
            setTicketSubmitLoading(true);

            if (event.id) {
                const { error } = await supabase.from('event_tickets').update(ticket).eq('id', ticketToUpdate.id);
                if (error) {
                    console.error('Error creating ticket:', error);
                    return;
                }
                alert('Ticket updated successfully');

                onClose();
            }
            else {
                alert('Please select an event');
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
        finally {
            setTicketSubmitLoading(false);
        }
    }

    const handleTicketChange = (field: keyof TicketTypes, value: string) => {
        setTicket((prevTicket) => ({
            ...prevTicket,
            [field]: value
        }))
    };

    return (
        <Modal onClose={onClose}>
            <div>
                <div className='flex items-center gap-8 justify-between p-8 py-4 border-b border-gray-100'>
                    <h1 className='font-bold text-sm'>
                        Edit Ticket
                    </h1>

                    <div>
                        <div className='cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full' onClick={onClose}>
                            <HiXMark className='w-5 h-5' />
                        </div>
                    </div>
                </div>

                <div className='space-y-8 p-8 max-h-[70vh] overflow-y-auto'>
                    <div>
                        <div className='mb-2'>
                            <InputField
                                type="text"
                                label='Name'
                                placeholder='VIP, Regular, Friends, Family, etc.'
                                value={ticket.name}
                                onChange={(e) => handleTicketChange('name', e.target.value)}
                                inputLeft={<FaTicketAlt className="text-gray-500" />}
                            />
                        </div>

                        <div className='mb-2 flex items-center gap-6'>
                            <InputField
                                type="number"
                                label='Price'
                                placeholder='Enter Ticket Price'
                                value={ticket.price}
                                onChange={(e) => handleTicketChange('price', e.target.value)}
                                inputLeft={<KesIcon />}
                            />

                            <InputField
                                type="number"
                                label='Quantity Available'
                                placeholder='Enter Ticket Quantity'
                                value={ticket.quantity_available}
                                onChange={(e) => handleTicketChange('quantity_available', e.target.value)}
                            />
                        </div>

                        <div className='mb-2'>
                            <InputField
                                label='Description'
                                placeholder='Enter Ticket Description...'
                                value={ticket.description}
                                onChange={(e) => handleTicketChange('description', e.target.value)}
                                inputLeft={<FaNoteSticky className="text-gray-500" />}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-center'>
                        <Button onClick={handleSubmitTicket} disabled={ticketsSubmitLoading}>
                            {
                                ticketsSubmitLoading ? <BarLoader color='white' /> : " Edit Ticket"
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditTicketModal;