'use client';

import React from 'react';
import { DatePicker, Form } from 'antd';
import { Element } from '../../utils/pdfExport';
import dayjs from 'dayjs';

interface PageDateTimeProps {
    element: Element;
    style?: React.CSSProperties;
    onChange: (value: any) => void;
    position?: { x: number; y: number; width: number; height: number };
    pageSize?: { width: number; height: number }; // thêm prop này
}

const PageDateTime: React.FC<PageDateTimeProps> = ({
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

    const fontSize = Math.max(Math.min(relHeight * 100, 16), 10);
    const paddingY = Math.max(Math.min(relHeight * 25, 8), 2);
    const paddingX = Math.max(Math.min(relWidth * 25, 12), 4);
    const borderRadius = Math.max(Math.min(Math.min(relHeight, relWidth) * 40, 8), 2);

    const dateValue = element.text ? dayjs(element.text) : null;

    return (
        <div style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: position.width,
            height: position.height,
            ...style,
        }}>
            <DatePicker
                value={dateValue}
                onChange={(date: dayjs.Dayjs | null) => onChange(date ? date.format('YYYY-MM-DD') : '')}
                style={{
                    width: '100%',
                    height: '100%',
                    border: `1px solid ${getBorderColor(element.confidence)}`,
                    borderRadius: `${borderRadius}px`,
                    padding: `${paddingY}px ${paddingX}px`,
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize,
                    boxShadow: getBoxShadow(element.confidence),
                    boxSizing: 'border-box',
                }}
            />
        </div>
    );
};

export default PageDateTime;
