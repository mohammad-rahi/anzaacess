import React from 'react';
import QRCode from 'react-qr-code';
import { EventTypes } from '../../event.types';
import AnzaAccessLogo from '@/components/Header/AnzaAccessLogo';

const Ticket = ({ event, bookingInfo, qr_uuid }: {
    event: EventTypes,
    bookingInfo: {
        event_id: number;
        ticket_id: number;
        name: string;
        email: string;
        phone: string;
    } | null,
    qr_uuid: string
}) => {
    return (
        <div id='ticket-container' className="bg-gradient-to-br from-indigo-500 via-blue-500 to-blue-600 w-full p-8 rounded-lg text-white">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold">{event.event_name}</h2>
                <p className="text-gray-300 text-base mt-4">{event.event_date} - {event.event_time}</p>
            </div>

            <div className="flex items-center justify-center gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <QRCode bgColor='transparent' color='white' value={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/api/qr/${qr_uuid}`} size={150} />
                </div>

                <div className="flex flex-col text-center">
                    <p className="text-lg mb-4">
                        <span className="font-bold">Ticket Type:</span> {'VIP'}
                    </p>
                    <p className="text-lg mb-4">
                        <span className="font-bold">Price:</span> ${45}
                    </p>
                    <p className="text-lg mb-4">
                        <span className="font-bold">Venue:</span> {event.event_venue}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
