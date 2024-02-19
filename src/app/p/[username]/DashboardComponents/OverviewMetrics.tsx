import { EventTypes } from '@/app/events/event.types';
import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col } from 'antd';

type OverviewMetricsProps = {
    totalTicketSales: number;
    numberOfEvents: number;
    numberOfAttendees: number;
    topSellingEvent: EventTypes | null;
};

const OverviewMetrics: React.FC<OverviewMetricsProps> = ({ totalTicketSales, numberOfEvents, numberOfAttendees, topSellingEvent }) => {
    return (
        <Card title="Overview Metrics" style={{ borderRadius: '15px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
            <Row gutter={[16, 16]} justify="space-around">
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Statistic title="Total Ticket Sales" value={totalTicketSales} />
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Statistic title="Number of Events" value={numberOfEvents} />
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    {/* <Statistic title="Number of Attendees" value={numberOfAttendees} /> */}
                    <Statistic title="Number of Attendees" value={0} />
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Statistic title="Top Selling Event" value={topSellingEvent ? topSellingEvent.event_name : 'N/A'} />
                </Col>
            </Row>
        </Card>
    );
};

export default OverviewMetrics;
