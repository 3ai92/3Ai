'use client';

import React from 'react';

interface DocumentFrameProps {
    children: React.ReactNode;
    width?: string;
    height?: string;
    style?: React.CSSProperties;
    aspectRatio?: number; // width / height
}

const DocumentFrame: React.FC<DocumentFrameProps> = ({
    children,
    width = '100%',
    height,
    style,
    aspectRatio
}) => {
    if (width && height) {
        return (
            <div style={{ width, height, ...style }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: '#fefefe',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    borderRadius: 4,
                    border: '2px solid #d9d9d9',
                    overflow: 'hidden'
                }}>
                    {children}
                </div>
            </div>
        );
    }
    const paddingTop = aspectRatio ? `${(1 / aspectRatio) * 100}%` : '141.42%';
    return (
        <div style={{ width, ...style }}>
            <div style={{
                position: 'relative',
                paddingTop,
                background: '#fefefe',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: 4,
                border: '2px solid #d9d9d9'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DocumentFrame;
