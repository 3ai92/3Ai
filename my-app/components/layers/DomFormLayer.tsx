'use client';

import React from 'react';
import { Select, InputNumber, Table } from 'antd';
import { Element } from '../../utils/pdfExport';
import { PageInput, PageDateTime, PageCheckbox, PageTextarea, PageImage } from '../page';

interface DomFormLayerProps {
    elements: Element[];
    scale: number;
    offsetX: number;
    offsetY: number;
    viewportWidth: number;
    viewportHeight: number;
    onChange: (id: string, value: any) => void;
    style?: React.CSSProperties;
    pageSize?: { width: number; height: number };
}

const DomFormLayer: React.FC<DomFormLayerProps> = ({
    elements,
    scale,
    offsetX,
    offsetY,
    viewportWidth,
    viewportHeight,
    onChange,
    style,
    pageSize,
}) => {
    const renderElement = (el: Element) => {
        const [x1, y1, x2, y2] = el.bbox;

        let viewX = x1 * scale + offsetX;
        let viewY = y1 * scale + offsetY;
        let viewW = (x2 - x1) * scale;
        let viewH = (y2 - y1) * scale;

        if (pageSize) {
            const relX = x1 / pageSize.width;
            const relY = y1 / pageSize.height;
            const relW = (x2 - x1) / pageSize.width;
            const relH = (y2 - y1) / pageSize.height;
            viewX = relX * viewportWidth;
            viewY = relY * viewportHeight;
            viewW = relW * viewportWidth;
            viewH = relH * viewportHeight;
        }

        const safe = (v: number) => Math.max(0, Number.isFinite(v) ? v : 0);
        viewX = safe(viewX);
        viewY = safe(viewY);
        viewW = safe(viewW);
        viewH = safe(viewH);

        const elementStyle = {
            position: 'absolute' as const,
            left: viewX,
            top: viewY,
            width: viewW,
            height: viewH,
            padding: '2px',
        };

        if (el.role === 'label') {
            const getBorderColor = (confidence: number = 1) => {
                if (confidence < 0.9) return 'red';
                return 'transparent';
            };

            return (
                <div key={el.id} style={{
                    ...elementStyle,
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize: Math.min(viewH * 0.8, 14),
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    border: `2px solid ${getBorderColor(el.confidence)}`,
                    borderRadius: '4px',
                    padding: '4px',
                }}>
                    {el.text}
                </div>
            );
        }

        if (el.role === 'image') {
            return (
                <PageImage
                    key={el.id}
                    element={el}
                    position={{ x: viewX, y: viewY, width: viewW, height: viewH }}
                />
            );
        }

        if (el.role === 'table' && el.elements) {
            const columns = [
                { title: '期間', dataIndex: 'date', key: 'date' },
                { title: '会社名', dataIndex: 'company', key: 'company' },
                { title: '役割', dataIndex: 'role', key: 'role' },
            ];

            const data = [];
            for (let i = 0; i < el.elements.length; i += 3) {
                data.push({
                    key: i / 3,
                    date: el.elements[i]?.text || '',
                    company: el.elements[i + 1]?.text || '',
                    role: el.elements[i + 2]?.text || '',
                });
            }

            const getBorderColor = (confidence: number = 1) => {
                if (confidence < 0.9) return 'red';
                return 'transparent';
            };

            return (
                <div key={el.id} style={{
                    ...elementStyle,
                    border: `2px solid ${getBorderColor(el.confidence)}`,
                    borderRadius: '4px',
                    padding: '4px',
                }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        size="small"
                        bordered
                        style={{ fontSize: '12px' }}
                    />
                </div>
            );
        }

        const handleChange = (value: any) => onChange(el.id, value);

        switch (el.type) {
            case 'text':
                return (
                    <PageInput
                        key={el.id}
                        element={el}
                        onChange={handleChange}
                        position={{ x: viewX, y: viewY, width: viewW, height: viewH }}
                        pageSize={pageSize}
                    />
                );

            case 'textarea':
                return (
                    <PageTextarea
                        key={el.id}
                        element={el}
                        onChange={handleChange}
                        position={{ x: viewX, y: viewY, width: viewW, height: viewH }}
                        pageSize={pageSize}
                    />
                );

            case 'date':
                return (
                    <PageDateTime
                        key={el.id}
                        element={el}
                        onChange={handleChange}
                        position={{ x: viewX, y: viewY, width: viewW, height: viewH }}
                        pageSize={pageSize}
                    />
                );

            case 'checkbox':
                return (
                    <PageCheckbox
                        key={el.id}
                        element={el}
                        onChange={handleChange}
                        position={{ x: viewX, y: viewY, width: viewW, height: viewH }}
                        pageSize={pageSize}
                    />
                );

            case 'select':
                return (
                    <div key={el.id} style={elementStyle}>
                        <Select
                            value={el.text}
                            placeholder={el.type}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: `2px solid ${(el.confidence ?? 1) < 0.9 ? 'red' : '#d9d9d9'}`,
                                borderRadius: '4px',
                                fontFamily: "'Noto Sans JP', sans-serif",
                                fontSize: 14,
                                boxShadow: (el.confidence ?? 1) < 0.5 ? '0 0 5px red' : 'none',
                            }}
                        >
                        </Select>
                    </div>
                );

            case 'number':
                return (
                    <div key={el.id} style={elementStyle}>
                        <InputNumber
                            value={parseFloat(el.text || '0') || 0}
                            placeholder={el.type}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: `2px solid ${(el.confidence ?? 1) < 0.9 ? 'red' : '#d9d9d9'}`,
                                borderRadius: '4px',
                                fontFamily: "'Noto Sans JP', sans-serif",
                                fontSize: 14,
                                boxShadow: (el.confidence ?? 1) < 0.5 ? '0 0 5px red' : 'none',
                            }}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: viewportWidth,
            height: viewportHeight,
            pointerEvents: 'auto',
            ...style
        }}>
            {elements.map(renderElement)}
        </div>
    );
};

export default DomFormLayer;
