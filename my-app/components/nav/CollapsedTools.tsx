'use client';

import React from 'react';
import { Button, Divider, Space, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined, UploadOutlined } from '@ant-design/icons';

interface CollapsedToolsProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onImageUpload: (file: File, imageUrl: string) => void;
}

const CollapsedTools: React.FC<CollapsedToolsProps> = ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
    onZoomIn,
    onZoomOut,
    onImageUpload,
}) => {
    const handleUploadClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onImageUpload(file, imageUrl);
            }
        };
        input.click();
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Tooltip title="Previous Page" placement="right">
                <Button
                    icon={<LeftOutlined />}
                    onClick={onPrev}
                    disabled={currentPage === 1}
                    style={{ width: '100%' }}
                />
            </Tooltip>

            <div style={{
                textAlign: 'center',
                fontSize: 12,
                color: '#666',
                padding: '4px 0'
            }}>
                {currentPage}/{totalPages}
            </div>

            <Tooltip title="Next Page" placement="right">
                <Button
                    icon={<RightOutlined />}
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                    style={{ width: '100%' }}
                />
            </Tooltip>

            <Divider style={{ margin: '8px 0' }} />

            <Tooltip title="Zoom In" placement="right">
                <Button
                    icon={<ZoomInOutlined />}
                    onClick={onZoomIn}
                    style={{ width: '100%' }}
                />
            </Tooltip>

            <Tooltip title="Zoom Out" placement="right">
                <Button
                    icon={<ZoomOutOutlined />}
                    onClick={onZoomOut}
                    style={{ width: '100%' }}
                />
            </Tooltip>

            <Divider style={{ margin: '8px 0' }} />

            <Tooltip title="Upload Image" placement="right">
                <Button
                    icon={<UploadOutlined />}
                    style={{ width: '100%' }}
                    onClick={handleUploadClick}
                />
            </Tooltip>
        </Space>
    );
};

export default CollapsedTools;
