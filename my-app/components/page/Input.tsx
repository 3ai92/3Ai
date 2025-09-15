'use client';

import React from 'react';
import { Input as AntInput, Form } from 'antd';
import { Element } from '../../utils/pdfExport';

interface PageInputProps {
    element: Element;
    style?: React.CSSProperties;
    onChange: (value: any) => void;
    position?: { x: number; y: number; width: number; height: number };
    pageSize?: { width: number; height: number };
}

const PageInput: React.FC<PageInputProps> = ({
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

    if (!position) return null;

    const fontSize = Math.max(Math.min(position.height * 0.4, 16), 9);
    const paddingY = Math.max(Math.min(position.height * 0.08, 4), 1);
    const paddingX = Math.max(Math.min(position.width * 0.03, 8), 2);
    const borderRadius = Math.max(Math.min(Math.min(position.height, position.width) * 0.08, 5), 1);

    const safe = (v: number) => Math.max(0, Number.isFinite(v) ? v : 0);

    return (
        <div style={{
            position: 'absolute',
            left: safe(position.x),
            top: safe(position.y),
            width: safe(position.width),
            height: safe(position.height),
            ...style,
        }}>
            <AntInput
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
                    boxSizing: 'border-box',
                }}
            />
        </div>
    );
};

export default PageInput;
