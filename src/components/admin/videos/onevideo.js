import {useState,useEffect} from 'react'

export default function Video({video,handleSingleVideo}){
   const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    // const videoId = extractVideoId(videoUrl);
    if (video?.videoId) {
      fetchVideoInfo(video?.videoId);
    }
  }, [video?.videoId]);

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
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=AIzaSyDq7vqgdfAFDWxH7osR7AZYqxbI8bdY1ww`
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

	return(
		  <div onClick={()=>handleSingleVideo(video._id,videoInfo.viewCount)}  className="p-2 bg-white  rounded-xl">
          {videoInfo && (
        <div className="flex flex-col items-center justify-center">
          <div className="">
            <img className="h-40 w-80 object-cover" src={`http://img.youtube.com/vi/${video?.videoId}/0.jpg`} alt="Video Thumbnail" />
          </div>
          <div>
            <h2 className="text-md font-bold mt-1">{videoInfo.title}</h2>
            <p className="text-xs text-gray-600">Author: {videoInfo.channelTitle}</p>
            <p className="text-xs text-gray-600">Views: {videoInfo.viewCount}</p>
          </div>
        </div>
      )}
        </div>
		)
}