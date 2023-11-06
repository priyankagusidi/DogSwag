import React, { useState ,useEffect } from 'react';
import VideoList from './videolist';
import SingleVideo from './singlevideo';
// import Products from '../products/productList'
// import Questions from '../quizes/questions'
// import Brands from '../brands/brandlist'

import axios from 'axios'
const App = ({brandData}) => {
  const [currentVideo, setCurrentVideo] = useState({});
  const [showSingleVideo, setShowSingleVideo] = useState(false);
  const [views,setViews] = useState("")
  const [videos, setVideos] = useState([
    // {
    //   id: 1,
    //   title: 'Video 1',
    //   description: 'Description for Video 1',
    // },
    // {
    //   id: 2,
    //   title: 'Video 2',
    //   description: 'Description for Video 2',
    // },
    // Add more video objects as needed
  ]);
  
  async function fetchVideos(){
    try {
        await axios.get('/api/video/all').then(res=>{
           console.log(res)
          setVideos(res.data.Videos)
        })
    } catch(e) {
      // statements
      console.log(e);
    }
  }

  useEffect(()=>{
      fetchVideos()
  },[])

  const [newVideoLink, setNewVideoLink] = useState('');

  function handleSingleVideo(id,views) {
    console.log(id)
    setViews(views)
    const video = videos.find((video) => video._id === id);
    setCurrentVideo(video);
    setShowSingleVideo(true);
  }

  async function handleAddVideo(e) {
    e.preventDefault();

    // Extract video ID from the YouTube link
    const videoId = extractVideoId(newVideoLink);

    // Make an API call or perform any necessary validation before adding the video
    // ...
    try {
      
      await axios.post('/api/video/create',{videoId}).then((res=>{
        console.log(res.data)
      }))

    } catch(e) {
      // statements
      console.log(e);
    }

    // Create a new video object
    const newVideo = {
      id: videos.length + 1,
      title: `Video ${videos.length + 1}`,
      description: `Description for Video ${videos.length + 1}`,
      videoId: videoId,
    };

    // Add the new video to the videos array
    setVideos([...videos, newVideo]);

    // Clear the input field
    setNewVideoLink('');
  }

  function extractVideoId(link) {
    // Extract the video ID from the YouTube link
    // Example link: https://www.youtube.com/watch?v=ABC12345
    const videoId = link.split('v=')[1];
    return videoId;
  }


  return (
    <div className="container mx-auto px-4 py-2">
      {showSingleVideo ? (
        <div>
          <button onClick={() => setShowSingleVideo(false)}>
            <img src="/assets/icons/back-arrow2.svg" className="w-5 h-5" />
          </button>
          <SingleVideo brandData={brandData} views={views} video={currentVideo} />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">YouTube Video List</h1>
          
          <VideoList
            handleSingleVideo={handleSingleVideo}
            videos={videos}
          />
        </div>
      )}
    </div>
  );
};

export default App;
