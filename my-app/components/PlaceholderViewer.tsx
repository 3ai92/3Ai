'use client';

import React from 'react';
import { Card, Image, Typography, Space } from 'antd';

const { Text } = Typography;

interface PlaceholderViewerProps {
    onUploadClick?: () => void;
}

const PlaceholderViewer: React.FC<PlaceholderViewerProps> = ({ onUploadClick }) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
        }}>
            <Card
                style={{
                    textAlign: 'center',
                    borderRadius: '6px',
                    maxWidth: '400px',
                    width: '100%'
                }}
            >
                <Space direction="vertical" size={32} style={{ width: '100%' }}>
                    <Image
                        src="/QR_Code.png"
                        alt="QR Code"
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '8px'
                        }}
                    />
                    
                    <div>
                        <Text style={{ 
                            fontSize: '12px', 
                            color: '#999'
                        }}>
                            Thank you for visiting our Smart Form Rebuild system.
                        </Text>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default PlaceholderViewer;