"use client";

import React, { useState } from 'react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { FaUser, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BarLoader } from 'react-spinners';
import { supabase } from '@/config/supabase';

const ContactPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear validation error on change
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Basic validation: Check if required fields are not empty
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Insert the form data into the 'contacts' table
            const { data, error } = await supabase.from('contacts').insert([formData]);

            if (error) {
                console.error('Error submitting form:', error);
                // Handle error, show error message, etc.
            } else {
                console.log('Form submitted successfully:', data);
                // Handle success, redirect, show success message, etc.
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            // Handle unexpected errors
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-8">We&apos;d love to hear from you. Reach out to us using the information below:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <form className="max-w-md" onSubmit={handleSubmit}>
                    <InputField
                        type="text"
                        name="name"
                        label="Your Name"
                        placeholder="John Doe"
                        inputLeft={<FaUser className="text-gray-500" />}
                        onChange={handleChange}
                        error={errors.name}
                    />

                    <InputField
                        type="email"
                        name="email"
                        label="Your Email"
                        placeholder="john@example.com"
                        inputLeft={<FaEnvelope className="text-gray-500" />}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <InputField
                        name="message"
                        label="Your Message"
                        placeholder="Write your message here..."
                        inputLeft={<FaMapMarkerAlt className="text-gray-500" />}
                        onChange={handleChange}
                        error={errors.message}
                    />

                    <div className="flex items-center justify-end">
                        <Button type='submit'>
                            {loading ? <BarLoader color='white' /> : 'Submit Message'}
                        </Button>
                    </div>
                </form>

                {/* Contact Information */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <p className="text-gray-600 mb-2">
                        <strong>Email:</strong> info@example.com
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Phone:</strong> +1 (123) 456-7890
                    </p>
                    <p className="text-gray-600">
                        <strong>Address:</strong> 123 Main St, Cityville, Country
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
