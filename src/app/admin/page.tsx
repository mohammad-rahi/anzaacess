"use client";
import React, { useEffect, useState } from 'react'
import OverviewMetrics from '../p/[username]/DashboardComponents/OverviewMetrics'
import EventAnalytics from '../p/[username]/DashboardComponents/EventAnalytics'
import SalesRevenue from '../p/[username]/DashboardComponents/SalesRevenue'
import { EventTypes } from '../events/event.types'
import { supabase } from '@/config/supabase';

const AdminPage = () => {
  const [attendeeData, setAttendeeData] = useState([]);

  const [totalTicketSales, setTotalTicketSales] = useState<number>(0);
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);

  // const { user } = useAuthContext();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('id, event_name, event_date, event_time')
          .eq('status', 'published');

        if (eventsError) throw eventsError;

        if (eventsData) {
          setEvents(eventsData as EventTypes[]);
        }

        // Fetch bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('event_id')

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

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='space-y-8'>
      {/* Overview Metrics Section */}
      <OverviewMetrics
        totalTicketSales={totalTicketSales}
        numberOfEvents={events.length || 5}
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

export default AdminPage