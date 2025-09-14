'use client';

import React from 'react';

interface DocumentFrameProps {
    children: React.ReactNode;
    width?: string;
    style?: React.CSSProperties;
}

const DocumentFrame: React.FC<DocumentFrameProps> = ({ children, width = '100%', style }) => {
    return (
        <div style={{ width, ...style }}>
            <div style={{
                position: 'relative',
                paddingTop: '141.42%',
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
