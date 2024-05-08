import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { EventTypes } from '../../event.types';

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
    const [qrCodeSize, setQRCodeSize] = useState<number>(100); // Adjust QR code size for mobile devices

    useEffect(() => {
        const updateQRCodeSize = () => {
            const newSize = Math.min(window.innerWidth / 4, 100); // Adjust size for smaller screens
            setQRCodeSize(newSize);
        };

        // Update QR code size initially and add event listener for window resize
        updateQRCodeSize();
        window.addEventListener('resize', updateQRCodeSize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateQRCodeSize);
        };
    }, []);

    return (
        <div id='ticket-container' className="ticket-container bg-gradient-to-br from-indigo-500 via-blue-500 to-blue-600 w-full p-4 md:p-8 rounded-lg text-white space-y-4 md:space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-xl md:text-3xl font-bold">{event.event_name}</h1>
                <p className="text-gray-300 text-sm md:text-base">{event.event_date} - {event.event_time}</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <QRCode bgColor='transparent' color='white' value={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/api/qr/${qr_uuid}`} size={qrCodeSize} />
                </div>

                <div className="flex flex-col text-center md:text-left flex-grow">
                    <p className="text-sm md:text-lg mb-2">
                        <span className="font-bold">Ticket Type:</span> {'VIP'}
                    </p>
                    <p className="text-sm md:text-lg mb-2">
                        <span className="font-bold">Price:</span> ${45}
                    </p>
                    <p className="text-sm md:text-lg mb-2">
                        <span className="font-bold">Venue:</span> {event.event_venue}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
