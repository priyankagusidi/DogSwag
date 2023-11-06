import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'

const API_KEY = 'AIzaSyDq7vqgdfAFDWxH7osR7AZYqxbI8bdY1ww';
const VIDEO_IDS = ['DkPjOnUr4M4', 'DxL2HoqLbyA', 'fyiH0XHyDVc'];

function VideoRanker({videodata}) {
 const [videos, setVideos] = useState([]);

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

// Sort videos based on calculated scores
// const sortedVideos = [...videos].sort((a, b) =>
//   calculateVideoScore(b) - calculateVideoScore(a)
// );

  console.log(videos)

  // // Sort videos based on calculated scores
  // const sortedVideos = [...videos].sort((a, b) =>
  //   calculateVideoScore(b) - calculateVideoScore(a)
  // );

  return (
    <div className="flex flex-col p-5 mt-10">
            <div className="flex justify-center w-full">
                <div className="lg:mb-10">
                    <h1 className="font-bold text-4xl lg:text-7xl uppercase font-Jumper tracking-widest text-gray-700">Previous videos</h1>
                </div>
            </div>
      
      <div className="flex flex-col md:flex-row  gap-10 justify-center">

      {/*<div className="w-full md:w-6/12 ">
        <TaskUpload/>
      </div>*/}
      
      <div className="w-full md:w-6/12">

      <ul className="flex flex-col gap-5">
         {

         videos?.map((video,index)=>{

            console.log(video)
           return(

            <div key={index} className="flex flex-col md:flex-row gap-2">
           <div className="w-full md:w-4/12">
             <img className="w-full h-56 md:h-32  object-cover rounded-xl" src={`http://img.youtube.com/vi/${video.id}/0.jpg`} alt="Video Thumbnail" />
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
                         <button className="py-2 px-4 font-Inter font-medium bg-[#F0D055] text-xs rounded-lg"><Link href={`/dogprofile/${video.authorId}`}>View Profile</Link></button>
                         </div>
                       </div>

                       <div className="w-1/12 flex flex-col items-center justify-center">
                             <img className="w-10 h-10" src="/badge.svg" alt="" />
                            <p className="text-base text-[#000000] font-Inter font-normal  text-sm"> {index+1}</p>
                       </div>
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
  );
}

export default VideoRanker;
