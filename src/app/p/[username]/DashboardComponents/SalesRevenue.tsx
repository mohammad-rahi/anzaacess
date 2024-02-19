import React from 'react';
import { Card } from 'antd';
import ReactApexChart from 'react-apexcharts';
import { EventTypes } from '@/app/events/event.types';

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
            categories: events.map((event) => event.event_name.length > 15 ? `${event.event_name.slice(0, 15)}...` : event.event_name),
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
                <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={300} />
            </div>
        </Card>
    );
};

export default SalesRevenue;