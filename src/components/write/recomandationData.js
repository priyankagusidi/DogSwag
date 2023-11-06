import React from 'react';
import TipsData from './tipsdata'
import { Popover, Text, Button } from '@mantine/core';

const Tips = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="max-w-[1000px] mx-auto relative flex justify-end">
  

  </div>
  );
};

export default Tips;