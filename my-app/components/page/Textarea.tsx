'use client';

import React from 'react';
import { Input, Form } from 'antd';
import { Element } from '../../utils/pdfExport';

interface PageTextareaProps {
  element: Element;
  style?: React.CSSProperties;
  onChange: (value: any) => void;
  position?: { x: number; y: number; width: number; height: number };
}

const PageTextarea: React.FC<PageTextareaProps> = ({ 
  element, 
  style, 
  onChange, 
  position 
}) => {
  const getBorderColor = (confidence: number = 1) => {
    if (confidence < 0.9) return 'red';
    return '#d9d9d9';
  };

  const getBoxShadow = (confidence: number = 1) => {
    return confidence < 0.5 ? '0 0 5px red' : 'none';
  };

  if (!position) return null;

  const fontSize = Math.max(Math.min(position.height * 0.4, 14), 8);

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
          borderRadius: '4px',
          padding: '4px 6px',
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
