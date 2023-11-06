import React, { useState, useRef, useEffect } from 'react';

import dynamic from 'next/dynamic'
const VetTalkQuiz = dynamic(() => import("@/components/vettalkquiz"), {
  ssr: false,
});

import ReactPlayer from 'react-player'
import axios from 'axios'
// import { FaCopy,FaTwitter,FaWhatsapp,FaFacebook,FaFacebookMessenger } from 'react-icons/fa';
import { Modal } from '@mantine/core';

const VetTalkMainVideo = ({userdata,video,videoId, videoName, discountProduct, sponsoredBy, videoDescription, discountStart, setDiscountStart, setPlayingVideo, index }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const playerRef = useRef(null);
  const [videoInfo, setVideoInfo] = useState(null)
  const [questions, setQuestions] = useState([]);
  const [videodata,setVideodata] = useState(video)
  const [liked,setLiked] = useState(false)


  console.log(videoInfo)

  const handleVideoEnd = () => {
    setShowQuiz(true);
    setShowPopup(false);
  };

  const handleVideoPause = () => {
    setPausedTime(playerRef.current.getCurrentTime());
    setShowPopup(true);
  };

  const handleVideoPlay = () => {
    setShowPopup(false);
  };

  const handleSeeButtonClick = () => {
    if (playerRef.current) {
      setShowPopup(false);
      playerRef.current.seekTo(pausedTime, 'seconds');
      playerRef.current.getInternalPlayer().playVideo();
    }
  };

  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescriptionText = () => {
    if (showFullDescription) {
      return videoDescription;
    } else {
      const truncatedDescription = videoDescription.split(' ').slice(0, 30).join(' ');
      return truncatedDescription + '....';
    }
  };

  const seeMoreLessButton = () => {
    if (showFullDescription) {
      return (
        <button className=" ml-1 text-secondary" onClick={toggleFullDescription}>
          ...see less
        </button>
      );
    } else {
      return (
        <button className=" ml-1 text-secondary" onClick={toggleFullDescription}>
          see more
        </button>
      );
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoInfo(videoId);
    }
  }, [videoId]);



  async function fetchQuizes() {
    try {
      await axios.get('/api/quiz/all').then(res => {
        console.log(res)
        setQuestions(res.data.Quizes)
      })
    } catch (e) {
      // statements
      console.log(e);
    }
  }

  useEffect(() => {
    fetchQuizes()
  }, [])



  async function onVote(){
    if(!userdata.user){
       router.push('/login')
       return
    }

    if(videodata?.votes?.includes(userdata.user._id)){
        const del = videodata?.votes?.filter(l=>l!== userdata.user._id)
        setVideodata({...videodata,votes:del})
    }else{
        setVideodata({...videodata,votes:[...videodata?.votes,userdata.user._id]})
    }
    setLiked(!liked)

    try{
       await axios.put(`/api/video/vote/${videodata._id}`).then(res=>console.log(res))
    }catch(err){
        console.log(err)
    }
}


  

  async function fetchVideoInfo(videoId) {
    console.log(videoId)
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=AIzaSyDq7vqgdfAFDWxH7osR7AZYqxbI8bdY1ww`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        const { title, channelTitle, description } = video.snippet;
        const { viewCount,likeCount } = video.statistics;
        // const { viewCount, likeCount } = video.statistics;
        setVideoInfo({ title, channelTitle, viewCount, description ,likeCount});
      }
    } catch (error) {
      console.error('Error fetching video info:', error);
    }
  }



  const [showShareModal, setShowShareModal] = useState(false);

  const openShareModal = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <>
      <div className="relative font-[Roboto]">
        <div className="shadow-xl p-6 mb-8  bg-[#ADA5A5]
  rounded-3xl">
          <div className="w-full">
            <div>
              <ReactPlayer.default
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${videoId}?rel=0&listType=playlist`}
                controls={true}
                onStart={() => setPlayingVideo(index)}
                rel={0}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      showinfo: 0,
                    },
                  },
                }}
                onEnded={handleVideoEnd}
                onPause={handleVideoPause}
                onPlay={handleVideoPlay}
                width="100%"
                height="200px"
              />






            </div>
            {videoInfo && (
              <div >
                <div className="flex items-center gap-4 mt-2 lg:mt-8">

                  <div className="flex items-center gap-4 mt-8">
                    <div className="rounded-full border-4  border-yellow-500">
                      <img className="mx-auto lg:mx-0 object-fit h-[70px] w-[70px]" src="/useerdogimagemainvideo.png" alt="" />
                    </div>

                    <div className=" items-center lg:gap-1 gap-4">
                      <p className="text-base text-center "> Milo</p>
                      <button className="py-2 px-4 bg-[#F0D055C9]
 text-sm rounded-xl">View Profile</button>
                    </div>

                    <div className="lg:flex  flex-col justify-center items-center">
                      <img className="w-[32px] h-[32-px]" src="/votebadgeicon.png" alt="" />
                      <p className="text-base lg:mt-1">0</p>

                    </div>
                    <div className="bg-[#FDF9F9] grid lg:grid-cols-3 grid-cols-1  lg:pl-0 pl-[3px] md:pl-[3px] gap-2 lg:gap-4 rounded-3xl p-4 lg:p-2">
                      <div className="flex items-center gap-2 lg:gap-4">
                        <img className="lg:h-[40px] lg:w-[40px] h-[20px]  w-[20px]" src="/likeiconmainvideo.png" alt="" />
                        <div>
                          <p className="text-xs lg:text-base "> {videoInfo.likeCount}</p>
                          <p className="text-xs lg:text-base "> Likers</p>

                        </div>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-4">
                        <img className={` ${liked ? "bg-black":""}lg:h-[40px] lg:w-[40px] h-[20px]  w-[20px] cursor-pointer`} onClick={onVote} src="/voteiconmainvideo.png" alt="" />
                        <div>
                          <p className="text-xs lg:text-base text-center">{videodata?.votes?.length || 0}</p>
                          <p className="text-xs lg:text-base"> Voters</p>

                        </div>
                      </div>
                      <button          onClick={openShareModal}
  className="flex items-center border-0  gap-2 lg:gap-4 cursor-pointer">
                        <img className="cursor-pointer lg:h-[40px] lg:w-[40px] h-[20px]  w-[20px]" src="/shareiconmainvideo.png" alt="" />
                        <p className="text-xs lg:text-base "> Share</p>

                      </button>
                      {
                         showShareModal &&        <div
                         center
                         className="fixed inset-0 flex items-center justify-center z-50"
                       >
                         <div className="bg-white p-6 w-1/2  rounded-lg">
                           <button className="text-red-600 text-2xl mb-4" onClick={closeShareModal}>X</button>
                           <h2 className="text-xl font-semibold">Share Video</h2>
                           <div className="flex flex-col space-y-2 mt-4">
                             <button onClick={() => {
          const whatsappMessage = `Check out this video: https://www.youtube.com/watch?v=${videoId}`;
          const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
          window.open(whatsappURL, '_blank');
        }} className="bg-blue-500 text-white flex items-center  font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                               {/*<FaWhatsapp className="mr-2" /> */}
                               Share on WhatsApp
                             </button>
                             <button onClick={() => {
          const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=${videoId}`;
          window.open(facebookURL, '_blank');
          closeShareModal();
        }} className="bg-blue-500 flex items-center  text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                               {/*<FaFacebook className="mr-2" /> */}
                               Share on Facebook
                             </button>
                             <button
className="bg-blue-500 text-white flex items-center  font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"        onClick={() => {
          const messengerURL = `https://www.facebook.com/dialog/send?link=https://www.youtube.com/watch?v=${videoId}&app_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI`;
          window.open(messengerURL, '_blank');
          closeShareModal();
        }}
      >
        {/*<FaFacebookMessenger className="mr-2" /> */}
        Share on Messenger
      </button>
                             <button    onClick={() => {
          const twitterMessage = `Check out this video: https://www.youtube.com/watch?v=${videoId}`;
          const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterMessage)}`;
          window.open(twitterURL, '_blank');
        }} className="bg-blue-500 flex items-center  text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                               {/*<FaTwitter className="mr-2" /> */}
                               Share on Twitter
                             </button>
                             <button
                               className="bg-blue-500 text-white font-medium py-2 px-4 flex items-center  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                               onClick={() => {
                                navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoId}`);
                                setLinkCopied(true);
                            
                                // Start a timer to clear the message after 5 seconds
                                setTimeout(() => {
                                  setLinkCopied(false);
                                }, 5000);
                            
                              }}
                             >
                               {/*<FaCopy className="mr-2" />*/}
                                Copy Link
                             </button>
                             {linkCopied && (
            <p className="text-green-500 mt-2">Link copied</p>
          )}
                           </div>
                         </div>
                       </div>
                      }
               
                    </div>
                  </div>




                </div>
                <div className="mt-6 bg-[#C5C5C5] rounded-3xl p-6">
                  <div className="flex gap-4">
                    <p className="text-base  font-medium text-gray-600"> {videoInfo.viewCount}   Views</p>
                    <p className="text-base  font-medium text-gray-600"> 2  Weeks ago</p>

                  </div>
                  <h2 className="text-base font-medium text-gray-600 mt-4">Color Carpet Challenge</h2>


                </div>
              </div>
            )}

          </div>

        </div>
        <div className="flex w-full justify-center items-center">
          {showQuiz && (
            <div className="absolute top-10">
              <VetTalkQuiz questions={questions} discountProduct={discountProduct} setShowQuiz={setShowQuiz} sponsoredBy={sponsoredBy} discountStart={discountStart} setDiscountStart={setDiscountStart} />
            </div>
          )}
        </div>

        {showPopup && (
          <div className="absolute top-0 flex justify-between bg-orange-400 w-full p-3 rounded-xl">
            <div>
              <h3 className="font-bold text-gray-600">Dont skip the video!</h3>
              <p className="text-xs text-white font-bold">Watch the video till the end and participate in the quiz to win a prize.</p>
            </div>

            <button className="bg-white p-2 rounded-xl hover:text-white hover:bg-yellow-500 text-xs" onClick={handleSeeButtonClick}>
              See Video
            </button>
          </div>
        )}
      </div>
    </>

  );
};

export default VetTalkMainVideo;
