import React, { useEffect, useState } from 'react';

const LineProgressBar = ({ time ,width}) => {
  const height = 10;
  // const width = 200;
  const progress = (time / 900) * 100; // Calculate the progress percentage
  const progressWidth = (progress / 100) * width;

  return (
    <div style={{ width: width, height: height, background: '#30668133', borderRadius: '5px' ,position:'absolute',top:0}}>
      <div
        style={{
          width: progressWidth,
          height: '100%',
          backgroundColor: '#47AADA',
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

export default LineProgressBar;
