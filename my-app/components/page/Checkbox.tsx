'use client';

import React from 'react';
import { Checkbox, Form } from 'antd';
import { Element } from '../../utils/pdfExport';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface PageCheckboxProps {
  element: Element;
  style?: React.CSSProperties;
  onChange: (value: any) => void;
  position?: { x: number; y: number; width: number; height: number };
}

const PageCheckbox: React.FC<PageCheckboxProps> = ({ 
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

  const fontSize = Math.max(Math.min(position.height * 0.6, 16), 10);
  const checked = !!element.text;

  return (
    <div style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: position.width,
      height: position.height,
      display: 'flex',
      alignItems: 'center',
      ...style,
    }}>
      <Checkbox 
        checked={checked} 
        onChange={(e: CheckboxChangeEvent) => onChange(e.target.checked ? 'checked' : '')} 
        style={{
          border: `1px solid ${getBorderColor(element.confidence)}`,
          borderRadius: '4px',
          padding: '4px',
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize,
          boxShadow: getBoxShadow(element.confidence),
          boxSizing: 'border-box',
        }} 
      >
        {element.field_name ?? ''}
      </Checkbox>
    </div>
  );
};

export default PageCheckbox;
