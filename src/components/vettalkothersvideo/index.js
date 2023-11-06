import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player';
import React, { useEffect, useState } from 'react';

const VetTalkOthersVideo = ({ video, setPlayingVideo, index }) => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    // const videoId = extractVideoId(videoUrl);
    if (video.videoId) {
      fetchVideoInfo(video.videoId);
    }
  }, [video.videoId]);

// function extractVideoId(link) {
//     let videoId = '';
//     const url = new URL(link);
//     if (url.hostname === 'youtu.be') {
//       videoId = url.pathname.substr(1);
//     } else if (url.hostname === 'www.youtube.com') {
//       const searchParams = new URLSearchParams(url.search);
//       videoId = searchParams.get('v');
//     }
//     return videoId;
//   }

  async function fetchVideoInfo(videoId) {
    console.log(videoId)
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${video.videoId}&key=AIzaSyDq7vqgdfAFDWxH7osR7AZYqxbI8bdY1ww`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        const { title, channelTitle } = video.snippet;
        const { viewCount } = video.statistics;
        setVideoInfo({ title, channelTitle, viewCount });
      }
    } catch (error) {
      console.error('Error fetching video info:', error);
    }
  }
  console.log(videoInfo)
  return (
    <div  style={{ background: 'rgba(229, 220, 198, 0.65)'}} className="lg:flex  mb-4 items-center bg-[#434242] p-6 shadow-md rounded-xl cursor-pointer" onClick= {()=>setPlayingVideo(index)}>
      {videoInfo && (
        <div className="lg:flex gap-4 items-center">
          <img className=" h-28 lg:h-24   object-cover pr-2 " src={`http://img.youtube.com/vi/${video.videoId}/0.jpg`} alt="Video Thumbnail" />
          <div className=" flex flex-col justify-center text-[#746D6DFC]">
          <div className="flex mt-2 mb-4 lg:gap-2 gap-4 items-center">
<div className="flex items-center gap-4">
              <img className="w-[40px] h-[40-px]" src="/userdogvideo.png" alt="" />
             <div>
               <p className="text-sm "> Milo</p>
             </div>
             <div>
             <img className="w-[20px] h-[20-px]" src="/votebadgeicon.png" alt="" />
             <p className="text-sm "> {index}</p>

             </div>

  </div>            
          <button className="py-2 px-2 bg-[#F0D055C9]
 text-sm rounded-lg">View Profile</button>

           </div>
           <div >
             {/* <h2 className="text-md font-bold ">{videoInfo.title}</h2> */}
             <h2 className="text-md font-bold ">{videoInfo.title}e</h2>

<div className="flex mt-2 gap-2 items-center">
<p className="text-sm ">Votes: {video?.votes?.length}</p>
<p className="text-sm ">Views: {videoInfo.viewCount}</p>
</div>
           </div>
          </div>
        </div> 
      )}
    </div>
  );
};

export default VetTalkOthersVideo;
