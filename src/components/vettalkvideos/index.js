import React, { useEffect, useState } from 'react';
// import VetTalkMainVideo from '@/components/vettalkmainvideo'
// import VetTalkOthersVideo from '@/components/vettalkothersvideo';
// import VetTalkProducts from '@/components/vettalkproducts';
import axios from 'axios'

import dynamic from 'next/dynamic'
const VetTalkMainVideo = dynamic(() => import("@/components/vettalkmainvideo"), {
  ssr: false,
});

const VetTalkOthersVideo = dynamic(() => import("@/components/vettalkothersvideo"), {
  ssr: false,
});

const VetTalkProducts = dynamic(() => import("@/components/vettalkproducts"), {
  ssr: false,
});


const VetTalkVideos = () => {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [playingVideo, setPlayingVideo] = useState(0)
  const [discountStart, setDiscountStart] = useState(false)
  const [discountedPrice, setDiscountedPrice] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0);



  async function fetchVideos(){
    try {
        await axios.get('/api/video/all').then(res=>{
           console.log(res)
           setVideos(res.data.Videos)
           setLoading(false)
        })
    } catch(e) {
      // statements
        setLoading(false)
      console.log(e);
    }
  }

  useEffect(()=>{
      fetchVideos()
  },[])

  useEffect(()=>{
    discountProduct()
  },[])

function discountProduct() {
  const discountExpiresAt = localStorage.getItem('discountExpiresAt');
  if (discountExpiresAt && new Date().getTime() < Number(discountExpiresAt)) {
    localStorage.setItem('Discount', true);
    setDiscountedPrice(true);
    console.log("discount");

    const intervalId = setInterval(() => {
      // const remainingTime = Math.max(0, Math.floor((Number(discountExpiresAt) - new Date().getTime()) / 1000));
      const remainingTime = Math.max(0, Number(discountExpiresAt) - new Date().getTime());
      console.log(remainingTime);
      if (remainingTime === 0) {
        localStorage.setItem('Discount', false);
        setDiscountedPrice(false);
        clearInterval(intervalId); // Stop the interval when remainingTime reaches 0
      } else {
        setTimeRemaining(remainingTime);
      }
    }, 1000);
  } else {
    localStorage.setItem('Discount', false);
    setDiscountedPrice(false);
    console.log("discount over");
  }
}




console.log(videos)

  return (
    <div data-theme="retro" className=" justify-center p-2 md:flex gap-6 bg-gray-300">

      <div className="md:w-7/12">
        {loading ? (
          // Display spinner while videos are being loaded
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          // Display video player once videos are loaded
          videos.length > 0 && <div className="grid gap-5">
            <VetTalkMainVideo
              setDiscountStart={setDiscountStart}
              discountStart={discountStart}
              index={playingVideo}
              setPlayingVideo={setPlayingVideo}
              videoId={videos[playingVideo].videoId}
              videoDescription={videos[playingVideo].videoDescription}
              videoName={videos[playingVideo].videoName}
              sponsoredBy={videos[playingVideo].sponsoredBy}
              discountProduct={discountProduct}

               />
            <VetTalkProducts
              discountedPrice={discountedPrice}
              timeRemaining={timeRemaining} 
              setDiscountStart={setDiscountStart}
              sponsoredBy={videos[playingVideo].sponsoredBy}
              discountStart={discountStart}></VetTalkProducts>
          </div>
        )}


      </div>

      <div className="md:w-4/12">
        {loading ? (
          // Display spinner while videos are being loaded
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
          </div>
        ) : (
            <div className="flex flex-col gap-2">
              {/* List of sidebar videos */}
              {videos.map((video, index) => (

                <VetTalkOthersVideo key={video._id}
                  index={index}
                  video={video}
                  setDiscountStart={setDiscountStart}
                  discountStart={discountStart}
                  setPlayingVideo={setPlayingVideo}
                  videoUrl={video.videoUrl} 
                  />
              ))}
              
          </div>
        )
        }
      </div>


    </div>
  );
};

export default VetTalkVideos;