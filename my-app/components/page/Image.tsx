'use client';

import React from 'react';
import { Element } from '../../utils/pdfExport';

interface PageImageProps {
    element: Element;
    style?: React.CSSProperties;
    position?: { x: number; y: number; width: number; height: number };
}

const PageImage: React.FC<PageImageProps> = ({
    element,
    style,
    position
}) => {
    if (!position) return null;

    const getBorderColor = (confidence: number = 1) => {
        if (confidence < 0.9) return 'red';
        return '#d9d9d9';
    };

    return (
        <div style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: position.width,
            height: position.height,
            border: `2px solid ${getBorderColor(element.confidence)}`,
            borderRadius: '4px',
            overflow: 'hidden',
            ...style,
        }}>
            {element.imageUrl ? (
                <img
                    src={element.imageUrl}
                    alt={element.field_name ?? 'Image'}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                            parent.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; font-size: 12px;">Image Load Failed</div>';
                        }
                    }}
                />
            ) : (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: '#999',
                    fontSize: '12px',
                    background: '#f5f5f5',
                }}>
                    No Image
                </div>
            )}
        </div>
    );
};

export default PageImage;
