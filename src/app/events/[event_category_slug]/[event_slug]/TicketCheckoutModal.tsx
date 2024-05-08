"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@/components';
import { EventTypes, TicketTypes } from '../../event.types';
import { useForm, SubmitHandler } from 'react-hook-form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { v4 as uuidv4 } from 'uuid';

import { makeMpesaPayment, makeCardPayment, FormValues } from './paymentUtils';
import { supabase } from '@/config/supabase';
import { BarLoader } from 'react-spinners';
import Ticket from './Ticket';

interface TicketCheckoutModalProps {
    event: EventTypes;
    ticket: TicketTypes;
    onClose: () => void;
}

const TicketCheckoutModal: React.FC<TicketCheckoutModalProps> = ({ event, ticket, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [bookingSubmitLoading, setBookingSubmitLoading] = useState(false);
    const [qrUuid, setQrUuid] = useState<string | null>(null);

    const [bookingInfo, setBookingInfo] = useState<{
        event_id: number;
        ticket_id: number;
        name: string;
        email: string;
        phone: string;
    } | null>(null);


    // const downloadTicket = () => {
    //     const ticketContainer = document.getElementById('ticket-container');

    //     if (ticketContainer) {
    //         html2canvas(ticketContainer)
    //             .then((canvas) => {
    //                 const imgData = canvas.toDataURL('image/png');

    //                 // Set predefined dimensions for the PDF ticket
    //                 const pdfWidth = 150; // Width in mm

    //                 // Calculate aspect ratio to maintain the same ratio as the canvas
    //                 const aspectRatio = canvas.width / canvas.height;
    //                 const pdfHeightAdjusted = pdfWidth / aspectRatio;

    //                 // Determine margin based on device size
    //                 const isSmallDevice = window.innerWidth < 768; // Example threshold for small devices

    //                 // Create PDF
    //                 const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeightAdjusted]);
    //                 pdf.addImage(imgData, 'PNG', 5, 5, pdfWidth - 10, pdfHeightAdjusted - 20); // Leave some margin


    //                 // Save PDF
    //                 pdf.save(`ticket_${event.event_name.replace(/\s+/g, '_')}.pdf`);

    //                 onClose();

    //                 alert("Booking successful, the ticket has been downloaded");
    //             })
    //             .catch((error) => {
    //                 console.error('Error generating PDF:', error);
    //             });
    //     }
    // };


    const downloadTicket = () => {
        const ticketContainer = document.getElementById('ticket-container');

        if (ticketContainer) {
            html2canvas(ticketContainer)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');

                    // Set predefined dimensions for the PDF ticket
                    const pdfWidth = 100; // Width in mm (adjust as needed for smaller size)

                    // Calculate aspect ratio to maintain the same ratio as the canvas
                    const aspectRatio = canvas.width / canvas.height;
                    const pdfHeightAdjusted = pdfWidth / aspectRatio;

                    // Determine margin based on device size
                    const marginLeft = 5; // Left margin in mm
                    const marginRight = 5; // Right margin in mm
                    const marginTop = 5; // Top margin in mm
                    const marginBottom = 5; // Bottom margin in mm

                    // Create PDF
                    const pdf = new jsPDF('p', 'mm', [pdfWidth + marginLeft + marginRight, pdfHeightAdjusted + marginTop + marginBottom]);
                    pdf.addImage(imgData, 'PNG', marginLeft, marginTop, pdfWidth, pdfHeightAdjusted); // Leave some margin

                    // Save PDF
                    pdf.save(`ticket_${event.event_name.replace(/\s+/g, '_')}.pdf`);

                    onClose();

                    alert("Booking successful, the ticket has been downloaded");
                })
                .catch((error) => {
                    console.error('Error generating PDF:', error);
                });
        }
    };


    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        try {
            if (event.id && ticket.id && data.name && data.email && data.phone) {
                setBookingSubmitLoading(true);

                const qr_uuid = uuidv4();

                setQrUuid(qr_uuid);

                if (!qr_uuid) return;

                // Store the booking information in the Supabase table
                const { data: bookingData, error } = await supabase
                    .from('bookings')
                    .insert([
                        {
                            event_owner_id: event.profile_id,
                            event_id: event.id,
                            ticket_id: ticket.id,
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            qr_uuid
                        },
                    ]);

                if (error) {
                    throw new Error('Failed to store booking information in Supabase');
                }

                // // Update the local state with the stored booking information
                setBookingInfo({
                    event_id: event.id,
                    ticket_id: ticket.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                });
            }

            // Process payment based on the selected payment option
            // if (data.paymentOption === 'mpesa') {
            //     await makeMpesaPayment(data);
            // } else if (data.paymentOption === 'card') {
            //     await makeCardPayment(data);
            // }

            // Close the modal after successful submission and payment
            onClose();

            setTimeout(() => {
                downloadTicket();
            }, 100);
        } catch (error) {
            console.error('Booking and payment failed:', error);
        }
        finally {
            setBookingSubmitLoading(false);
        }
    };

    return (
        <Modal onClose={onClose} onlyCloseBtn>
            <div className='overflow-y-auto max-h-[700px]'>
                <div className='border-b border-gray-100 flex items-center justify-between gap-8 p-8 py-4'>
                    <h2 className='text-2xl font-bold'>Checkout Ticket</h2>
                    <button className='text-gray-500 hover:underline' onClick={onClose}>
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-8 py-4'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            placeholder='Enter name'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 read-only:cursor-not-allowed read-only:opacity-50"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type='email'
                            placeholder='Enter email address'
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 read-only:cursor-not-allowed read-only:opacity-50"
                        />
                        {
                            errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )
                        }
                    </div>

                    <div>
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">
                            Phone <span className='text-gray-500 text-xs'>(Including country code)</span>
                        </label>
                        <input
                            type='number'
                            {...register('phone', { required: 'Phone is required' })}
                            placeholder='Enter phone number'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 read-only:cursor-not-allowed read-only:opacity-50"
                        />
                        {
                            errors.phone && (
                                <span className="text-red-500 text-sm">{errors.phone.message}</span>
                            )
                        }
                    </div>

                    {/* Payment Option */}
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Option</label>
                        <select
                            {...register('paymentOption', { required: 'Payment option is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 read-only:cursor-not-allowed read-only:opacity-50"
                        >
                            <option value="">Select Payment Option</option>
                            <option value="mpesa">M-Pesa Daraja API</option>
                            <option value="card">Card</option>
                        </select>
                        {errors.paymentOption && (
                            <span className="text-red-500 text-sm">{errors.paymentOption.message}</span>
                        )}
                    </div> */}

                    {/* Action buttons */}
                    <div className="flex justify-end">
                        <Button type="submit">
                            {bookingSubmitLoading ? <BarLoader color="white" /> : 'Submit'}
                        </Button>
                    </div>
                </form>

                {(qrUuid && bookingInfo) && (
                    <div className='p-8'>
                        <Ticket bookingInfo={bookingInfo} event={event} qr_uuid={qrUuid} />

                        <div className="flex justify-end mt-4">
                            <Button onClick={downloadTicket}>Download Ticket</Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default TicketCheckoutModal;
