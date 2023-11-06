import React from 'react';
import { useDrop } from 'react-dnd';
import Image from './images';

const ImageContainer = ({ id, url, moveImage }) => {
  return(
    <></>
  )
  // const [, drop] = useDrop({
  //   accept: 'image',
  //   drop: (item) => moveImage(item.id, id),
  // });

  // return (
  //   <div ref={drop} style={{ display: 'inline-block', position: 'relative' }}>
  //     <Image id={id} url={url} />
  //   </div>
  // );
};


export default ImageContainer