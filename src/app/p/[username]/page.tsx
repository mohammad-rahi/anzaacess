"use client";

import React, { useState, useEffect } from 'react';
import OverviewMetrics from '../../../components/DashboardComponents/OverviewMetrics';
import EventAnalytics from '../../../components/DashboardComponents/EventAnalytics';
import SalesRevenue from '../../../components/DashboardComponents/SalesRevenue';
import MarketingInsights from '../../../components/DashboardComponents/MarketingInsights';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/config/supabase';
import { EventTypes } from '@/app/events/event.types';

const mockAttendeeData = [
  { id: 1, attendee_name: 'Attendee 1', /* other properties */ },
  { id: 2, attendee_name: 'Attendee 2', /* other properties */ },
  // ... add more sample attendees
];

// Define the ProfileDashboard component
const ProfileDashboard = () => {
  // State variables to hold fetched data
  const [attendeeData, setAttendeeData] = useState(mockAttendeeData);

  const [totalTicketSales, setTotalTicketSales] = useState<number>(0);
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);

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


  // Render the dashboard components with the fetched data
  return (
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
