import { useState, useEffect } from 'react';

export default function Timer({seconds}) {


  const minutes = Math.floor(seconds / 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

  return (
    <div>
      <h1 className="text-xs">Timer: {formattedMinutes}:{formattedSeconds}</h1>
    </div>
  );
}
