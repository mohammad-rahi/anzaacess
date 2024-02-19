import React from 'react';
import { Card, Row, Col, List, Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';

const { Text } = Typography;

const MarketingInsights = ({ salesData }: { salesData: any }) => {
    // Mock data for marketing insights
    const mockMarketingData = [
        { id: 1, insight: 'Optimize social media campaigns for Event 1' },
        { id: 2, insight: 'Run targeted ads for top-selling events' },
        { id: 3, insight: 'Create promotional offers for Event 2' },
        // ... add more mock insights
    ];

    // Mock data for additional visualization (bar chart)
    const additionalChartData = {
        categories: ['Category A', 'Category B', 'Category C', 'Category D'],
        series: [
            { name: 'Insight 1', data: [30, 45, 25, 60] },
            // Add more series as needed
        ],
    };

    const chartOptions = {
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
            categories: additionalChartData.categories,
        },
        yaxis: {
            title: {
                text: 'Additional Visualization',
            },
        },
    };

    return (
        <Card title="Marketing Insights" style={{ borderRadius: '15px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
            <div>
                <h2>Marketing Insights</h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={12}>
                        <List
                            dataSource={mockMarketingData}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Text>{item.insight}</Text>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col xs={24} sm={12} lg={12}>
                        {/* Additional visualization (bar chart) */}
                        <ReactApexChart options={chartOptions as ApexCharts.ApexOptions} series={additionalChartData.series} type="bar" height={300} />
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default MarketingInsights;
