import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const LeaderBoardCard = ({ video, setPlayingVideo, index }) => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    // const videoId = extractVideoId(videoUrl);
    if (video.videoId) {
      fetchVideoInfo(video.videoId);
    }
  }, [video.videoId]);



  async function fetchVideoInfo(videoId) {
    console.log(videoId)
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${video.videoId}&key=AIzaSyDq7vqgdfAFDWxH7osR7AZYqxbI8bdY1ww`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        console.log(video)
        const { title, channelTitle } = video.snippet;
        const { viewCount, likeCount} = video.statistics;
        setVideoInfo({ title, channelTitle, viewCount,likeCount });
      }
    } catch (error) {
      console.error('Error fetching video info:', error);
    }
  }
  console.log(videoInfo)


  return (
    <div className="lg:flex  mb-4 items-center bg-[#FBF4F4] p-6 py-8 shadow-md rounded-xl cursor-pointer" onClick= {()=>setPlayingVideo(index)}>
      {videoInfo && (
        <div className="lg:flex lg:gap-4 gap-3 items-center">
          <img className=" lg:h-[130px] h-[150px] rounded-3xl lg:w-[250px] w-full object-cover " src={`http://img.youtube.com/vi/${video.videoId}/0.jpg`} alt="Video Thumbnail" />
          <div className="border-[#C1B0B0] border-2 border-r-2 h-[120px] lg:block md:block hidden rounded-2xl"></div>
          <div className=" flex flex-col justify-center text-[#746D6DFC]">
          <div className="flex mt-2 mb-4 gap-2  lg:gap-4 items-center">
<div className="flex items-center gap-3 lg:gap-4">
  <img className="w-[50px] h-[50px] object-cover mx-auto border-4 rounded-full border-2  border-yellow-400" src="/userdogvideo.png" alt="" />


             <div>
               <p className="text-lg text-[#000000] font-Inter font-normal text-sm"> {videoInfo.title}</p>
             </div>

             <div>
             <img className="w-[30px] h-[30-px]" src="/votebadgeicon.png" alt="" />
             <p className="text-base text-[#000000] font-Inter font-normal "> {index+1}</p>

             </div>

  </div>            
          <button className="py-2 ml-auto-2  px-2 lg:px-3 text-[#000000B5] font-Inter font-medium bg-[#F0D055]
 text-base rounded-lg"><Link href="/dogprofile">View Profile</Link></button>

           </div>
           <div >
             {/* <h2 className="text-md font-bold ">{videoInfo.title}</h2> */}
             <h2 className="text-md font-bold ">{videoInfo.description}</h2>

<div className="flex mt-2 lg:gap-4  gap-2 items-center">
{/*<p className="lg:text-base text-sm text-[#0000006B] font-Inter ">Votes: 0</p>*/}
<p className="lg:text-base text-sm text-[#0000006B] font-Inter ">Views: {videoInfo.viewCount}</p>
<p className="lg:text-base text-sm text-[#0000006B] font-Inter ">Likes: {videoInfo.likeCount}</p>
</div>
           </div>
          </div>

        </div> 
      )}
    </div>
  );
};

export default LeaderBoardCard;
