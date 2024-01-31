"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@/components';
import { EventTypes, TicketTypes } from '../../event.types';
import { useForm, SubmitHandler } from 'react-hook-form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';

interface TicketCheckoutModalProps {
    event: EventTypes;
    ticket: TicketTypes;
    onClose: () => void;
}

type FormValues = {
    name: string;
    email: string;
};

const TicketCheckoutModal: React.FC<TicketCheckoutModalProps> = ({ event, ticket, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [qrCodeValue, setQRCodeValue] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormValues>({ name: '', email: '' });

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

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        // Handle form submission logic here (e.g., book the ticket)
        console.log('Form data submitted:', data);

        // Generate a unique QR code value based on user information
        const qrCodeData = `${data.name}-${data.email}-${Date.now()}`;
        setQRCodeValue(qrCodeData);
        setFormData(data);

        // Close the modal after successful submission
        // onClose();
    };

    return (
        <Modal onClose={onClose}>
            <div className="p-4">
                <div className='border-b border-gray-100 flex items-center justify-between gap-8 p-4'>
                    <h2 className='text-2xl font-bold'>Checkout Ticket</h2>
                    <button className='text-gray-500 hover:underline' onClick={onClose}>
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
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
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 read-only:cursor-not-allowed read-only:opacity-50"
                        />
                        {
                            errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )
                        }
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end">
                        <Button type="submit">Book Now</Button>
                    </div>
                </form>

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
