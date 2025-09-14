'use client';

import React from 'react';
import { Button, Card, Space, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

interface NavigationToolsProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

const NavigationTools: React.FC<NavigationToolsProps> = ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
    onZoomIn,
    onZoomOut,
}) => {
    return (
        <Card
            title="Navigation"
            size="small"
            style={{ marginBottom: 16 }}
            styles={{
                body: { padding: '12px' }
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space.Compact style={{ width: '100%' }}>
                    <Tooltip title="Previous Page">
                        <Button
                            icon={<LeftOutlined />}
                            onClick={onPrev}
                            disabled={currentPage === 1}
                            style={{ flex: 1 }}
                        />
                    </Tooltip>
                    <Button
                        disabled
                        style={{
                            pointerEvents: 'none',
                            flex: 2,
                            textAlign: 'center'
                        }}
                    >
                        {currentPage} / {totalPages}
                    </Button>
                    <Tooltip title="Next Page">
                        <Button
                            icon={<RightOutlined />}
                            onClick={onNext}
                            disabled={currentPage === totalPages}
                            style={{ flex: 1 }}
                        />
                    </Tooltip>
                    <Tooltip title="Zoom In">
                        <Button
                            icon={<ZoomInOutlined />}
                            onClick={onZoomIn}
                            style={{ flex: 1 }}
                        />
                    </Tooltip>
                    <Tooltip title="Zoom Out">
                        <Button
                            icon={<ZoomOutOutlined />}
                            onClick={onZoomOut}
                            style={{ flex: 1 }}
                        />
                    </Tooltip>
                </Space.Compact>
            </Space>
        </Card>
    );
};

export default NavigationTools;
