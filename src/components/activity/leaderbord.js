import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskUpload from './taskupload';
import Link from 'next/link'

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import { Tabs } from '@mantine/core';
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
const sortedVideos = [...videos].sort((a, b) =>
  calculateVideoScore(b) - calculateVideoScore(a)
);

  console.log(videos)

  // // Sort videos based on calculated scores
  // const sortedVideos = [...videos].sort((a, b) =>
  //   calculateVideoScore(b) - calculateVideoScore(a)
  // );

  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-center w-full">
          <div className="lg:mb-10">
              <h1 className="font-bold text-4xl lg:text-7xl uppercase font-Jumper tracking-widest text-gray-700">Leaderboard</h1>
          </div>
      </div>


      <Tabs defaultValue="Week 1">
      <Tabs.List>
        <Tabs.Tab value="Week 1">Week 1</Tabs.Tab>
        <Tabs.Tab value="Week 2">Week 2</Tabs.Tab>
        <Tabs.Tab value="Week 3">Week 3</Tabs.Tab>
        <Tabs.Tab value="Week 4">Week 4</Tabs.Tab>
        <Tabs.Tab value="Final">Final</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Week 1" pt="xs" className="h-[500px] overflow-y-auto" >
       <ul className="flex flex-col gap-5">
             {

             sortedVideos.map((video,index)=>{

                console.log(video)
               return(
                    <div key={index} className="flex gap-3 items-center justify-center flex-col md:flex-row gap-2 mt-2">
                    <div className="">
                    <img src="/img/3.jpg" className="w-10 h-10 object-cover rounded-full"/>
                    </div>
                    <div className="w-full  md:w-11/12 flex flex-col justify-between">
                            <div className="flex justify-between gap-3">
                                     <div className="">
                                      <Link href={`/dogprofile/${video.authorId}`}><h3 className="text-lg font-bold cursor-pointer">Bruno</h3></Link>
                                      <div className="flex lg:gap-4  gap-2 items-center text-xs">
                                       <p className="text-gray-500 font-Inter ">Rank: {index}</p>
                                       <p className="text-gray-500 font-Inter ">Views: {video.statistics.viewCount}</p>
                                       <p className="text-gray-500 font-Inter ">Likes: {video.statistics.likeCount}</p>
                                     </div>
                                       <img src="/youtube-play.svg" className="w-8 h-8 cursor-pointer"/>
                                     </div>
                                  </div>            
                    </div>
                    <div>
                    </div>
                    </div> 
                    )
                 })
                 }
              </ul>
      </Tabs.Panel>

      <Tabs.Panel value="Week 2" pt="xs" className="h-[500px] overflow-y-auto">
      </Tabs.Panel>

      <Tabs.Panel value="Week 3" pt="xs" className="h-[500px] overflow-y-auto">
      </Tabs.Panel>

      <Tabs.Panel value="Week 4" pt="xs" className="h-[500px] overflow-y-auto">
      </Tabs.Panel>

      <Tabs.Panel value="Final" pt="xs" className="h-[500px] overflow-y-auto">
      </Tabs.Panel>
    </Tabs>

    </div>
  );
}

export default VideoRanker;
