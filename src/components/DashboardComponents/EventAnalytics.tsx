import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { EventTypes } from '@/app/events/event.types';

export interface SaleData {
    ticketCount: number;
    // ... other properties
}

type EventAnalyticsProps = {
    events: EventTypes[];
    salesData: SaleData[];
};

const EventAnalytics: React.FC<EventAnalyticsProps> = ({ events, salesData }) => {
    if (!salesData.length || !events.length) {
        // Handle the case when data is not available
        return <div>No data available for event analytics.</div>;
    }

    // Import ApexCharts only on the client side
    const ReactApexChart = require('react-apexcharts').default;

    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'line',
            zoom: {
                enabled: false,
            },
        },
        xaxis: {
            categories: events.map((event) => event.event_name.length > 10 ? `${event.event_name.slice(0, 10)}...` : event.event_name),
        },
        yaxis: {
            title: {
                text: 'Ticket Sales',
            },
        },
        legend: {
            labels: {
                useSeriesColors: true,
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
        <Card title="Event Analytics" style={{ borderRadius: '15px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Statistic title="Total Events" value={events.length} />
                </Col>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Statistic title="Average Attendance" value={0} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
                </Col>
            </Row>
        </Card>
    );
};

const calculateAverageAttendance = (events: EventTypes[]) => {
    const totalAttendees = events.reduce((sum, event) => sum + 234897, 0);
    return totalAttendees / events.length || 0;
};

export default EventAnalytics;
