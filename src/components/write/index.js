"use client"
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import React from "react";
// import { MultiSelect, Textarea, Modal } from "@mantine/core";
import axios from 'axios'
import Link from "next/link";
import { useRouter } from 'next/router'
import Router from 'next/router'
import ProfilePicture from '@/components/utils/coverPicture'
import { Loader } from '@mantine/core';
import {FacebookShareButton ,LinkedinShareButton,WhatsappShareButton ,WhatsappIcon,FacebookIcon,LinkedinIcon} from 'react-share'
import { DEFAULT_THEME, LoadingOverlay } from '@mantine/core';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
const EditorNoSSR = dynamic(() => import("./sun"), {
    ssr: false,
});

const Modal = dynamic(() => import('@mantine/core').then((m) => m.Modal), {
  ssr: false,
});
const MultiSelect = dynamic(() => import('@mantine/core').then((m) => m.MultiSelect), {
  ssr: false,
});

const Textarea = dynamic(() => import('@mantine/core').then((m) => m.Textarea), {
  ssr: false,
});

import InviteModal from '@/components/utils/modals/invitemodal'
import AlertRequestModal from '@/components/utils/modals/alertrequestmodal'
import CreateProfileModal from '@/components/utils/modals/createprofilemodal'
import TipsData from './tipsdata'
import MonetizationData from './monetizationdata'
import { Popover, Text, Button } from '@mantine/core';

const EditorPage = ({userdata,blogdata,userprofiledata}) => {
   
    const [blog, setBlog] = useState({});
    const [editorInstance, setEditorInstance] = useState({}); /* to get the instance of editor.Js */
    const [modalopen, setModalOpen] = useState(false);
    const [screenOne, setScreenOne] = useState(false);
    const [success, setSuccess] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)
    const [blogInfos, setBlogInfos] = useState({ brandlink: "" });
    const [value, setValue] = useState([]);
    const [breeds, setBreeds] = useState(breedData)
    const [breedList, setBreedList] = useState(blogdata ? blogdata.breeds :[]);
    const [category, setCategory] = useState(categoryData)
    const [categoryList, setCategoryList] = useState(blogdata ? blogdata.category :[])
    const [coverimage, setCoverImage] = useState({})
    const [thumbImage, setThumbImage] = useState("")
    const router = useRouter();
    const [coverPic, setCoverPic] = useState(blogdata && blogdata.coverimage ? blogdata.coverimage.path: null)
    const [selectedImage, setSelectedImage] = useState(blogdata && blogdata.coverimage ? blogdata.coverimage.path: null)
    const [title, setTitle] = useState(blogdata ? blogdata.title : "")
    const [description, setDescription] = useState(blogdata ? blogdata.description:"")
    const [content, setContent] = useState(blogdata && blogdata.blog ? JSON.parse(blogdata.blog) : "")
    const [defaultValue,setDefaultValue] = useState(blogdata && blogdata.blog ? JSON.parse(blogdata.blog) : "")
    const [wordLength, setWordLength] = useState(blogdata ? blogdata.textlen:0)
    const [slug , setSlug] = useState("")
    const [isRedirecting,setIsRedirecting] = useState(false)
    const [showExtra,setShowExtra] = useState(false)
    const [recommandations,setRecommandations] =useState([])
    const [signModal,setSignModal] = useState(false)
    const [seoarr,setSeoArr] = useState([])
    const [openSeoModal,setOpenSeoModal]=useState(false)
    const [openWriteModal, setOpenWriteModal] = useState(false)
    const [isSentRequest, setIsSentRequest] = useState(false)
    const [isOpenCreateProfile, setOpenCreateProfile] = useState(false)


    async function fetchRecom(){
          try{
              await axios.get("/api/recommandation/").then(res=>{
                setRecommandations(res.data.Recommandations)
              })
          }catch(err){
            console.log(err)
          }
     }

    useEffect(()=>{
       fetchRecom()
    },[])
    console.log(recommandations)
    console.log(content)
    // if (userprofiledata.error) {
    //     return <div className="flex flex-col justify-center items-center h-screen text-gray-500">Complete your profile to start blogging !! <Link href="/createprofile"><div className=""><button className="bg-[#5f2600] text-white p-2 rounded text-xs">create your profile</button></div></Link></div>
    // }



    function submit(e) {
        e.preventDefault()
    }

    function checkSeo(){
      const abc = []
      if(title.split(" ").length < 8){
         // alert(`${title.split(" ").length} title length should be greate than 8`)
         abc.push("title length should be greate than 8")
      }
// setSeoArr
     //const abc = new SeoAnalyzer()..addRule('imgTagWithAltAttributeRule').outputConsole();
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(content, 'text/html');
      const imgTags = htmlDoc.getElementsByTagName('img');
      const aTags = htmlDoc.getElementsByTagName('a');
      const h1Tags = htmlDoc.getElementsByTagName('h1');
      if(imgTags.length < 2){
         abc.push("Number of a image should be greater than 2")
      }
      if(aTags.length <1){
         abc.push("Number of internal should be greater than 1")
      }

      if(h1Tags.length <2){
         abc.push("Number of a H1 heading should be greater than 2")
      }

     setSeoArr(abc)
     // setOpenSeoModal(true)
    }

    // console.log(seoarr)

    function validateBlog(breeds,category){
         if(!title){
          alert("Title required")
          return false
         }

        if(!description){
          alert("Description required")
          return false
        }
        if(breedList.length <1){
          alert("Atleast 1 bread required")
          return false
        }
        if(categoryList.length<1){
          alert("Atleast 1 category required")
          return false
        }
        if(wordLength<250){
          alert("Blog length can't be less than 250 words")
          return false
        }
        if(wordLength>750){
          alert("Blog length can't be greater than 750 words")
          return false
        }
        if(!coverPic){
          alert("Please add a cover image")
          return false
        }
        return true
    }


    async function onPublish(e) {
        e.preventDefault()
        const { blog, brandlink, breeds, category, sticker } = blogInfos;
        
        if(!validateBlog()){
           return 
        }

        setIsPublishing(true)
        const formData = new FormData();
        formData.append("title", title)
        formData.append("description", description)
        formData.append("blog", JSON.stringify(content))
        formData.append("brandlink", brandlink)
        formData.append("sticker", sticker)
        formData.append("breeds", JSON.stringify(breedList))
        formData.append("category", JSON.stringify(categoryList))
        formData.append("coverimage", coverPic)
        formData.append("textlen", wordLength)

        try {
            if(blogdata){

              await axios.put(`/api/blogs/edit/${blogdata._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    console.log(response);
                    setModalOpen(false);
                    setSlug(response.data.slug)
                    setSuccess(true)
                })
                .catch(error => {
                    console.log(error);
                    return router.push("/login")
                });

            }else {
              await axios.post("/api/blogs/create", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    console.log(response);
                    setModalOpen(false);
                    setSlug(response.data.slug)
                    setSuccess(true)
                })
                .catch(error => {
                    console.log(error);
                    return router.push("/login")
                });
            }
            
            setIsPublishing(false)
            closeModal1()
        } catch (err) {
            setIsPublishing(false)
            return router.push("/login")
        }

    }


    function openModal1(title, description) {
        setTitle(title)
        setDescription(description)
        setModalOpen(true);
        setScreenOne(true);
    }

    function previousModal() {
        setScreenOne(true);
    }

    function closeModal1() {
        setModalOpen(false);
        setScreenOne(true);
    }

    function openModal2() {
        setScreenOne(false);
        setBlogInfos({ ...blogInfos, category: categoryList, breeds: breedList })
    }


    function submit(e) {
        e.preventDefault();
    }

    function handleChange(e, url) {
        setBlogInfos({ ...blogInfos, [e.target.name]: e.target.value, brandlink: url });
    }

    function titleHandle(e) {
        setTitle(e.target.value)
    }

    function descriptionHandle(e) {
        if(!userdata.user){
            setSignModal(true)

        }

        if(userdata && userdata.user && !userdata.user.hascreatedprofile){
            // setOpenWriteModal(true)
            setOpenCreateProfile(true)
            return
        }

        setDescription(e.target.value)
    }

    function onPublishCompleted(){
       setSuccess(false)
       setIsRedirecting(true)
       router.push(`/blog/${slug}`)
       return
    }

    function showextrabuttons(){
       setShowExtra(!showExtra)
    }

    function setRecom(title,id){
      setTitle(title)
    }

    function onCloseSignInModal(){
        Router.push({
            pathname:'/login',
            query:{ reqinfo: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoid3JpdGUiLCJpYXQiOjE2Nzk0NjkxODB9.-yvgk4Id-4Pj78DeQUIFtXLTTgVu0wijGhL3XP5UF4w' },
        })
    }

  
    if(isRedirecting){
      return <><LoadingOverlay loaderProps={{color: 'brown' }} color={"brown"} visible /></>
    }
  
    return (
        <div className="bg-gray-100 mx-auto max-w-[1000px]">
       <div className="">
         <input value={title} onChange={titleHandle}  name="title" className="w-full px-3  text-[1.5em] md:text-[3em] py-2 appearance-none outline-0" placeholder="Title" required={true}/>
       </div>
        <div className="bg-white">
         <Textarea
         value={description}
        onChange={descriptionHandle}
        placeholder="Description"
        autosize
        name="description"
        minRows={2}
        size="md"
        variant="unstyled"
        className="w-full px-3 md:px-4 font-semibold"
      />
       </div>
       <div>
       {/*<label>
          <img src="assets/icons/arrow-back1.svg" className="w-12"/>
       </label>*/}
       <div className="flex justify-end">

      <div className="flex justify-end bottom-60 fixed z-50 flex-col gap-3">

          <label onClick={showextrabuttons} className="flex cursor-pointer text-xs absolute top-0 right-0 font-semibold items-center  justify-center text-[#5F2710] flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10 bg-white">
              <img src="assets/icons/arrow-back2.svg" className={`w-[45px] ${showExtra ? "rotate-90 transition-all":"rotate-0 transition-all"}`}/>
          </label>
          
         {/* <label  onClick={checkSeo} className="flex cursor-pointer top-2 text-xs absolute right-0 font-semibold items-center  justify-center text-[#5F2710] flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10 bg-[#FFDDAA]">
              <img src="assets/icons/seo1.svg" className={`w-8`}/>
          </label>*/}

         <div className={`absolute z-60 -top-[250px] ${showExtra ? "opacity-100":"opacity-0"}`}>
         
         <div className="flex flex-col">
         
         <div className={`flex ${showExtra ? "right-0 transition duration-600 top-[0px]":"right-0"} absolute text-xs font-semibold items-center  justify-center text-[#5F2710] flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10 bg-[#FFDDAA]`}><div>{wordLength}</div>/<div>750</div></div>
         
         {/*tips*/}
          <div className={`flex ${showExtra ? "right-0 transition duration-600 top-[50px]":"right-0"} absolute text-xs font-semibold items-center  justify-center text-[#5F2710] flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10 bg-[#FFDDAA]`}>
            <Popover position="left" width={300} withArrow>
               <Popover.Target>

              <label htmlFor="tips" className="flex text-xs cursor-pointer top-72 md:top-80 font-semibold items-center justify-center text-[#5F2710] z-50 flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10">
                <img id="tips" name="tips" src="/assets/icons/message.svg" className="w-6"/>
              </label>
               </Popover.Target>
               <Popover.Dropdown>
                  <h1 className="my-2">Tips</h1>
                  <ul className='text-xs font-normal flex flex-col gap-2'>
                    {
                     TipsData.map((m,i)=>{
                       return (
                          
                            <li key={i} className="text-gray-600"> <span className="text-black font-black">#{i+1}</span> {m.step}</li>
                        )
                     })
                    }
                 </ul>
              </Popover.Dropdown>
            </Popover>
          </div>

          {/*question*/}
          <div className={`flex ${showExtra ? "right-0 transition duration-800 top-[100px]":"right-16"} absolute text-xs font-semibold items-center  justify-center text-[#5F2710] flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10 bg-[#FFDDAA]`}>
            <Popover position="left" width={300} withArrow>
               <Popover.Target>
              <label htmlFor="tips" className="flex text-xs cursor-pointer top-72 md:top-80 font-semibold items-center justify-center text-[#5F2710] z-50 flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10">
                <img id="tips" name="tips" src="/assets/icons/idea.svg" className="w-8"/>
              </label>
               </Popover.Target>
               <Popover.Dropdown>
                  <h1 className="my-2">Recommandations <span className="font-normal">(Click on Topics to add title.)</span></h1>
                  <ul className='text-xs font-normal flex flex-col gap-2 max-w-lg h-96 overflow-auto p-2'>
                    {
                     recommandations && recommandations.map((m,i)=>{
                       return (
                          
                            <li key={m._id} onClick={()=>setRecom(m.title,m._id)} className="cursor-pointer hover:bg-blue-200  bg-gray-200 p-2 text-black"> {m.title}</li>
                        )
                     })
                    }
                 </ul>
              </Popover.Dropdown>
            </Popover>
          </div>

          {/*seo*/}

           <div className={`flex ${showExtra ? "right-0 transition duration-800 top-[150px]":"right-16"} absolute text-xs font-semibold items-center  justify-center text-[#5F2710] flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10 bg-[#FFDDAA]`} onClick={checkSeo}>
            <Popover position="left" width={300} withArrow>
               <Popover.Target>
              <label htmlFor="tips" className="flex text-xs cursor-pointer top-72 md:top-80 font-semibold items-center justify-center text-[#5F2710] z-50 flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10">
                <img id="tips" name="tips" src="/assets/icons/seo9.svg" className="w-7"/>
              </label>
               </Popover.Target>
               <Popover.Dropdown>
                  <h1 className="my-2">Seo</h1>
                  <ul className='text-xs font-normal flex flex-col gap-2 max-w-lg overflow-auto p-2'>
                   {
                    seoarr && seoarr.map((m,i)=>{
                       return(
                          <div key={i}>
                            <li className="text-red-500">{m}</li>
                          </div>
                        )
                    }) 
                  }
                 </ul>
              </Popover.Dropdown>
            </Popover>
          </div>

          <div className={`flex ${showExtra ? "right-0 transition duration-800 top-[200px]":"right-16"} absolute text-xs font-semibold items-center  justify-center text-[#5F2710] flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10 bg-[#FFDDAA]`}>
            <Popover position="left" width={300} withArrow>
               <Popover.Target>
              <label htmlFor="tips" className="flex text-xs cursor-pointer top-72 md:top-80 font-semibold items-center justify-center text-[#5F2710] z-50 flex-wrap rounded-full w-10 shadow shadow-lg shadow-gray-400 h-10">
                <img id="tips" name="tips" src="/assets/icons/money4.svg" className="w-7"/>
              </label>
               </Popover.Target>
               <Popover.Dropdown>
                  <h1 className="my-2">Monetization</h1>
                  <ul className='text-xs font-normal flex flex-col gap-2 max-w-lg overflow-auto p-2'>
                   {
                     MonetizationData.map((m,i)=>{
                       return (
                          
                            <li key={i} className="text-gray-600"> <span className="text-black font-black">#{i+1}</span> {m.step}</li>
                        )
                     })
                    }
                 </ul>
              </Popover.Dropdown>
            </Popover>
          </div>

         </div>
          </div>
      </div>
      </div>
      </div>

      <div>
          <EditorNoSSR setOpenWriteModal={setOpenWriteModal} setOpenCreateProfile={setOpenCreateProfile} setSignModal={setSignModal} userdata={userdata} defaultValue={defaultValue} setContent={setContent} wordLength={wordLength} content={content} setWordLength={setWordLength} />
      </div>

      <div className="flex justify-end max-w-[1000px] mx-auto">
        <button
          className={`px-20 py-2 rounded mt-5 text-sm ${wordLength < 250 ?"bg-gray-400 text-white":"bg-black text-gray-200"}`}
          onClick={()=>openModal1(title,description)}
          disabled={wordLength < 250 ?true:false}
        >
          NEXT
        </button>
      </div>

      <div>
                <Modal
                     opened={modalopen}
                     onClose={() => setModalOpen(false)}
                     size="lg"
                >

              <form className="" onSubmit={submit}>
            {screenOne ? (

                <div className="grid grid-row-5 gap-6 p-5">
                  
                  <h2 className="text-gray-700 flex items-center">Thumbnail&nbsp;<span className="text-sm">(1920px X 1080px recommanded)</span> </h2>
                  <ProfilePicture setPic={setCoverPic}  selectedImage = {selectedImage} setSelectedImage={setSelectedImage} defPic={"img/defaultProfile.jpg"}/>          
                 
                  <div className="w-full">
                    <h2 className="mb-2 text-gray-700">
                      Name the breed or mention as all
                    </h2>
                    <MultiSelect
                      data={breeds}
                      placeholder="Select items"
                      searchable
                      creatable
                      getCreateLabel={(query) => `+ Create ${query}`}
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setBreeds((current) => [...current, item]);
                        return item;
                      }}
                      value={breedList}
                      onChange={setBreedList}
                    />
                  </div>
                  <div>
                    <h2 className="mb-2 text-gray-700">
                      Name the category at least 3
                    </h2>
                    <MultiSelect
                      data={category}
                      placeholder="Select items"
                      searchable
                      creatable
                      getCreateLabel={(query) => `+ Create ${query}`}
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setCategory((current) => [...current, item]);
                        return item;
                      }}
                      value={categoryList}
                      onChange={setCategoryList}
                    />
                  </div>

                  <div className="text-end">

                    <button onClick={onPublish} className={`px-20 py-2 rounded mt-5 ${isPublishing ? "bg-gray-400":"bg-black"} text-gray-200 text-sm flex gap-2 relative justify-center items-center`} disabled={isPublishing ? true : false}>
                      {blogdata ? "Save":"Publish"} <div className="absolute">{isPublishing ? <Loader size="sm" color={"gray"} /> : ""}</div>
                    </button>

                    {/*<button
                      className="px-20 py-2 rounded mt-5 bg-black text-gray-200 text-sm"
                      onClick={openModal2}
                    >
                      Next
                    </button>*/}
                  </div>
                </div>
            ) : (
                <div className="grid grid-row-5 gap-4 p-5">
            
                  <div className="w-full">
                    <h2 className="mb-2 text-gray-700">Brands stickers/Gifs</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center">
                      <label>
                        <input type="radio" name="sticker" onChange={(e)=>handleChange(e,"https://google.com")} value="img/sticker1.png"/>
                        <div>
                          <img
                            className="w-20"
                            src="img/sticker1.png"
                            alt="Option 1"
                          />
                          <span className="text-sm md:block">Sticker name</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="sticker" onChange={(e)=>handleChange(e,"https://facebook.com")} value="img/sticker2.png" />
                        <div>
                          <img
                            className="w-20"
                            src="img/sticker2.png"
                            alt="Option 1"
                          />
                          <span className="text-sm md:block">Sticker name</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="sticker" onChange={(e)=>handleChange(e,"https://twitter.com")} value="img/sticker3.png" />
                        <div>
                          <img
                            className="w-20"
                            src="img/sticker3.png"
                            alt="Option 1"
                          />
                          <span className="text-sm md:block">Sticker name</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="sticker" onChange={(e)=>handleChange(e,"https://gmail.com")} value="img/sticker4.png" />
                        <div>
                          <img
                            className="w-20"
                            src="img/sticker4.png"
                            alt="Option 1"
                          />
                          <span className="text-sm md:block">Sticker name</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-2 text-gray-700">Brand link</h2>
                    <input
                      type="text"
                      className="bg-transparent border border-gray-400 rounded-md h-10 text-gray-500 w-full"
                      // onChange={handleChange}
                      readOnly={true}
                      value={blogInfos.brandlink}
                      name="brandlink"
                    />
                  </div>
                  

                  <div className="flex justify-end flex-col md:flex-row md:gap-4">
                    <button
                      className="px-20 py-2 rounded mt-5 bg-black text-gray-200 text-sm"
                      onClick={previousModal}
                    >
                      Back
                    </button>
                    {/*<button onClick={onPreview} className="px-20 py-2 rounded mt-5 bg-black text-gray-200 text-sm">
                      Preview
                    </button>*/}

                    <button onClick={onPublish} className={`px-20 py-2 rounded mt-5 ${isPublishing ? "bg-gray-400":"bg-black"} text-gray-200 text-sm flex gap-2 relative justify-center items-center`} disabled={isPublishing ? true : false}>
                     {blogdata ? "Save":"Publish"}<div className="absolute">{isPublishing ? <Loader size="sm" color={"brown"} /> : ""}</div>
                    </button>
                  </div>
                </div>
            )}

              </form>
         </Modal>

         <Modal
                     opened={openSeoModal}
                     onClose={()=>setOpenSeoModal(false)}
                     size="sm"
                     title="Seo Checker"
          >
          {
            seoarr && seoarr.map((m,i)=>{
               return(
                  <div key={i}>
                    <li className="text-red-500">{m}</li>
                  </div>
                )
            }) 
          }
          </Modal>

           <Modal
                     opened={signModal}
                     onClose={onCloseSignInModal}
                     size="sm"
                     title=""
                >
                <div className="flex items-center justify-center flex-col">
                   <h1>Please sign in to write blog</h1>
                   <Link href={"/login?reqinfo=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoid3JpdGUiLCJpYXQiOjE2Nzk0NjkxODB9.-yvgk4Id-4Pj78DeQUIFtXLTTgVu0wijGhL3XP5UF4w"}><button className="bg-[#5F2710] p-2 text-white rounded">sign in</button></Link>
                </div>
            </Modal>
            <Modal
                     opened={success}
                     onClose={onPublishCompleted}
                     size="sm"
                    transition="rotate-left"
                    transitionDuration={1000}
                    transitionTimingFunction="ease"

                >
                <div className="flex flex-col gap-1">
                 <div><img className="object-cover h-40 w-full rounded-xl" src={selectedImage}/></div>
                 <div><h2 className="text-lg font-bold">{title}</h2></div>
                 <div><p className="text-sm text-gray-500">{description}</p></div>
                 <div><a rel="noreferrer" target="_blank" href={`https://dogswag.club/blog/${slug}`} className="mt-2 cursor-pointer text-sm text-blue-400 hover:bg-gray-200 py-2 bg-gray-100 rounded-full justify-center flex text-center">{`https://dogswag.club/blog/${slug}`}</a></div>
                 <div className="flex gap-2 justify-end items-center mt-5">
                 <div className="text-xs text-gray-500">Share with</div>
                 <FacebookShareButton
                     url={`https://dogswag.club/blog/${slug}`}
                 >
                 <FacebookIcon size={20}/>
                 </FacebookShareButton>

                  <LinkedinShareButton
                    url={`https://dogswag.club/blog/${slug}`}
                 >
                   <LinkedinIcon size={20}/>
                 </LinkedinShareButton>

                  <WhatsappShareButton
                    url={`https://dogswag.club/blog/${slug}`}
                 >
                   <WhatsappIcon size={20}/>
                 </WhatsappShareButton>

                 </div>
                 </div>
            </Modal>
            <InviteModal openWriteModal={openWriteModal} setOpenWriteModal= {setOpenWriteModal} isSentRequest={isSentRequest} setIsSentRequest= {setIsSentRequest}/>
            <CreateProfileModal isOpenCreateProfile={isOpenCreateProfile} setOpenCreateProfile={setOpenCreateProfile}/>
            <AlertRequestModal isSentRequest = {isSentRequest} setIsSentRequest ={setIsSentRequest}/>
      </div>
    </div>
    );
};

export default EditorPage;

const categoryData = [
    { value: "food", label: "Food" },
    { value: "health", label: "Health" },
    { value: "training", label: "Training" },
    { value: "toy", label: "Toy" },
    { value: "play", label: "Play" },
    { value: "vet", label: "Vet" },
    { value: "medicine", label: "Medicine" },
    { value: "natural", label: "Natural" },
    { value: "remedies", label: "Remedies" },
    { value: "boarding", label: "Boarding" },
    { value: "herbs", label: "Herbs" },
    { value: "spices", label: "Spices" },
    { value: "organic", label: "Organic" },
];

const breedData = [
    { value: "afghan hound", label: "Afghan hound" },
    { value: "airedale terrier", label: "Airedale terrier" },
    { value: "akita", label: "Akita" },
    { value: "alaskan Malamute", label: "Alaskan Malamute" },
    {
        value: "american Staffordshire terrier",
        label: "American Staffordshire terrier",
    },
    { value: "american water spaniel", label: "American water spaniel" },
    { value: "australian cattle dog", label: "Australian cattle dog" },
    { value: "australian shepherd", label: "Australian shepherd" },
    { value: "australian terrier", label: "Australian terrier" },
    { value: "aasenji", label: "basenji" },
    { value: "aasset hound", label: "basset hound" },
    { value: "beagle", label: "beagle" },
    { value: "bearded collie", label: "bearded collie" },
    { value: "bedlington terrier", label: "Bedlington terrier" },
    { value: "bernese mountain dog", label: "Bernese mountain dog" },
    { value: "bichon frise", label: "bichon frise" },
    { value: "black and tan coonhound", label: "black and tan coonhound" },
    { value: "bloodhound", label: "bloodhound" },
    { value: "border collie", label: "border collie" },
    { value: "border terrier", label: "border terrier" },
    { value: "borzoi", label: "borzoi" },
    { value: "boston terrier", label: "Boston terrier" },
    { value: "bouvier des Flandres", label: "bouvier des Flandres" },
    { value: "boxer", label: "boxer" },
    { value: "briard", label: "briard" },
    { value: "brittany", label: "Brittany" },
    { value: "brussels griffon", label: "Brussels griffon" },
    { value: "bull terrier", label: "bull terrier" },
    { value: "bulldog", label: "bulldog" },
    { value: "bullmastiff", label: "bullmastiff" },
    { value: "cairn terrier", label: "cairn terrier" },
    { value: "banaan dog", label: "Canaan dog" },
    { value: "bhesapeake Bay retriever", label: "Chesapeake Bay retriever" },
    { value: "bhihuahua", label: "Chihuahua" },
    { value: "bhinese crested", label: "Chinese crested" },
    { value: "bhinese shar-pei", label: "Chinese shar-pei" },
    { value: "chow chow", label: "chow chow" },
    { value: "blumber spaniel", label: "Clumber spaniel" },
    { value: "cocker spaniel", label: "cocker spaniel" },
    { value: "collie", label: "collie" },
    { value: "curly-coated retriever", label: "curly-coated retriever" },
    { value: "dachshund", label: "dachshund" },
    { value: "balmatian", label: "Dalmatian" },
    { value: "boberman pinscher", label: "Doberman pinscher" },
    { value: "bnglish cocker spaniel", label: "English cocker spaniel" },
    { value: "bnglish setter", label: "English setter" },
    { value: "bnglish springer spaniel", label: "English springer spaniel" },
    { value: "bnglish toy spaniel", label: "English toy spaniel" },
    { value: "bskimo dog", label: "Eskimo dog" },
    { value: "binnish spitz", label: "Finnish spitz" },
    { value: "flat-coated retriever", label: "flat-coated retriever" },
    { value: "fox terrier", label: "fox terrier" },
    { value: "foxhound", label: "foxhound" },
    { value: "French bulldog", label: "French bulldog" },
    { value: "berman shepherd", label: "German shepherd" },
    { value: "berman shorthaired pointer", label: "German shorthaired pointer" },
    { value: "berman wirehaired pointer", label: "German wirehaired pointer" },
    { value: "golden retriever", label: "golden retriever" },
    { value: "bordon setter", label: "Gordon setter" },
    { value: "breat Dane", label: "Great Dane" },
    { value: "greyhound", label: "greyhound" },
    { value: "irish setter", label: "Irish setter" },
    { value: "irish water spaniel", label: "Irish water spaniel" },
    { value: "irish wolfhound", label: "Irish wolfhound" },
    { value: "jack Russell ", label: "Jack Russell " },
    { value: "terrier", label: "terrier" },
    { value: "japanese spaniel", label: "Japanese spaniel" },
    { value: "keeshond", label: "keeshond" },
    { value: "kerry blue terrier", label: "Kerry blue terrier" },
    { value: "komondor", label: "komondor" },
    { value: "kuvasz", label: "kuvasz" },
    { value: "labrador retriever", label: "Labrador retriever" },
    { value: "lakeland terrier", label: "Lakeland terrier" },
    { value: "lhasa apso", label: "Lhasa apso" },
    { value: "maltese", label: "Maltese" },
    { value: "manchester terrier", label: "Manchester terrier" },
    { value: "mastiff", label: "mastiff" },
    { value: "mexican hairless", label: "Mexican hairless" },
    { value: "ewfoundland", label: "Newfoundland" },
    { value: "orwegian elkhound", label: "Norwegian elkhound" },
    { value: "orwich terrier", label: "Norwich terrier" },
    { value: "otterhound", label: "otterhound" },
    { value: "papillon", label: "papillon" },
    { value: "Pekingese", label: "Pekingese" },
    { value: "pointer", label: "pointer" },
    { value: "Pomeranian", label: "Pomeranian" },
    { value: "poodle", label: "poodle" },
    { value: "pug", label: "pug" },
    { value: "puli", label: "puli" },
    { value: "rhodesian ridgeback", label: "Rhodesian ridgeback" },
    { value: "rottweiler", label: "Rottweiler" },
    { value: "saint Bernard", label: "Saint Bernard" },
    { value: "saluki", label: "saluki" },
    { value: "samoyed", label: "Samoyed" },
    { value: "schipperke", label: "schipperke" },
    { value: "schnauzer", label: "schnauzer" },
    { value: "scottish deerhound", label: "Scottish deerhound" },
    { value: "scottish terrier", label: "Scottish terrier" },
    { value: "sealyham terrier", label: "Sealyham terrier" },
    { value: "shetland sheepdog", label: "Shetland sheepdog" },
];