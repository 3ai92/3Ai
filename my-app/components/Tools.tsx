'use client';

import React from 'react';
import { Button, Card, Divider, Space, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

interface ToolsProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

const Tools: React.FC<ToolsProps> = ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
    onZoomIn,
    onZoomOut,
}) => {
    return (
        <Card
            styles={{ body: { padding: '8px 16px', display: 'flex', alignItems: 'center' } }}
            style={{ border: 'none', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', background: '#f8f8f8' }}
        >
            <Space split={<Divider type="vertical" />} size="middle">
                <Space.Compact>
                    <Tooltip title="Previous Page">
                        <Button icon={<LeftOutlined />} onClick={onPrev} disabled={currentPage === 1} />
                    </Tooltip>
                    <Button disabled style={{ pointerEvents: 'none' }}>
                        Page {currentPage} / {totalPages}
                    </Button>
                    <Tooltip title="Next Page">
                        <Button icon={<RightOutlined />} onClick={onNext} disabled={currentPage === totalPages} />
                    </Tooltip>
                </Space.Compact>
                <Space.Compact>
                    <Tooltip title="Zoom In">
                        <Button icon={<ZoomInOutlined />} onClick={onZoomIn} />
                    </Tooltip>
                    <Tooltip title="Zoom Out">
                        <Button icon={<ZoomOutOutlined />} onClick={onZoomOut} />
                    </Tooltip>
                </Space.Compact>
            </Space>
        </Card>
    );
};

export default Tools;