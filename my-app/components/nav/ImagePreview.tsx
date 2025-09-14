'use client';

import React, { useState } from 'react';
import { Card, Modal, Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

interface ImagePreviewProps {
    imageUrl?: string;
    fileName?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, fileName }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    if (!imageUrl) {
        return (
            <Card
                size="small"
                style={{ 
                    marginBottom: 16,
                    textAlign: 'center',
                    minHeight: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ color: '#999', fontSize: 12 }}>
                    No image uploaded
                </div>
            </Card>
        );
    }

    return (
        <>
            <Card
                size="small"
                style={{ 
                    marginBottom: 16,
                    cursor: 'pointer',
                    position: 'relative'
                }}
                onClick={() => setIsModalVisible(true)}
            >
                <div style={{ 
                    position: 'relative',
                    height: 100,
                    overflow: 'hidden',
                    borderRadius: 4
                }}>
                    <Image
                        src={imageUrl}
                        alt={fileName || 'Uploaded image'}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                        }}
                        preview={false}
                    />
                    <div style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12
                    }}>
                        <EyeOutlined />
                    </div>
                </div>
                {fileName && (
                    <div style={{ 
                        fontSize: 10, 
                        color: '#666', 
                        marginTop: 4,
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {fileName}
                    </div>
                )}
            </Card>

            <Modal
                title={`Image Preview${fileName ? ` - ${fileName}` : ''}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width="80%"
                style={{ top: 20 }}
            >
                <div style={{ textAlign: 'center' }}>
                    <Image
                        src={imageUrl}
                        alt={fileName || 'Uploaded image'}
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '70vh',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ImagePreview;
