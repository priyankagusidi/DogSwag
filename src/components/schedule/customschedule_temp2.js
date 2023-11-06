import React, { useState } from 'react';

const TimeInput = () => {
  const [selectedTime, setSelectedTime] = useState('');

  // Handle changes in the time input
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Function to format time with AM/PM
  const formatTimeWithAMPM = (time) => {
    const [hour, minute] = time.split(':');
    const formattedHour = parseInt(hour) % 12 || 12;
    const period = parseInt(hour) >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${minute} ${period}`;
  };

  return (
    <div className="w-1/4">
      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
        Select Time:
      </label>
      <input
        type="time"
        id="time"
        name="time"
        step="900" // 15-minute intervals (900 seconds)
        value={selectedTime}
        onChange={handleTimeChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
      />
      <p className="mt-2 text-gray-500">
        Selected Time: {selectedTime ? formatTimeWithAMPM(selectedTime) : 'No time selected'}
      </p>
    </div>
  );
};

export default TimeInput;
