import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskUpload from './taskupload';
import Link from 'next/link'

import { Modal } from '@mantine/core';

const API_KEY = 'AIzaSyDq7vqgdfAFDWxH7osR7AZYqxbI8bdY1ww';
const VIDEO_IDS = ['DkPjOnUr4M4', 'DxL2HoqLbyA', 'fyiH0XHyDVc'];

export default function VideoRanker({videodata}) {
 const [videos, setVideos] = useState([]);
 const [videoInfo,setVideoInfo] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false);

console.log(videodata);

useEffect(() => {
  async function fetchVideoData() {
    const videoIds = videodata?.Videos?.map(video => video.videoId);
    const videoDataPromises = videoIds?.map(async videoId => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              key: API_KEY,
              id: videoId,
              part: 'snippet,statistics' // Include any additional parts you need
            }
          }
        );
        const videoData = response.data.items[0];

        // Find the corresponding { authorId, Voted } data
        const correspondingData = videodata.Videos.find(
          data => {
           console.log()
           return data.videoId === videoData.id
          }
        );

        console.log(correspondingData)

        if (correspondingData) {
          videoData.authorId = correspondingData.authorId;
          videoData.userId = correspondingData.userId;
          videoData.votes = correspondingData.votes;
        }
        console.log(videoData)
        return videoData;
      } catch (error) {
        console.error(`Error fetching data for video ${videoId}:`, error);
        return null;
      }
    });

    try {
      const videoDataResponses = await Promise.all(videoDataPromises);
      const filteredVideoData = videoDataResponses.filter(
        videoData => videoData !== null
      );
      setVideos(filteredVideoData);
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  }

  fetchVideoData();
}, []);

// Ranking algorithm: 60% views + 40% likes
function calculateVideoScore(video) {
  const viewCount = parseInt(video.statistics.viewCount);
  const likeCount = parseInt(video.statistics.likeCount);
  return 0.6 * viewCount + 0.4 * likeCount;
}

console.log(videos);



  const openShareModal = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const [linkCopied, setLinkCopied] = useState(false);

// Sort videos based on calculated scores
// const sortedVideos = [...videos].sort((a, b) =>
//   calculateVideoScore(b) - calculateVideoScore(a)
// );

  console.log(videos)


  function setVideo(id,title,likeCount,viewCount){
  	  setVideoInfo({id,title,likeCount,viewCount})
  }

	return(
<div className="mt-5 p-5">

           <div className="flex justify-center lg:justify-start w-full">
                <div className="">
                    <h1 className="font-bold text-4xl lg:text-7xl uppercase font-Jumper tracking-widest text-gray-700">ShowCase</h1>
                    
                    {/*<h1 className="font-Inter outline-text justify-end ml-auto font-semibold uppercase  md:text-[45px] text-[25px]  lg:text-[76px]">Showcase</h1>*/}
                </div>
            </div>
		  	{/*<h1 className="font-Inter outline-text justify-end ml-auto font-semibold uppercase  md:text-[45px] text-[25px]  lg:text-[76px]">LeaderBoard</h1>*/}

		  <div className="flex flex-col lg:flex-row gap-5">
		  	
		  	<div className="w-full lg:w-6/12">
		  	   <div className="bg-white p-2">
		  		<iframe className="w-full h-[200px] sm:h-[450px] lg:h-[350px] rounded-xl"
				   src={`https://www.youtube.com/embed/${videoInfo?.id}`}>
				</iframe>
                <div className="text-xl mt-5">{videoInfo?.title}</div>

				<div className="flex justify-between mt-5">
				{
				videoInfo &&
					<div className="flex justify-between text-sm gap-5">
                     



                    <div className="flex  gap-2 justify-center items-center">
                      <img className="w-10 h-10" src="/views.svg" alt="" />
                        <div>
                          <p className="text-xs  ">{videoInfo.viewCount}</p>
                          <p className="text-xs l">Views</p>
                        </div>
                    </div>


                    <div className="flex  gap-2 justify-center items-center">
                      <img className="w-10 h-10" src="/badgeblack.svg" alt="" />
                        <div>
                          <p className="text-xs  ">1</p>
                          <p className="text-xs l">Rank</p>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center gap-2 lg:gap-4">
                        <img className="w-8 h-8" src="/assets/icons/paw.svg" alt="" />
                        <div>
                          <p className="text-xs  "> {videoInfo.likeCount}</p>
                          <p className="text-xs "> Likes</p>
                        </div>
                    </div>



                    <div className="bg-[#FDF9F9] grid lg:grid-cols-3 grid-cols-1  lg:pl-0 pl-[3px] md:pl-[3px] gap-2 lg:gap-4 rounded-3xl p-4 lg:p-2">
                      
                      <button          onClick={openShareModal}
  className="flex gap-2 items-center">
                        <img className="cursor-pointer w-10 h-10" src="/shareiconmainvideo.png" alt="" />
                        <p className="text-sm"> Share</p>

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

 }


				</div>
				</div>

		  	</div>
		  	<div className="w-full lg:w-6/12">
      
      <ul className="flex flex-col gap-5 mt-2">
         {

         videos?.map((video,index)=>{

            console.log(video)
           return(

            <div onClick={()=>setVideo(video.id,video.snippet.title,video.statistics.likeCount,video.statistics.viewCount)} key={index} className="flex flex-col md:flex-row gap-2">
           <div className="w-full md:w-4/12">
             
              <iframe className="w-full h-56 md:h-32 lg:hidden object-cover rounded-xl"
                 src={`https://www.youtube.com/embed/${video?.id}`}>
              </iframe>
             <img className="w-full h-56 md:h-32 hidden lg:block object-cover rounded-xl" src={`http://img.youtube.com/vi/${video.id}/0.jpg`} alt="Video Thumbnail" />
          </div>
          {/*<div className="border-[#C1B0B0] border-2 border-r-2 h-[120px] md:block md:block hidden rounded-2xl"></div>*/}
          <div className="w-full  md:w-8/12 flex flex-col justify-between">
                  <div className="flex justify-between gap-3">
                     {/* <div>
                        <img className="w-10 h-10 object-cover" src="/userdogvideo.png" alt="" />
                      </div>*/}

                       <div className="w-11/12">
                         <p className="text-lg text-[#000000] font-Inter font-normal text-sm"> {video.snippet.title}</p>
                          <div className="flex mt-2 lg:gap-4  gap-2 items-center text-xs">
                         {/*<p className="text-gray-500 font-Inter ">Votes: 0</p>*/}
                         <p className="text-gray-500 font-Inter ">Views: {video.statistics.viewCount}</p>
                         <p className="text-gray-500 font-Inter ">Likes: {video.statistics.likeCount}</p>
                       </div>
                         <div className="mt-2">
                         <button className="py-2 px-4 font-Inter font-medium bg-[#F0D055] text-xs rounded-lg"><Link href={`/dogprofile/${video.userId}`}>View Profile</Link></button>
                         </div>
                       </div>
{/*
                       <div className="w-1/12 flex flex-col items-center justify-center">
                             <img className="w-10 h-10" src="/badge.svg" alt="" />
                            <p className="text-base text-[#000000] font-Inter font-normal  text-sm"> {index+1}</p>
                       </div>*/}
                    </div>            
                   {/* <button className="py-2 ml-auto-2  px-2 lg:px-3 text-[#000000B5] font-Inter font-medium bg-[#F0D055]
                    text-base rounded-lg"><Link href="/dogprofile">View Profile</Link></button>*/}

                     
          </div>

        </div> 
            )
         })
         }

      </ul>
		  </div>
		  </div>
		  </div>
		)
}