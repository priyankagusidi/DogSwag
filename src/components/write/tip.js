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
    <Popover position="left" width={200} withArrow>
       <Popover.Target>
      <label htmlFor="tips" className="flex text-xs cursor-pointer top-72 md:top-80 font-semibold items-center justify-center text-[#5F2710] z-50 flex-wrap rounded-full w-14 shadow shadow-lg shadow-gray-400 h-14 fixed bg-[#FFDDAA]">
        <img id="tips" name="tips" src="/assets/icons/ques.png" className="w-4"/>
      </label>
       </Popover.Target>
       <Popover.Dropdown>
          <ul className='text-xs font-normal flex flex-col gap-2'>
            {
             TipsData.map((m,i)=>{
               return (
                  
                    <li key={i} className="text-gray-600"> <span className="text-black font-black">#{i+1}</span> {m.step}</li>
                )
             })
            }
         </ul>
      </Popover.Dropdown>
    </Popover>

  </div>
  );
};

export default Tips;