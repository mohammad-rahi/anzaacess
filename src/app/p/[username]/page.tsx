"use client";

import React, { useState, useEffect } from 'react';
import OverviewMetrics from '../../../components/DashboardComponents/OverviewMetrics';
import EventAnalytics from '../../../components/DashboardComponents/EventAnalytics';
import SalesRevenue from '../../../components/DashboardComponents/SalesRevenue';
import MarketingInsights from '../../../components/DashboardComponents/MarketingInsights';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/config/supabase';
import { BookingInfo, EventTypes, TicketTypes } from '@/app/events/event.types';
import { BsQrCode } from "react-icons/bs";
import QrReader from 'react-qr-scanner';
import { FaQrcode } from 'react-icons/fa';
import Modal from 'react-modal';
import { Button } from '@/components';
import { Modal as AlertModal } from 'antd';

const mockAttendeeData = [
  { id: 1, attendee_name: 'Attendee 1', /* other properties */ },
  { id: 2, attendee_name: 'Attendee 2', /* other properties */ },
  // ... add more sample attendees
];

// Define the ProfileDashboard component
const ProfileDashboard = () => {
  // State variables to hold fetched data
  const [attendeeData, setAttendeeData] = useState(mockAttendeeData);
  const [scanResult, setScanResult] = useState('');

  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [eventInfo, setEventInfo] = useState<EventTypes | null>(null);
  const [ticketInfo, setTicketInfo] = useState<TicketTypes | null>(null);

  const [totalTicketSales, setTotalTicketSales] = useState<number>(0);
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<'home' | 'analytics'>('home');
  const [isScanning, setIsScanning] = useState(false);

  // State variable to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [markAsUsedLoading, setMarkAsUsedLoading] = useState(false);
  const [isUsedTicket, setIsUsedTicket] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleScanStart = () => {
    setIsScanning(true);
    openModal();
  };

  const underlineStyle = {
    transform: `translateX(${activeTab === 'home' ? '0' : '100%'})`,
  };

  const handleApiCall = async (scannedUrl: string) => {
    try {
      // You can use the scanned URL for the API call
      const response = await fetch(scannedUrl);

      if (response.ok) {
        const data = await response.json();
        // Process the data as needed
        setBookingInfo(data.data.bookingInfo);
        setTicketInfo(data.data.ticketInfo);
        setEventInfo(data.data.eventInfo);
        setIsUsedTicket(data.data.bookingInfo.isUsed);
      } else {
        console.error('API Error:', response.statusText);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error making API call:', error);
      // Handle error scenarios
    }
  };


  // Function to handle QR code scan
  const handleScan = (data: any) => {
    if (data && isScanning) {
      setScanResult(data.text);
      setIsScanning(false);
      closeModal();

      // Call the function to handle the API call with the scanned URL
      handleApiCall(data.text);
    }
  };

  // Function to handle errors during scanning
  const handleError = (error: any) => {
    console.error('Error scanning QR code:', error);
    // Add additional error handling if needed
  };

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.id) {
          // Fetch events
          const { data: eventsData, error: eventsError } = await supabase
            .from('events')
            .select('id, event_name, event_date, event_time')
            .eq('profile_id', user?.id)
            .eq('status', 'published');

          if (eventsError) throw eventsError;

          if (eventsData) {
            setEvents(eventsData as EventTypes[]);
          }

          // Fetch bookings
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select('event_id')
            .eq('event_owner_id', user?.id);

          if (bookingsError) throw bookingsError;

          if (bookingsData) {
            setTotalTicketSales(bookingsData.length);

            // Process sales data based on fetched bookings
            const sales = eventsData.map((event) => {
              const ticketCount = bookingsData.filter((booking) => booking.event_id === event.id).length;
              return { ticketCount };
            });

            setSalesData(sales);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  const handleMarkTicketAsUsed = async () => {
    try {
      setMarkAsUsedLoading(true)

      if (bookingInfo?.id) {
        const { data, error } = await supabase
          .from('bookings')
          .update({ isUsed: true })
          .eq('id', bookingInfo.id).select('*');

        if (error) throw error;

        if (data) {
          setIsUsedTicket(true);
        }
      }
    } catch (error) {
      console.error('Error marking ticket as used:', error);
    } finally {
      setIsAlertModalOpen(false);
      setMarkAsUsedLoading(false);
    }
  }

  return (
    <div className='space-y-8'>
      <div className="flex relative rounded-md overflow-hidden border divide-x bg-white">
        <button
          className={`flex-1 px-4 py-2 focus:outline-none transition duration-300 ${activeTab === 'home'
            ? 'text-blue-500'
            : 'text-gray-500 hover:text-blue-500'
            }`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={`flex-1 px-4 py-2 focus:outline-none transition duration-300 ${activeTab === 'analytics'
            ? 'text-blue-500'
            : 'text-gray-500 hover:text-blue-500'
            }`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>

        <span
          className='absolute bottom-0 left-0 w-1/2 h-[2px] bg-blue-500 transition-transform duration-300'
          style={underlineStyle}
        />
      </div>

      {
        activeTab === 'home' ? (
          <div>
            {/* <h2 className="text-2xl font-bold mb-4">Scan Ticket Options</h2> */}
            <div className='grid grid-cols-2 gap-8'>
              <button
                className='flex flex-col items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 max-w-40 aspect-square'
                onClick={handleScanStart}
              >
                <FaQrcode className='h-20 w-20' />
                <span>Start Scan</span>
              </button>

              {/* ... Your existing code ... */}

              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Scan QR Code Modal"
                style={{
                  content: {
                    width: '70%', // Adjust the width as needed
                    maxHeight: '70%', // Adjust the maxHeight as needed
                    margin: 'auto',
                  }
                }}
              >
                <div className='flex flex-col items-center'>
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                  />
                  <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300' onClick={closeModal}>
                    Close Scan
                  </button>
                </div>
              </Modal>
            </div>


            {/* // Display scan result */}
            {scanResult && typeof scanResult === 'string' && (
              <div className='mt-8 space-y-4 bg-white rounded-md p-4 shadow-md divide-y'>
                <div className='flex items-center justify-between gap-8'>
                  <h2 className='text-xl font-bold'>Scanned Ticket:</h2>

                  {
                    bookingInfo?.id && (
                      <div>
                        <Button
                          variant={isUsedTicket ? "danger" : "primary"}
                          size='sm'
                          onClick={() => setIsAlertModalOpen(true)}
                          loading={markAsUsedLoading}
                          disabled={isUsedTicket}
                        >
                          {
                            isUsedTicket ? "Already Used" : "Mark Ticket As Used"
                          }
                        </Button>

                        <AlertModal
                          title="Ticket Marked As Used"
                          confirmLoading={markAsUsedLoading}
                          open={isAlertModalOpen}
                          onCancel={() => setIsAlertModalOpen(false)}
                          footer={[
                            <div key={"footer"} className="flex justify-end items-center gap-2 max-w-fit ml-auto">
                              <Button key="back" size='sm' variant='outline' onClick={() => setIsAlertModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button key="submit" size='sm' loading={markAsUsedLoading} onClick={handleMarkTicketAsUsed}>
                                Ok
                              </Button>
                            </div>,
                          ]}
                        >
                          <p>Ticket has been marked as used.</p>
                        </AlertModal>
                      </div>
                    )
                  }
                </div>
                <div className='space-y-4 pt-4'>
                  {/* Event Info Card */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Event Information</h3>
                    {eventInfo && (
                      <div className="bg-white shadow rounded-md p-4">
                        <p className="text-gray-600">Event Name: {eventInfo.event_name}</p>
                        <p className="text-gray-600">Date: {eventInfo.event_date}</p>
                        <p className="text-gray-600">Time: {eventInfo.event_time}</p>
                        <p className="text-gray-600">Venue: {eventInfo.event_venue}</p>
                        {/* Add more event details here */}
                      </div>
                    )}
                  </div>

                  {/* Ticket Info Card */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ticket Information</h3>
                    {ticketInfo && (
                      <div className="bg-white shadow rounded-md p-4">
                        <p className="text-gray-600">Ticket Name: {ticketInfo.name}</p>
                        <p className="text-gray-600">Price: ${ticketInfo.price}</p>
                        {/* <p className="text-gray-600">Quantity Available: {ticketInfo.quantity_available}</p> */}
                        {/* Add more ticket details here */}
                      </div>
                    )}
                  </div>

                  {/* Booking Info Card */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Booking Information</h3>
                    {bookingInfo && (
                      <div className="bg-white shadow rounded-md p-4">
                        <p className="text-gray-600">Booking Name: {bookingInfo.name}</p>
                        <p className="text-gray-600">Email: {bookingInfo.email}</p>
                        <p className="text-gray-600">Phone: {bookingInfo.phone}</p>
                        {/* Add more booking details here */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
            }

          </div >
        ) : (
          <div className='space-y-8'>
            {/* Overview Metrics Section */}
            <OverviewMetrics
              totalTicketSales={totalTicketSales}
              numberOfEvents={events.length || 0}
              numberOfAttendees={attendeeData.length}
              topSellingEvent={null}
            />

            {/* Event Analytics Section */}
            <EventAnalytics
              events={events}
              salesData={salesData}
            />

            {/* Sales & Revenue Section */}
            <SalesRevenue
              events={events}
              salesData={salesData}
            />

            {/* Marketing Insights Section */}
            {/* <MarketingInsights
          salesData={[]}
        /> */}
          </div>
        )
      }
    </div >
  );
};

// Helper functions for calculating metrics
const calculateTotalTicketSales = (salesData: any) => {
  // Implement logic to calculate total ticket sales from salesData
  return salesData.reduce((total: number, sale: any) => total + sale.ticketCount, 0);
};

const findTopSellingEvent = (salesData: any) => {
  // Implement logic to find the top-selling event from salesData
  const topSelling = salesData.reduce((prev: any, current: any) => (prev.ticketCount > current.ticketCount ? prev : current), {});
  return topSelling;
};

export default ProfileDashboard;
