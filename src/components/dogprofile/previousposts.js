import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


  import axios from "axios";
import PreviousVideos from "./previousvideos";

const PreviousPosts =()=>{
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [playingVideo, setPlayingVideo] = useState(0)
   
  
  
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
  
   
  const [displayedVideos, setDisplayedVideos] = useState(3); // Initial number of videos to display

  const [showAllVideos, setShowAllVideos] = useState(false);

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white">
            <h3 className="text-center text-5xl font-Inter font-medium mb-4">Previous Posts</h3>
            <div
            style={{ background: 'linear-gradient(0deg, #EFE5E5, #EFE5E5)' }}
            className={`rounded-lg pt-10 pb-6 px-4 ${
              showAllVideos ? '' : `lg:h-[710px] h-[1250px]`
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
                  <PreviousVideos
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
    )
}

export default PreviousPosts