"use client";

import React, { useState, useEffect } from 'react';
import OverviewMetrics from '../../../components/DashboardComponents/OverviewMetrics';
import EventAnalytics from '../../../components/DashboardComponents/EventAnalytics';
import SalesRevenue from '../../../components/DashboardComponents/SalesRevenue';
import MarketingInsights from '../../../components/DashboardComponents/MarketingInsights';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/config/supabase';
import { EventTypes } from '@/app/events/event.types';
import { BsQrCode } from "react-icons/bs";
import QrReader from 'react-qr-scanner'

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

  const [totalTicketSales, setTotalTicketSales] = useState<number>(0);
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<'home' | 'analytics'>('home');
  const [isScanning, setIsScanning] = useState(false);

  const handleScanStart = () => {
    setIsScanning(true);
  };

  const underlineStyle = {
    transform: `translateX(${activeTab === 'home' ? '0' : '100%'})`,
  };

  // Function to handle QR code scan
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
    }
  };

  // Function to handle errors during scanning
  const handleError = (error) => {
    console.error('Error scanning QR code:', error);
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
            <h2 className="text-2xl font-bold mb-4">Scan Ticket Options</h2>
            <div className='grid grid-cols-2 gap-8'>
              {/* QR Code Scanner */}
              {isScanning ? (
                <div className='flex items-center justify-center flex-col gap-4 w-full shadow p-4 rounded-lg bg-white cursor-pointer transition duration-300 hover:shadow-lg hover:bg-blue-600 hover:text-white'>
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                  />
                  <p className='text-center'>Scan Ticket with QR Code</p>
                </div>
              ) : (
                <div className='flex items-center justify-center flex-col gap-4 w-full shadow p-4 rounded-lg bg-white cursor-pointer transition duration-300 hover:shadow-lg hover:bg-blue-600 hover:text-white'>
                  <button onClick={handleScanStart}>Start Scan</button>
                  <p className='text-center'>Click the button to start scanning</p>
                </div>
              )}

              {/* ... Your existing code ... */}
            </div>

            {/* Display scan result */}
            {scanResult && typeof scanResult === 'string' && (
              <div className="mt-4">
                <p className="font-bold">Scanned QR Code:</p>
                <p>{scanResult}</p>
              </div>
            )}
          </div>
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
    </div>
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
