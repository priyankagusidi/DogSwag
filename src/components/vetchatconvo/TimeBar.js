import React, { useEffect, useState } from 'react';

const CircularProgressBar = ({time}) => {
  const strokeWidth = 15;
  const radius = 60;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (time / 900) * 100; // Calculate the progress percentage
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        strokeWidth={strokeWidth}
        stroke="#30668133"
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className="circle"
        strokeWidth={strokeWidth}
        stroke="#47AADA"
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: strokeDashoffset,
          strokeLinecap: 'round',
        }}
      />
    </svg>
  );
};

export default CircularProgressBar;
