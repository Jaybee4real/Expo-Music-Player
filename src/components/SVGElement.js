import React from 'react';

const SVGElement = ({icon, size, style}) => {
  const Icon = icon;
  return <Icon width={size || 30} height={size || 30} style={style} />;
};

export default SVGElement;
