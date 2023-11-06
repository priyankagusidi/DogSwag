import React from 'react'
import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import axios from 'axios'
import { convert } from 'html-to-text';
import {Menu, Overlay} from '@mantine/core';
import PawButton from '@/components/utils/like/likebutton';
import UserInfo from './userInfo'
import {FacebookShareButton ,LinkedinShareButton,WhatsappShareButton ,WhatsappIcon,FacebookIcon,LinkedinIcon} from 'react-share'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Modal = dynamic(() => import('@mantine/core').then((m) => m.Modal), {
  ssr: false,
});

const Button = dynamic(() => import('@mantine/core').then((m) => m.Button), {
  ssr: false,
});

// const Overlay = dynamic(() => import('@mantine/core').then((m) => m.Overlay), {
//   ssr: false,
// });


import Banner from './banner';

const Preview = ({blogdata,userdata,ipdata}) => {
    const [blogdatas,setBlogdatas] = useState(blogdata ?blogdata : {})
    const router = useRouter()
    const {user} = userdata
    const html = blogdata && blogdata.blog ? JSON.parse(blogdata.blog) :""
    const text = convert(html);
    const [startTime, setStartTime] = useState(Date.now());
    const [timeSpent, setTimeSpent] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [iframeHeight, setIframeHeight] = useState(0);
    const [coinModal,setCoinModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false);


    const [maxScrollPercentage, setMaxScrollPercentage] = useState(0);

    const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://dogswag.club" }`

    useEffect(() => {
        let scrollTimeout;
        const handleScroll = () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
          const currentPosition = window.pageYOffset;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const maxScroll = documentHeight - windowHeight;
          const maxScrollPercentage = (currentPosition / maxScroll) * 100;
          setMaxScrollPercentage((prevMaxScrollPercentage) => {
            if (maxScrollPercentage > prevMaxScrollPercentage) {
              return maxScrollPercentage;
            }
            return prevMaxScrollPercentage;
          });
          }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {

    const startTime = Date.now();
    const intervalId = setInterval(() => {
    }, 1000);
    
    setTimeSpent(Date.now() - startTime);

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      const totalTimeSpent = Date.now() - startTime;
     
      if(totalTimeSpent/1000 > 10 && userdata && !userdata.user){
             window.history.pushState(null, null, '?coin=true');      
      }
      axios.put(`/api/blogs/spenttime/${blogdatas.slug}`, {
        maxScrollPercentage: maxScrollPercentage,
        totalTimeSpent: (totalTimeSpent / 1000).toFixed(2),
      }).then(res => {
        console.log(res.data);
      });
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      const totalTimeSpent = Date.now() - startTime;

      if(totalTimeSpent/1000 > 10 && userdata && !userdata.user){
             window.history.pushState(null, null, '?coin=true');      
      }
      axios.put(`/api/blogs/spenttime/${blogdatas.slug}`, {
        maxScrollPercentage: maxScrollPercentage,
        totalTimeSpent: (totalTimeSpent / 1000).toFixed(2),
      }).then(res => {
        console.log(res.data);
      });
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [blogdatas.slug, maxScrollPercentage]);


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




useEffect(()=>{
const videoContainers = document.getElementsByClassName('se-video-container');

    for (let i = 0; i < videoContainers.length; i++) {
      videoContainers[i].style = {};
    }
  
  async function fetchData() {
    try{
       console.log("helo")
       await axios.get(`/api/blogs/countviews/${blogdatas.slug}`).then(res=>{
         console.log(res)
       })
    }catch(err){
      console.log(err)
    }
  }
  fetchData()
},[])





if(!blogdatas.InfoID){
    return <div>Loading...</div>
}


console.log(blogdatas)
// console.log(user._id,blogdatas.bloggerID._id,(user && user._id )=== (blogdatas && blogdatas.bloggerID._id))

  return (
      <section className='max-w-[1000px] mx-auto font-[poppins] p-5 bg-white'>
        
        <Banner/>
        <UserInfo userdata={userdata} setBlogdatas={setBlogdatas} blogdatas={blogdatas}/>

       {/* <div className="fixed right-0">
            <div className='text-center'>
                <img src={blogdata && blogdatas.sticker || "img/sticker.png"} alt="" className='md:h-20 sm:h-16 h-12'/>
                <li className='text-blue-500 underline list-none md:text-sm sm:text-[0.8rem] text-xs cursor-pointer'>{blogdata && blogdatas.brandlink}</li>
                <p className='flex w-fit md:text-xs sm:text-[0.67rem] text-[0.63rem]'><span><BsTag/></span>Promoted</p>
            </div>
        </div>*/}


      {/* -----------------header end------------------------ */}
      <div className="flex flex-col py-2 mt-4">
        <h1 className='text-3xl md:text-5xl font-bold text-gray-800'> {blogdata && capitalizeFirstLetter(blogdatas.title)} </h1>
        <p className="text-[1em] md:text-md text-gray-500 font-bold mt-4">{blogdata && capitalizeFirstLetter(blogdata.description)}</p>
       {/* <div className='flex space-x-2'>
                {
                    blogdata && blogdatas.category && blogdata && blogdatas.category.map((c,i)=>{
                        return <button key={i} className='border border-[#692a00] text-xs rounded-full px-1 text-[#4f2000] hover:text-[#ca570a]'>{c}</button>
                    })
                }
        </div>*/}
      </div>
        <div className='mt-5'>
        <img  src={blogdata && blogdatas.coverimage.path} alt="" className='object-contain sm:48 md:h-96 w-full border'/>
      </div>
           

         <div className="prose" style={{maxWidth:"2000px",wordWrap: "break-word" ,fontFamily: "poppins"}}>
              <div className="" style={{fontFamily:"poppins"}}  dangerouslySetInnerHTML={{__html: html}}></div>
          </div>
    




        {/* -----------------About sectio---------- */}
        <h2 className='py-2 my-2 md:text-xl sm:text-[1.5rem] text-lg font-semibold text-[#5f2600]'>About the Author</h2>
        <UserInfo userdata={userdata} setBlogdatas={setBlogdatas} blogdatas={blogdatas}/>        
        <p className='text-[#5f2600] opacity-80 mt-3 text-xs my-9'>{blogdata && blogdatas.InfoID.bio}</p>

      {/* -------------------------------about section end------------------- */}      
      </section>
  )
}

export default Preview