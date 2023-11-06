import React from 'react';
import { useDrag } from 'react-dnd';

const Image = ({ id, url }) => {
  return(
    <></>
  )
  // const [{ isDragging }, drag] = useDrag({
  //    type: 'image',
  //   spec: {
  //     type: 'image',
  //     item: { id },
  //   },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  // return (
  //   <img
  //     ref={drag}
  //     src={url}
  //     alt="Surreal masterpiece"
  //     style={{ opacity: isDragging ? 0.5 : 1 }}
  //     className="w-24 h-24 border object-cover flex p-2"
  //   />
  // );
};



export default Image