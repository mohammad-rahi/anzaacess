"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@/components';
import { EventTypes, TicketTypes } from '../../event.types';
import { useForm, SubmitHandler } from 'react-hook-form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';

import { makeMpesaPayment, makeCardPayment, FormValues } from './paymentUtils';
import { supabase } from '@/config/supabase';
import { BarLoader } from 'react-spinners';

interface TicketCheckoutModalProps {
    event: EventTypes;
    ticket: TicketTypes;
    onClose: () => void;
}

const TicketCheckoutModal: React.FC<TicketCheckoutModalProps> = ({ event, ticket, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [qrCodeValue, setQRCodeValue] = useState<string | null>(null);
    const [bookingSubmitLoading, setBookingSubmitLoading] = useState(false);

    const [bookingInfo, setBookingInfo] = useState<{
        event_id: number;
        ticket_id: number;
        name: string;
        email: string;
        phone: string;
    } | null>(null);

    const [pdfSrc, setPdfSrc] = useState(null);

    useEffect(() => {
        const fetchAndGeneratePDF = async () => {
            const response = await fetch('/event_ticket_template.html');
            const htmlTemplate = await response.text();

            // You can update the dynamic values here
            const dynamicValues = {
                eventTitle: 'Awesome Event',
                eventDate: 'January 1, 2023',
                eventTime: '7:00 PM - 10:00 PM',
                eventLocation: 'Venue Name, City',
                ticketNumber: '123456789',
                qrCodeValue: 'https://example.com', // Replace with your dynamic QR code value
            };

            // const updatedHtml = htmlTemplate.replace(
            //     /{{([^}]+)}}/g,
            //     (match, p1) => dynamicValues[p1.trim()] || match
            // );

            // const pdf = new jsPDF();
            // pdf.fromHTML(updatedHtml, 0, 0, {}, () => {
            //     setPdfSrc(pdf.output('datauri'));
            // });
        };

        fetchAndGeneratePDF();
    }, []);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (event.id && ticket.id && data.name && data.email && data.phone) {
                setBookingSubmitLoading(true);

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

                        },
                    ]);

                if (error) {
                    throw new Error('Failed to store booking information in Supabase');
                }

                // Update the local state with the stored booking information
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
            // onClose();
        } catch (error) {
            console.error('Booking and payment failed:', error);
        }
        finally {
            setBookingSubmitLoading(false);
        }
    };


    return (
        <Modal onClose={onClose}>
            <div>
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

                {bookingInfo && (
                    <div>
                        <h2>Booking Information</h2>
                        <p>Name: {bookingInfo.name}</p>
                        <p>Email: {bookingInfo.email}</p>
                        <p>Phone: {bookingInfo.phone}</p>
                    </div>
                )}

                {pdfSrc && (
                    <>
                        <div dangerouslySetInnerHTML={{ __html: pdfSrc }} />
                        {/* Download Ticket Button */}
                        <div className="flex justify-end mt-4">
                            <Button onClick={() => window.open(pdfSrc, '_blank')}>Download Ticket</Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default TicketCheckoutModal;
