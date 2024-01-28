import React from 'react';
import { Modal, Button } from '@/components';
import { TicketTypes } from '../../event.types';
import { useForm, SubmitHandler } from 'react-hook-form';

interface TicketCheckoutModalProps {
    ticket: TicketTypes;
    onClose: () => void;
}

type FormValues = {
    name: string;
    email: string;
};

const TicketCheckoutModal: React.FC<TicketCheckoutModalProps> = ({ ticket, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        // Handle form submission logic here (e.g., book the ticket)
        console.log('Form data submitted:', data);

        // Close the modal after successful submission
        onClose();
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
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
                            className='mt-1 p-2 border border-gray-300 rounded-md w-full'
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
            </div>
        </Modal>
    );
};

export default TicketCheckoutModal;
