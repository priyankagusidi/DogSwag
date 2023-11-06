import React, { useEffect, useState ,useRef} from "react";
import { Carousel } from '@mantine/carousel';
import MemeUpload from '@/components/utils/memeUpload'
import VideoUpload from '@/components/utils/videoUpload'
import {Modal}from '@mantine/core'
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router'
import axios from 'axios'
import Head from 'next/head'
import {FacebookShareButton ,LinkedinShareButton,WhatsappShareButton ,WhatsappIcon,FacebookIcon,LinkedinIcon} from 'react-share'
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd'
import Link from 'next/link'
import { Tabs, Loader } from '@mantine/core';
import ReactPlayer from 'react-player'
import ImageContainer from './meme/imageContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



export default function WoofWoof({userdata,memedata}){

    const router = useRouter()
    const [isSliderOpen,setIsSliderOpen] = useState(false)
    const [isMemeModalOpen,setIsMemeModalOpen] = useState(false)
    const [width, setWidth]   = useState(window.innerWidth);
   	const [height, setHeight] = useState(window.innerHeight);
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [coverPic, setCoverPic] = useState([])
    const [container,setContainer] = useState([])
    const [caption,setCaption] = useState("")
    const [imageList,setImageList] = useState([])
    const [captionData,setCaptionData] = useState("")
    const [typeData,setTypeData] = useState(null)
    const [memedatas,setmemedatas] = useState(memedata ?memedata.memes :[])
    const [currentSlideIndex,setCurrentSlideIndex] = useState(0)
    const [image,setImage]= useState("")
    const [openShareModal ,setOpenShareModal] = useState(false)
    const [memeID,setMemeID] = useState("")
    const caras = useRef(null)
    const [skip,setSkip] = useState(6)
    const [isLoadingMore,setIsLoadingMore] = useState(false)

    const  Loader = dynamic(() => import('@mantine/core').then((m) => m.Loader), {
        ssr: false,
    });
    const [isPublishing,setIsPublishing] = useState(false)

     const [images, setImages] = useState([
    { id: 1, url: '/assets/icons/back-arrow.svg' },
    { id: 2, url: '/assets/icons/square-plus.svg' },
    { id: 3, url: '/assets/icons/linkedin.svg'},
  ]);

  const moveImage = (dragId, dropId) => {
    const dragIndex = selectedImage.findIndex((img,i) => i === dragId);
    const dropIndex = selectedImage.findIndex((img,i) => i === dropId);

    const newImages = [...selectedImage];
    const [removed] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, removed);
    
    const dragIndex2 = coverPic.findIndex((img,i) => i === dragId);
    const dropIndex2 = coverPic.findIndex((img,i) => i === dropId)
    const newImages2 = [...coverPic];
    const [removed2] = newImages2.splice(dragIndex2, 1);
    newImages2.splice(dropIndex2, 0, removed2);

    setSelectedImage(newImages);
    setCoverPic(newImages2)
  };
  console.log(memedata)
console.log(selectedImage)
console.log(coverPic)
	const updateDimensions = () => {
	    setWidth(window.innerWidth);
		    setHeight(window.innerHeight);
	}
	useEffect(() => {
	    window.addEventListener("resize", updateDimensions);
	    return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	function openSlider(imglist,caption,type){
		setImageList(imglist)
		setCaptionData(caption)
		setIsSliderOpen(true)
		setTypeData(type)
		setCurrentSlideIndex(0)
	}

    async function getMoreBlogs(){
      setIsLoadingMore(true)
      await axios.get(`/api/memes/${skip}`).then(res=>{
        setmemedatas([...memedatas,...res.data.memes])
        setIsLoadingMore(false)
        setSkip(skip+6)
      }).catch(err=>{
        setIsLoadingMore(false)
      })
    }

  async function onDelete(id){
  // await axios.delete(`/api/memes/delete/${id}`)
  const deletePost = memedatas.filter(d=>id !== d._id)
  setmemedatas(deletePost)
  return
}
  


	function closeSlider(){
		setIsSliderOpen(false)
		setImageList([])
		setCaptionData("")
		setCurrentSlideIndex(0)
	}

	function openModal(){
		setIsMemeModalOpen(true)
	}
	 async function onPublish(e) {
         setIsMemeModalOpen(false)
	 	// return
        e.preventDefault()
	    if(!userdata.user){
	       router.push('/login')
	       return
	    }
	    if(!userdata.user.hascreatedprofile){
	        router.push('/createprofile')
	        return
	     }
        const formData = new FormData();
        formData.append("caption", caption)

        formData.append("type",selectedImage ? "image":"video")


        if (coverPic.length != 0) {
        for (const single_file of coverPic) {
            formData.append('memeimages', single_file)
          }
        }

        try {
                setIsPublishing(true)


          await axios.post("/api/memes/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                setContainer([])
                setCoverPic([])
                setSelectedImage(null)
                alert("It will be updated after approval by admin")
                setIsPublishing(false)
            })
            .catch(error => {
                setContainer([])
                setCoverPic([])
                setSelectedImage(null)
                setIsMemeModalOpen(false)
                setIsPublishing(false)
                return router.push("/login")
          
            });
            
        } catch (err) {
            setIsPublishing(false)
            setContainer([])
            setCoverPic([])
            setSelectedImage(null)
            return router.push("/login")
        }

    }

    function handleCaption(e){
    	e.preventDefault()
    	setCaption(e.target.value)
    }

    async function onLike(id) {
    	if(!userdata.user){
	       router.push('/login')
	       return
	    }
	    if(!userdata.user.hascreatedprofile){
	        router.push('/createprofile')
	        return
	     }
    	 const like = memedatas.map((m,i)=>{
    	 	if(m._id === id){
    	 	    if(m.likes.includes(userdata.user._id)){
    	 	    	console.log("exist")
    	 	    	const removelike = m.likes.filter(d=>d !== userdata.user._id)
    	 	    	console.log(removelike)	

    	 	    	return {...m, likes:removelike}


    	 	    }else {
    	 	    	console.log("not exist")
    	 	    	return {...m, likes:[...m.likes,userdata.user._id]}
    	 	    }
    	 	}else {
    	 		return {...m}
    	 	}
    	 })
    	 console.log(like)
    	 setmemedatas(like)
    	 try{
    	 	await axios.put(`/api/memes/like/${id}`).then(res=>{
    	 	})
    	 }catch(err){
    	 }
    }

        async function onFollow(id,userID) {

        if(!userdata.user){
	       router.push('/login')
	       return
	    }
	    if(!userdata.user.hascreatedprofile){
	        router.push('/createprofile')
	        return
	    }

    	 const follow = memedatas.map((m,i)=>{
    	      if(m.userID._id === userID){
    	 	    if(m.InfoID.followers.includes(userdata.user._id)){
    	 	    	console.log("exist")
    	 	    	const removefollower = m.InfoID.followers.filter(d=>d !== userdata.user._id)
    	 	    	return {...m, InfoID:{...m.InfoID,followers:removefollower}}
    	 	    }else {
    	 	    	console.log("not exist")
    	 	    	return {...m, InfoID:{...m.InfoID,followers:[...m.InfoID.followers,userdata.user._id]}}
    	 	    }
    	 	}else {
    	 		return {...m}
    	 	}

    	 })
    	 setmemedatas(follow)
    	 try{
    	 	await axios.put(`/api/info/follow/${userID}`).then(res=>{
    	 		console.log(res)
    	 	})
    	 }catch(err){
    	 	console.log(err)
    	 }
    }


     
    	
   async function onShare(image,caption,id){
   	    setImage(image)
   	    setMemeID(id)
		setCaptionData(caption)
		setOpenShareModal(true)
   }




   function handleDragEnd(results){
   	  // if(!results.destination) return
   	  // let tempUser = [...selectedImage]
   	  // let [selectedRow] = tempUser.splice(results.source.index,1)
   	  // tempUser.splice(results.destination.index,0,selectedRow) 

   	  // let tempPic = [...coverPic]
   	  // console.log(tempPic)
   	  // let [selectedPic] = tempPic.splice(results.source.index,1)
   	  // tempPic.splice(results.destination.index,0,selectedPic) 
   	  // setCoverPic(tempPic)
   	  // setSelectedImage(tempUser)
   }





 	
	if(isSliderOpen){
		return(
			  <div className="max-w-[1000px] bg-white mx-auto p-2 flex flex-col gap-3">
			    <div className="flex">
			    	<button className="cursor-pointer bg-[#5f2600] border w-12 flex justify-center rounded-md" onClick={closeSlider}><img src="/assets/icons/back-arrow.svg" className="w-8 h-8 invert" /></button>
			    </div>

			    <div className="p-2 border shadow-inner">
					<Carousel
					
				      controlSize={width > 700 ? 90:40 }
				      withIndicators
				      styles={{
				        control: {
				          borderRadius:"10px",
				          // backgroundColor:'white !important',	
				          '&[data-inactive]': {
				            opacity: 0,
				            cursor: 'default',
				          },
				        },
				        indicator: {
				          width: '10px',
				          height: '10px',
				          borderRadius:'20px',
				          border:'1px solid white',
				          backgroundColor:'white !important',
				          color:'white',
				          zIndex:'90',
				          transition: 'width 250ms ease',

				          '&[data-active]': {
				            width:'2rem',
				          },
				        },
				      }}

				  >
				    {
				    	typeData === "video" ? 
				    	  <Carousel.Slide ><video alt="dog" className="object-cover mx-auto md:h-96" src={imageList} controls/></Carousel.Slide>
				    	:
				    	imageList.map((m,i)=>{
				          return <Carousel.Slide key={i}><img alt="dog" className="object-cover mx-auto md:h-96" src={m}/></Carousel.Slide>
				    	})
				    }				      
				    </Carousel>
				    <div className="text-xs p-2 ">
				  	          {captionData}    
				  	</div>
			    </div>
			    <div className="flex w-full justify-center">
	
		       </div>
			  </div>
			)
	}

	return(
		  <div className="max-w-[1000px] bg-white mx-auto relative mb-20 border z-0">
{
	isPublishing ?
		  <div className="flex justify-center mt-10" ><Loader color="gray" size="sm"/></div>
		  :
		  <></>
}

		  {
		  	memedatas.length > 0 ?
		  <div className="grid xs:grid-cols-2 gap-6 p-2 justify-items-center">
		     {
		     	memedatas && memedatas.map((m,i)=>{
		     		return(
		     			<div key={m._id} className="border">
		     			   <div className="border-b  p-2 flex gap-2 rounded">
		     			       <h3 className="text-sm font-semibold">{`${m.InfoID.firstname} ${m.InfoID.lastname}`}</h3>
		     			        {
		     			           userdata && userdata.user && userdata.user._id === m.userID._id ? 
		     			        	<></>: 
		     			            <button onClick={()=>onFollow(m._id,m.userID._id)} className={`w-16 rounded text-[.6em] ${m.InfoID.followers.includes(userdata && userdata.user && userdata.user._id) ? "bg-gray-300 text-black" : "bg-[#5f2600] text-white"}`}> {m.InfoID.followers.includes(userdata && userdata.user && userdata.user._id) ? "Followed" : "Follow"}</button>
		     			        }
		     			        {/*<button onClick={()=>onDelete(m._id)} className="p-1 text-[.6em] bg-[brown] text-white">Del</button>*/}
		     			    </div>

		                    <div  onClick={()=>openSlider(m.imagelist,m.caption,m.type)} className="w-72 h-72 bg-gray-100 cursor-pointer xs:w-48 xs:h-48 sm:w-72 sm:h-72 md:h-96 md:w-96">
					  		   {

					  		   	m.type ==="video" ?
					  		   	     <div className={`grid grid-cols-1`}>
					  		        {
					  		       
					  		        	m.imagelist && m.imagelist.map((img,ind)=>{
					  		               return <video key={ind} alt="dog" className="object-cover cursor-pointer w-72 h-72 xs:w-48 xs:h-48 sm:h-72 sm:w-72 md:h-96 md:w-96 border" src={img} controls/>
					  		        	})

					  		        }				  
					       	        </div>
					  		   	:
					  		   	m.imagelist.length === 4 ? 

					  		   	  <div className={`grid grid-cols-2`}>
					  		        {
					  		       
					  		        	m.imagelist && m.imagelist.map((img,ind)=>{
					  		               return <img key={ind} alt="dog" className="object-cover cursor-pointer w-36 h-36 xs:w-24 xs:h-24 sm:h-36 sm:w-36 md:h-48 md:w-48 border" src={img}/>
					  		        	})

					  		        }				  
					       	        </div>
					       	        :
					  		   	m.imagelist.length === 3 ?
					  		   	<>
					  		   	     <div className={`grid grid-cols-2`}>
					  		        {
					  		       
					  		        	m.imagelist && m.imagelist.slice(0,2).map((img,ind)=>{
					  		               return <img key={ind} alt="dog" className="object-cover cursor-pointer w-36 h-36 xs:w-24 xs:h-24 sm:h-36 sm:w-36 md:h-48 md:w-48 border" src={img}/>
					  		        	})

					  		        }				  
					       	        </div>
				  		            <img src={`${m.imagelist[2]}`} className="w-full object-cover h-36  xs:h-24 sm:h-36  md:h-48  cursor-pointer border"/>
				  		       </>
				  		       :
				  		       m.imagelist.length === 2 ?
				  		             <div className={`grid grid-cols-2`}>
					  		        {
					  		       
					  		        	m.imagelist && m.imagelist.map((img,ind)=>{
					  		               return <img key={ind} alt="dog" className="object-cover cursor-pointer w-72 h-72 xs:w-48 xs:h-48 sm:h-72 sm:w-72 md:h-96 md:w-96 border" src={img}/>
					  		        	})

					  		        }				  
					       	        </div>
					       	   :
					       	         <div className={`grid grid-cols-1`}>
					  		        {
					  		       
					  		        	m.imagelist && m.imagelist.map((img,ind)=>{
					  		               return <img key={ind} alt="dog" className="object-cover cursor-pointer w-72 h-72 xs:w-48 xs:h-48 sm:h-72 sm:w-72 md:h-96 md:w-96 border" src={img}/>
					  		        	})

					  		        }				  
					       	        </div>
					  		   }
					  		
				  	      </div>
				  	      <div className="h-10 p-1 flex flex-wrap w-72  xs:w-48 sm:w-72 md:w-96 bg-gray-100">
		     			  <h3 className="text-xs text-gray-600">{`${m.caption && m.caption.length > 100 ? m.caption.slice(0,3)+"..." : m.caption}`}</h3>
		     			  </div>
				  	      <div className="grid grid-cols-2">
		     			    <div onClick={()=>onLike(m._id)} className="font-bold text-sm p-2 items-center gap-3 border flex justify-center cursor-pointer hover:bg-gray-100">
		     			   	  <img src={m.likes.includes(userdata && userdata.user && userdata.user._id)?"/assets/icons/paw_like.svg" : "/assets/icons/paw.svg"} className="w-4 h-4"/>
		     			   	  <span className="font-normal text-xs">{m.likes.length} likes</span>
		     			    </div>
		     			     <div onClick={()=>onShare(m.imagelist[0],m.caption,m._id)} className="font-bold text-sm p-2 items-center gap-3 border flex justify-center cursor-pointer hover:bg-gray-100">
		     			   	  <img src="/assets/icons/share.svg" className="w-4 h-4"/>
		     			   	  <span className="font-normal text-xs">shares</span>
		     			    </div>
		     			   </div>
		  	      </div>	
		     			)
		     	})
		     }

		  </div>
           :    
    		 <div className="h-screen text-sm text-gray-500 flex justify-center items-center relative">
           		Create your first meme ...
    		 </div>
		  }

          <div className="fixed flex justify-center w-full bottom-0  mx-auto max-w-[1000px]">
		    { userdata && userdata.user && userdata.user.hascreatedprofile  ?
		         <img onClick={()=>setIsMemeModalOpen(true)} src="/assets/icons/square-plus.svg" className="w-10 h-10 bg-[white] rounded-lg invert cursor-pointer" />
		        :
		        <Link href={` ${ userdata && !userdata.user ? "/login" : userdata && userdata.user && !userdata.user.hascreatedprofile ? "/createprofile":"/"}`}>
                       <img src="/assets/icons/square-plus.svg" className="w-10 h-10 bg-[white] rounded-lg invert" />
		        </Link>
		    }
		  </div>
       {
        memedata && memedata.totalblogs > skip ?
        <div className="flex justify-center my-10">
          <button onClick={getMoreBlogs} href="" className="px-4 py-2 border hover:shadow bg-white border-gray-300 text-[#ff6714] rounded-full" disabled={isLoadingMore?true:false}>More</button>
        </div> 
        :
        <></>
        }    

		  <Modal
           opened={isMemeModalOpen}
           onClose={() => {setIsMemeModalOpen(false),setCoverPic([]),setContainer([]),setSelectedVideo(null)}}
           size = {"lg"}
           title= "Create a meme"
         > 
          <div className="flex flex-col gap-4">


      <Tabs defaultValue="images" color="red">
      <Tabs.List>
        <Tabs.Tab value="images"><div className="flex items-center gap-1">image</div></Tabs.Tab>
        <Tabs.Tab value="video"><div className="flex items-center gap-1">Video</div></Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="images" pt="xs">
           <div>
           <div className="text-xs p-2 text-gray-500">
             Selected images <span className="text-red-500">(You can select maximum 4 images)</span>
           </div>
           <div className="mx-2 w-fit float-left">

<DndProvider backend={HTML5Backend}>
      <div>
        {selectedImage && selectedImage.map((img,i) => (
          <ImageContainer key={i} id={i} url={img} moveImage={moveImage} />
        ))}
      </div>
    </DndProvider>

           	{/*<DragDropContext onDragEnd ={(e)=>handleDragEnd(e)}> 
	           	<Droppable droppableId = "body" direction="horizontal">
		           	{

		           		(provided) => (
                           <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-wrap gap-2">
                           {

		           			   selectedImage && selectedImage.map((m,i)=>{
				           			return (
				           				<Draggable key={i} draggableId={`draggable-${i}`} index={i}>
				           				  {
				           				  	(provided)=>(
					           				      <img 
					           				      src={m} 
					           				      ref={provided.innerRef}
					           				      {...provided.draggableProps}
					           				      {...provided.dragHandleProps}
					           				      className="w-24 h-24 border object-cover flex p-2"/>
				           				  )}
				           				</Draggable>

				           				)
				           		})}
		           			   {provided.placeholder}
                              </div>
		           			)}
	           	</Droppable>
           	</DragDropContext>*/}
           	</div>

       
           	<div className="w-24 h-24 flex justify-center items-center border bg-gray-100 hover:bg-gray-200 cursor-pointer">
	        	  <MemeUpload 
	        	     userdata={userdata}  

	        	     pic={coverPic} 
	        	     setPic={setCoverPic} 

	        	     container={container} 
	        	     setContainer={setContainer} 

	        	     setSelectedVideo={setSelectedVideo} 
	        	     setSelectedImage={setSelectedImage} 
	        	     
	        	     setIsMemeModalOpen={setIsMemeModalOpen} />
           	</div>
          </div>
      </Tabs.Panel>

      <Tabs.Panel value="video" pt="xs">
             <div className=" flex flex-col gap-3">
             <div>
             	 
             	 	{selectedVideo ?<video 
             	 	                id="my-video" 
             	 	                controls 
             	 	                style={{width: "100%", maxWidth: "200px", height:"100%" ,maxHeight: "200px",objectFit:"contain" , height: "auto", display: "block", margin: "0 auto"}} 
             	 	                src={selectedVideo} />
             	 	                :
             	 	                <></>}
             	 
             </div>

             <div className="cursor-pointer">
	        	  <VideoUpload 
	        	      userdata={userdata} 
	        	      setSelectedImage={setSelectedImage}  
	        	      pic={coverPic} 
	        	      setContainer={setContainer} 
	        	      container={container} 
	        	      setPic={setCoverPic} 
	        	      selectedVideo={selectedVideo} 
	        	      setSelectedVideo={setSelectedVideo} 
	        	      setIsMemeModalOpen={setIsMemeModalOpen} />
           	</div>
	         </div>
      </Tabs.Panel>
    </Tabs>
          <div>
           <input onChange={handleCaption} placeholder="caption" name="caption" className="p-2 w-full border bg-gray-50 rounded"/>
          </div>
           <div>
           	<button className={`px-2 w-24 text-white py-1 rounded relative flex justify-center items-center text-sm ${isPublishing ? "bg-gray-300": "bg-black"}`} onClick={onPublish} disabled={isPublishing}>Create {isPublishing ? <Loader size={"xs"} color={"gray"} className="absolute"/>: <></>}</button>
           </div>
           </div>
           </Modal>

                <Modal
                  opened={openShareModal}
                  onClose={() => setOpenShareModal(false)}
                  title="Share"
                >
                <div className="flex flex-col gap-1">
                 <div><img className="object-cover h-40 w-full rounded-xl" src={image}/></div>
                 <div><a rel="noreferrer" target="_blank" href={`https://dogswag.club/woofwoof/${memeID}`} className="mt-2 cursor-pointer text-sm text-blue-400 hover:bg-gray-200 py-2 bg-gray-100 rounded-full justify-center flex text-center">{`https://dogswag.club/woofwoof/${memeID}`}</a></div>
                 <div className="flex gap-2 justify-end items-center mt-5">
                 <div className="text-xs text-gray-500">Share with</div>
                 <FacebookShareButton
                    url={`https://dogswag.club/woofwoof/${memeID}`}
                    // onClick={()=>share(blogdatas && blogdatas._id)}
                 >
                 <FacebookIcon size={20}/>
                 </FacebookShareButton>

                  <LinkedinShareButton
                    url={`https://dogswag.club/woofwoof/${memeID}`}
                    // onClick={()=>share(blogdatas && blogdatas._id)}
                 >
                   <LinkedinIcon size={20}/>
                 </LinkedinShareButton>

                  <WhatsappShareButton
                    url={`https://dogswag.club/woofwoof/${memeID}`}
                    // onClick={()=>share(blogdatas && blogdatas._id)}
                 >
                   <WhatsappIcon size={20}/>
                 </WhatsappShareButton>

                 </div>
                 </div>
                </Modal>
           
		  </div>
		)
}
