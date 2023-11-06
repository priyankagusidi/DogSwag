import React from 'react'
import {useState,useEffect,useRef} from 'react'
import Link from 'next/link'
import moment from 'moment'
import axios from 'axios'
import {Menu, Modal, Button, Group } from '@mantine/core';
import PawButton from '@/components/utils/like/likebutton';
import {FacebookShareButton ,LinkedinShareButton,WhatsappShareButton ,WhatsappIcon,FacebookIcon,LinkedinIcon} from 'react-share'
import { useRouter } from 'next/router'
import Lottie from "lottie-react";
// import { useLottie , useLottieInteractivity} from "lottie-react";

import Like from "./lottie/Like3.json";



export default function Userinfo({blogdatas,setBlogdatas,userdata}){
    // console.log(Lottie)
    // return null
    const router = useRouter()
    const [opened, setOpened] = useState(false);
    const [title,setTitle] =useState("")
    const [description,setDescription] =useState("")
    const [coverImage,setCoverImage] =useState("")
    const [slug,setSlug] =useState("")
    const [isLiked,setIsLiked] = useState(blogdatas && blogdatas.likes.includes(userdata.user && userdata.user._id) ? true : false)
    const [starred, setStarred] = useState(false);
    const [errorText,setErrorText] = useState("")
    const [reportModal,setReportModal] = useState(false)
    
     
const lottieRef = useRef();

// console.log(isLiked)
    useEffect(()=>{
          if(isLiked){
            lottieRef.current.playSegments([30,80],true)
          }else{
            lottieRef.current.playSegments([1,19],true)
          }        
    },[isLiked])


    console.log(userdata)
    async function onFollow(){ 
     if(!userdata.user){
       router.push('/login')
       return
     }
     if(!userdata.user.hascreatedprofile){
        router.push('/createprofile')
        return
     }
     try{
         if(!blogdatas.InfoID.followers.includes(userdata.user && userdata.user._id)){
            setBlogdatas({...blogdatas,InfoID:{...blogdatas.InfoID ,followers:[...blogdatas.InfoID.followers,userdata.user && userdata.user._id]}})
         } else {
             setBlogdatas({...blogdatas,followers:[...blogdatas.InfoID.followers.filter(f=>f!==userdata.user._id)]})
             setBlogdatas({...blogdatas,InfoID:{...blogdatas.InfoID ,followers:[...blogdatas.InfoID.followers.filter(f=>f!==userdata.user._id)]}})
             
         }
     await axios.put(`/api/info/follow/${blogdatas.bloggerID._id}`)        
     }catch(err){
        console.log(err)
     }
}

  function onShare(title,desc,image,slug){
    setTitle(title)
    setDescription(desc)
    setCoverImage(image)
    setSlug(slug)
    console.log(slug)
    setOpened(true)
  }


  async function onLike(id){
    if(!userdata.user){
       router.push('/login')
       return
    }
    if(!userdata.user.hascreatedprofile){
        router.push('/createprofile')
        return
     }

    if(blogdatas.likes.includes(userdata.user._id)){
        const del = blogdatas.likes.filter(l=>l!== userdata.user._id)
        setBlogdatas({...blogdatas,likes:del})
    }else{
        setBlogdatas({...blogdatas,likes:[...blogdatas.likes,userdata.user._id]})
    }
    setIsLiked(!isLiked)

    try{
       await axios.put(`/api/blogs/like/${id}`).then(res=>console.log(res))
    }catch(err){
        console.log(err)
    }
}

 async function reportError(id){

        if(!errorText){
            alert("please input some text")
            return
        }
        try{
            await axios.post('/api/info/report',{text:errorText}).then(res=>{
                console.log(res)
            })
            await axios.put(`/api/blogs/reported/${id}`,null).then(res=>{
                console.log(res)
            })
            alert("Issue reported our team will get back in 24 hours.")
            setReportModal(false)
        }catch(err){
            console.log(err)
        }
    }

    function handleError(e){
        setErrorText(e.target.value)
    }

   async function share(id) {
     try{
        await axios.put(`/api/blogs/shared/${id}`,null).then(res=>{
                console.log(res)
        })
     }
     catch(err){
        console.log(err)
     }
   }


	return (
		 <div className="flex md:items-center gap-3 flex-col md:flex-row md:justify-between ">
           <div className="flex gap-3 items-center">
            <div className=''>
                <img className=" w-10 h-10 rounded-full border border-gray-300" src={blogdatas && blogdatas.InfoID.profilePic} alt="user" height={100} width={100} style={{objectFit:"cover", overflow:"hidden"}}/>
            </div>
            <div className="flex flex-col gap-1">
              <Link scroll={false} href={`/profile/${blogdatas && blogdatas.bloggerID._id}`}>
              <h1 className='text-sm text-[#4f2000] font-semibold'>{`${blogdatas && blogdatas.InfoID.firstname} ${blogdatas && blogdatas.InfoID.lastname}`}</h1>
              </Link>
              <div className='flex items-center space-x-2'>
                    <p className='sm:text-[0.7rem] text-[0.55rem]'>{moment(blogdatas && blogdatas.createdAt).format("DD MMM YYYY")}</p>
                    <p className='sm:text-[0.7rem] text-[0.55rem] flex items-center gap-1'>
                         {/*<MdAccessTime className='sm:text-sm text-xs'/> */}
                           <img src="/assets/icons/clock.svg" className="h-3 w-3"/>
                           {blogdatas && blogdatas.readtime} min read
                    </p>
                    <p className='sm:text-[0.7rem] text-[0.55rem] flex gap-1 items-center'>
                           <img src="/assets/icons/eye2.svg" className="h-3 w-3"/>
                         {/*<AiFillEye className='sm:text-sm text-xs'/>*/}
                         {blogdatas && blogdatas.views}
                    </p>
                </div>
            </div>
            </div>
            <div className='flex gap-3'>
                {
                (userdata.user && userdata.user._id ) === (blogdatas && blogdatas.bloggerID._id)?
                <></>:
                <div className="flex">
                <div className="flex flex-col justify-between text-center font-semibold">
                <button onClick={onFollow} className={`${blogdatas && blogdatas.InfoID.followers.includes(userdata.user && userdata.user._id) ? "text-black bg-gray-300" : "text-gray-50 bg-[#5f2600]"} text-[.5em] flex justify-center h-[21px] w-16 items-center rounded`}>
                       <span>{blogdatas && blogdatas.InfoID.followers.includes(userdata.user && userdata.user._id) ? "Followed":"Follow me"}</span>
                </button>
                       <p className='text-[.6em] text-[#4f2000]'>{blogdatas && blogdatas.InfoID.followers.length} {blogdatas && blogdatas.InfoID.followers.length>1 ? "Followers":"Follower"}</p>
                </div>
                </div>
                }
                <div className="flex text-center gap-2 h-7 ">
                   <div className="flex flex-col gap-2 text-xs items-center relative w-10 h-10">
                  {/*<div onClick={()=>onLike(blogdatas && blogdatas._id)}><PawButton starred={blogdatas && blogdatas.likes.includes(userdata.user && userdata.user._id) ? starred : starred}  /></div>*/}
                   <button className="absolute -top-5" onClick={()=>onLike(blogdatas && blogdatas._id)}>
                       {/*<FaPaw size={20} className={`${blogdatas && blogdatas.likes.includes(userdata.user && userdata.user._id) ?"text-black":"text-gray-600"}`}/>*/}
                       <Lottie.default lottieRef={lottieRef} animationData={Like} loop={false} autoplay={false} className="w-14 h-14"/>
                       {/*<img src={`${blogdatas && blogdatas.likes.includes(userdata.user && userdata.user._id) ?"/assets/icons/paw_like.svg":"/assets/icons/paw.svg"}`} className="w-4 h-4"/>*/}
                       {/*{View.View}*/}

                   </button>
                   <span className="absolute top-5 text-[.7em] flex font-semibold">{blogdatas && blogdatas.likes.length} {blogdatas && blogdatas.likes.length>1 ?"Paws":"Paw"}</span>
                   </div>
                    <div className="flex flex-col gap-2 text-xs items-center relative w-10 h-10">
                  {/*<div onClick={()=>onLike(blogdatas && blogdatas._id)}><PawButton starred={blogdatas && blogdatas.likes.includes(userdata.user && userdata.user._id) ? starred : starred}  /></div>*/}
                   {/*<button className="absolute top-0" onClick={()=>onLike(blogdatas && blogdatas._id)}><FaPaw size={20} className={`${blogdatas && blogdatas.likes.includes(userdata.user && userdata.user._id) ?"text-black":"text-gray-600"}`}/></button>*/}
                   <button className='absolute top-0'  onClick={() =>onShare(blogdatas && blogdatas.title,blogdatas && blogdatas.description,blogdatas && blogdatas.coverimage.path,blogdatas && blogdatas.slug)}>
                       {/*<BsShare  size={17}/>*/}
                        <img src="/assets/icons/share.svg" className="w-4 h-4"/>
                    </button> 
                   <span className="absolute top-5 text-[.7em] flex font-semibold">{blogdatas && blogdatas.shared} {blogdatas && blogdatas.shared > 1? "Shares":"Share"}</span>
                   </div>
                      <div className="flex flex-col gap-2 text-xs items-center relative w-10 h-10">
                  {/*<div onClick={()=>onLike(blogdatas && blogdatas._id)}><PawButton starred={blogdatas && blogdatas.likes.includes(userdata.user && userdata.user._id) ? starred : starred}  /></div>*/}
                   {/*<button className="absolute top-0" onClick={()=>onLike(blogdatas && blogdatas._id)}><FaPaw size={20} className={`${blogdatas && blogdatas.likes.includes(userdata.user && userdata.user._id) ?"text-black":"text-gray-600"}`}/></button>*/}
                   <button className='absolute top-0'  onClick={()=>setReportModal(true)}>
                       {/*<BsShare  size={17}/>*/}
                        <img src="/assets/icons/exclamation.svg" className="w-4 h-4"/>
                    </button> 
                   <span className="absolute top-5 text-[.7em] flex font-semibold">{blogdatas && blogdatas.reported} {blogdatas && blogdatas.reported>1 ? "Reports":"Report"}</span>
                   </div>
                </div>
              </div>
                     <Modal
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="Share"
                >
                <div className="flex flex-col gap-1">
                 <div><img className="object-cover h-40 w-full rounded-xl" src={coverImage}/></div>
                 <div><h2 className="text-lg font-bold">{title}</h2></div>
                 <div><p className="text-sm text-gray-500">{description}</p></div>
                 <div><a rel="noreferrer" target="_blank" href={`https://dogswag.club/blog/${slug}`} className="mt-2 cursor-pointer text-sm text-blue-400 hover:bg-gray-200 py-2 bg-gray-100 rounded-full justify-center flex text-center">{`https://dogswag.club/blog/${slug}`}</a></div>
                 <div className="flex gap-2 justify-end items-center mt-5">
                 <div className="text-xs text-gray-500">Share with</div>
                 <FacebookShareButton
                    url={`https://dogswag.club/blog/${slug}`}
                    onClick={()=>share(blogdatas && blogdatas._id)}
                 >
                 <FacebookIcon size={20}/>
                 </FacebookShareButton>

                  <LinkedinShareButton
                    url={`https://dogswag.club/blog/${slug}`}
                    onClick={()=>share(blogdatas && blogdatas._id)}
                 >
                   <LinkedinIcon size={20}/>
                 </LinkedinShareButton>

                  <WhatsappShareButton
                    url={`https://dogswag.club/blog/${slug}`}
                    onClick={()=>share(blogdatas && blogdatas._id)}
                 >
                   <WhatsappIcon size={20}/>
                 </WhatsappShareButton>

                 </div>
                 </div>
                </Modal>

          <Modal
                  opened={reportModal}
                  onClose={() => setReportModal(false)}
                  size={"md"}
                  title="Let us know your issue with the blog"
        >
         <div className="flex flex-col gap-2">
              {/*<h1></h1>*/}
              <textarea onChange={handleError} className="w-full h-60 bg-white bg-gray-200 shadow shadow-inner border p-2"/>
              <div className="text-end"><button className={`bg-black text-white rounded px-3 py-1`} onClick={()=>reportError(blogdatas && blogdatas._id)}>Send</button></div>
         </div>
        </Modal>
          </div>

		)
}