import React, { useState } from 'react';
import VideoList from './videolist';

import ReactPlayer from 'react-player/youtube'

// Only loads the YouTube player

const ManageProducts = ({video,views,brandData}) => {

 console.log(video)

  return (
    <div className="p-2 flex gap-4">
       <div className="w-8/12 bg-white p-3">
       <h1 className="text-2xl font-semibold">{video.title}</h1>
       <div className="mt-2">
         <ReactPlayer url={`https://www.youtube.com/watch?v=${video.videoId}`} width="100%"/>
         {/*<iframe width="560" height="315" src="https://www.youtube.com/embed/B4yV3AO7G6E" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>*/}
       </div>

       <p className="mt-2 text-gray-600 text-sm">{video.description}</p>
       </div>

       <div className="w-4/12 bg-white p-3 flex flex-col">

         <div className="text-xs">
           Views
         </div>
         <div className="text-2xl text-gray-600 border-b mb-2">
           {views}
         </div>
          <div className="text-xs">
           Quizes played
         </div>
          <div className="text-2xl text-gray-600 border-b mb-2">
           {brandData.quizesPlayed}
         </div>
          <div className="text-xs">
           Clicked on product
         </div>
         <div className="text-2xl text-gray-600 border-b mb-2">
           {brandData.productClicked}
         </div>
          <div className="text-xs">
           Clicked on buy
         </div>
         <div className="text-2xl text-gray-600 border-b mb-2">
           {brandData.clickedOnBuy}
         </div>
       </div>
    </div>
  );
};

export default ManageProducts;
