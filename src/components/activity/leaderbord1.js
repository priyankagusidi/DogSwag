import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react';
import TaskUpload from './taskupload';
import axios from 'axios';
import LeaderBoardCard from './leaderboardcard';


const VetTalkOthersVideo = dynamic(() => import("@/components/vettalkothersvideo"), {
  ssr: false,
});




const Leaderboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [playingVideo, setPlayingVideo] = useState(0)
  const [discountStart, setDiscountStart] = useState(false)
  const [discountedPrice, setDiscountedPrice] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0);





  async function fetchVideos() {
    try {
      await axios.get('/api/video/all').then(res => {
        console.log(res)
        setVideos(res.data.Videos)
        setLoading(false)
      })
    } catch (e) {
      // statements
      setLoading(false)
      console.log(e);
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    discountProduct()
  }, [])

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


  const [displayedVideos, setDisplayedVideos] = useState(3); // Initial number of videos to display


  console.log(videos)
  const handleViewMore = () => {
    setDisplayedVideos(videos.length); // Show all videos
  };
  const [showAllVideos, setShowAllVideos] = useState(false);

  const videoCardHeight = 400; // Adjust this value as needed for your design


  return (
    <div className="lg:max-w-7xl md:max-w-2xl mx-auto">
      <div className="  lg:flex gap-10  ">
        {/* right  side div */}

        <TaskUpload></TaskUpload>
        {/* left side div */}


        <div className="lg:w-7/12   justify-end ml-auto  ">
          <h1 className="font-Inter outline-text justify-end ml-auto font-semibold uppercase  md:text-[45px] text-[25px]  lg:text-[76px]">LeaderBoard</h1>
          <div
            style={{ background: 'linear-gradient(0deg, #EFE5E5, #EFE5E5)' }}
            className={`rounded-lg pt-10 pb-6 px-4 ${
              showAllVideos ? '' : `lg:h-[810px] h-[1250px]`
            } border-[#FFCB07] border-4`}
          >
            {loading ? (
              // Display spinner while videos are being loaded
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
              </div>
            ) : (
              <div className={`flex flex-col gap-2 ${!showAllVideos ? '' : 'max-h-full'} ${!showAllVideos ? 'overflow-hidden' : 'overflow-y-auto'}`}>

              {videos
                .slice(0, showAllVideos ? videos.length : displayedVideos)
                .map((video, index) => (
                  <LeaderBoardCard
                    key={video._id}
                    index={index}
                    video={video}
                    setPlayingVideo={setPlayingVideo}
                    videoUrl={video.videoUrl}
                  />
                ))}
            </div>
            )}
           <div className="mx-auto py-3">
              {!showAllVideos ? (
                <button
                  className="bg-[#B7B7B7] mx-auto p-3 w-2/5 text-2xl text-[#00000099] text-center font-medium font-Inter rounded-xl flex justify-center"
                  onClick={() => setShowAllVideos(true)}
                >
                  View more
                </button>
              ) : (
                <button
                  className="bg-[#B7B7B7] mx-auto p-3 w-2/5 text-2xl text-[#00000099] text-center font-medium font-Inter rounded-xl flex justify-center"
                  onClick={() => setShowAllVideos(false)}
                >
                  See less
                </button>
              )}
            </div>
          </div>
        </div>
      </div>





    </div>
  )
}

export default Leaderboard