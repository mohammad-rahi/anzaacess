import React from 'react';
import { Card } from 'antd';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { EventTypes } from '@/app/events/event.types';
import dynamic from 'next/dynamic';

interface SalesRevenueProps {
    events: EventTypes[];
    salesData: { ticketCount: number }[];
}

const SalesRevenue: React.FC<SalesRevenueProps> = ({ events, salesData }) => {
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
            },
        },
        xaxis: {
            categories: events.map((event) => event?.event_name?.length > 15 ? `${event?.event_name?.slice(0, 15)}...` : event?.event_name),
        },
        yaxis: {
            title: {
                text: 'Ticket Sales',
            },
        },
    };

    const chartSeries = [
        {
            name: 'Ticket Sales',
            data: salesData.map((sale) => sale.ticketCount),
        },
    ];

    return (
        <Card title="Sales & Revenue" style={{ borderRadius: '15px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ height: '300px' }}>
                {
                    (salesData.length > 0) ? <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={300} /> : <p>No data available</p>
                }
            </div>
        </Card>
    );
};

export default SalesRevenue;