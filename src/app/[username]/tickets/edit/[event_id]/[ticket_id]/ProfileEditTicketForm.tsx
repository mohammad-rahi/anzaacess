"use client";

import { EventTypes, TicketTypes } from '@/app/events/event.types'
import { Button } from '@/components';
import InputField from '@/components/InputField'
import { supabase } from '@/config/supabase';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaTicketAlt } from 'react-icons/fa'
import { FaNoteSticky } from 'react-icons/fa6';
import { BarLoader } from 'react-spinners';

const KesIcon = () => (
    <p className='text-gray-400 font-medium text-xs pr-1'>KSH</p>
);

const ProfileEditTicketForm = ({ getTicket, event }: { getTicket: TicketTypes, event: { id: string, event_name: string } }) => {
    const { user } = useAuthContext();

    const [ticket, setTicket] = useState<TicketTypes>({
        event_id: getTicket.id || '',
        profile_id: user?.id || '',
        name: '',
        description: '',
        price: 0,
        quantity_available: 0
    });
    const [ticketsSubmitLoading, setTicketSubmitLoading] = useState<boolean>(false);

    useEffect(() => {
        if (getTicket) {
            setTicket(getTicket);
        }
    }, [getTicket])


    // Function to update ticket details
    const handleTicketChange = <K extends keyof TicketTypes>(
        field: K,
        value: TicketTypes[K]
    ) => {
        setTicket((prevTicket) => ({
            ...prevTicket,
            [field]: value
        }))
    };

    const router = useRouter();

    const handleSubmitTicket = async () => {

        try {
            setTicketSubmitLoading(true);

            if (event.id) {
                const { error } = await supabase.from('event_tickets').update(ticket).eq('id', getTicket.id);
                if (error) {
                    console.error('Error creating ticket:', error);
                    return;
                }
                alert('Ticket updated successfully');
                router.push(`/${user?.username}/tickets`);
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


    return (
        <>
            <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-lg shadow-lg space-y-8">
                <div>
                    <InputField
                        type='text'
                        label='Event'
                        placeholder='Event'
                        value={event.event_name}
                        readOnly
                    />

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
                            onChange={(e) => handleTicketChange('price', e.target.value as any)}
                            inputLeft={<KesIcon />}
                        />

                        <InputField
                            type="number"
                            label='Quantity Available'
                            placeholder='Enter Ticket Quantity'
                            value={ticket.quantity_available}
                            onChange={(e) => handleTicketChange('quantity_available', e.target.value as any)}
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
                            ticketsSubmitLoading ? <BarLoader color='white' /> : " Update Ticket"
                        }
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProfileEditTicketForm