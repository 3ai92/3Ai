'use client';

import React from 'react';
import { Input, Form } from 'antd';
import { Element } from '../../utils/pdfExport';

interface PageTextareaProps {
    element: Element;
    style?: React.CSSProperties;
    onChange: (value: any) => void;
    position?: { x: number; y: number; width: number; height: number };
    pageSize?: { width: number; height: number };
}

const PageTextarea: React.FC<PageTextareaProps> = ({
    element,
    style,
    onChange,
    position,
    pageSize
}) => {
    const getBorderColor = (confidence: number = 1) => {
        if (confidence < 0.9) return 'red';
        return '#d9d9d9';
    };

    const getBoxShadow = (confidence: number = 1) => {
        return confidence < 0.5 ? '0 0 5px red' : 'none';
    };

    if (!position || !pageSize) return null;

    const relHeight = position.height / pageSize.height;
    const relWidth = position.width / pageSize.width;

    const fontSize = Math.max(Math.min(relHeight * 100, 16), 9);
    const paddingY = Math.max(Math.min(relHeight * 25, 8), 2);
    const paddingX = Math.max(Math.min(relWidth * 25, 12), 4);
    const borderRadius = Math.max(Math.min(Math.min(relHeight, relWidth) * 40, 8), 2);

    return (
        <div style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: position.width,
            height: position.height,
            ...style,
        }}>
            <Input.TextArea
                value={element.text}
                placeholder={element.type}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    height: '100%',
                    border: `1px solid ${getBorderColor(element.confidence)}`,
                    borderRadius: `${borderRadius}px`,
                    padding: `${paddingY}px ${paddingX}px`,
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize,
                    boxShadow: getBoxShadow(element.confidence),
                    resize: 'none',
                    boxSizing: 'border-box',
                }}
            />
        </div>
    );
};

export default PageTextarea;
