import React from 'react';
import OneVideo from './onevideo'
const VideoList = ({ videos ,handleSingleVideo}) => {
  

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {videos.map((video) => 
        (
         <OneVideo key={video._id} video={video} handleSingleVideo={handleSingleVideo}/>
      ))}
    </div>
  );
};

export default VideoList;
