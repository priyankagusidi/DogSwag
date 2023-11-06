import React, {useState,useEffect,useRef} from 'react'
import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('@mantine/core').then((m) => m.Modal), {
  ssr: false,
});
import {Menu} from '@mantine/core'
import Link from 'next/link'
import moment from 'moment'
import axios from 'axios'
import {useRouter} from 'next/router'
import {FacebookShareButton ,LinkedinShareButton,WhatsappShareButton ,WhatsappIcon,FacebookIcon,LinkedinIcon} from 'react-share'
import UserList from './userlist'
import MemeList from './memelist'


const Blog = ({blogdata,userdata}) => {
  console.log(userdata)
  console.log(blogdata)

  // return null
  const router = useRouter()

  const [detail, setDetail] = useState(blogdata ? blogdata.blogs :[]);
  const [opened, setOpened] = useState(false);
  const [title,setTitle] =useState("")
  const [description,setDescription] =useState("")
  const [coverImage,setCoverImage] =useState("")
  const [slug,setSlug] =useState("")
  const [isLiked,setIsLiked] = useState(false)
  const [skip,setSkip] = useState(6)
  const [isLoadingMore,setIsLoadingMore] = useState(false)



  function onShare(title,desc,image,slug){
    setTitle(title)
    setDescription(desc)
    setCoverImage(image)
    setSlug(slug)
    console.log(slug)
    setOpened(true)
  }



  // function onDelete(id){
  //    console.log(id)
  // }
  
  async function getMoreBlogs(){
      setIsLoadingMore(true)
      await axios.get(`/api/blogs/${skip}`).then(res=>{
        console.log(res.data)
        setDetail([...detail,...res.data.blogs])
        setIsLoadingMore(false)
        setSkip(skip+6)
      }).catch(err=>{
        console.log(err)
        setIsLoadingMore(false)
      })
  }

console.log(skip)

async function onDelete(id){
  await axios.delete(`/api/blogs/delete/${id}`)
  const deletePost = detail.filter(d=>id !== d._id)
  setDetail(deletePost)
  return
}

async function onEdit(slug) {
   
router.push(`/write/${slug}`)
}

const divRef = useRef(null);

const getTitle = (title) => {
  if (divRef.current) {
    const divWidth = divRef.current.offsetWidth;
    const titleWidth = title.length * 10; // assuming each character is 10px wide
    if (titleWidth > divWidth) {
      const numChars = Math.floor(divWidth / 10);
      return title.slice(0, numChars) + "...";
    } else {
      return title;
    }
  }
}

const getDescription = () => {
  if (divRef.current) {
    const divWidth = divRef.current.offsetWidth;
    const descWidth = (detail.description && detail.description.length) ? detail.description.length * 6 : 0; // assuming each character is 6px wide
    if (descWidth > divWidth) {
      const numChars = Math.floor(divWidth / 6);
      return detail.description.slice(0, numChars) + "...";
    } else {
      return detail.description;
    }
  }
}




  return (

      <section className='px-5 lg:px-0 flex flex-col justify-center font-[poppins] '>
        <div className='grid gap-3'>
            {detail.map((detail, ind)=>{
              return(
                <div className="bg-white p-2 shadow rounded-md" key={detail?._id}>
                 
                 <div className="flex items-center gap-2 text-sm p-2">
                 <Link href={`/profile/${detail?.bloggerID?._id}`} className="flex gap-3 items-center">
                         <img src={detail?.InfoID?.profilePic} className="w-7 h-7 object-cover rounded-full"/>
                         <span className='font-semibold'>{`${detail?.InfoID?.firstname} ${detail?.InfoID?.lastname}`}</span>
                 </Link>
                   <p className='text-[#a96132] text-xs'>{moment(detail.createdAt).format("DD MMM YYYY")}</p>
                 </div>


                 

                   <div className="flex p-2 gap-2">

                        <div className='flex flex-col w-10/12' ref={divRef}>
                           <Link href={`/blog/${detail?.slug}`}  className="flex flex-col">
                              <h3 className='text-sm sm:text-lg font-bold'>{detail?.title && detail?.title?.length > 80 ? detail?.title?.slice(0,80)+ "..." : detail?.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-500">{detail?.description && detail?.description?.length > 80 ? detail?.description?.slice(0,80)+ "..." : detail?.description}</p>
                            </Link>  
                         </div>

                         <div className="w-2/10">
                           <Link href={`/blog/${detail?.slug}`} className="flex flex-col gap-2">
                            <img className="rounded object-cover bg-black-100 w-24 h-16 sm:w-28 sm:h-20 md:w-40 md:h-28 hover:brightness-75" src={detail.coverimage.path} alt="" />                          
                           </Link>
                         </div>
                  </div> 


                

                   {/*category and views*/}
                <div className="flex sm:items-center flex-col sm:flex-row p-2 ">
                 {/*views and readtime*/}
                <div className="flex gap-5 px-2">
                      <p className='flex items-center gap-1 text-xs'>
                        <span>{`${detail?.readtime} ${detail?.readtime >1 ? "mins":"min"}`}</span>
                        <img src="/assets/icons/clock.svg" className="w-3 h-3" />
                      </p>
                      <p className='flex items-center gap-1 text-xs'>
                        <span>{detail._id === "642678e112b7174e67d80f3a"? detail?.views+30: detail._id === "6422e8beea58b4d3f3cf05fb" ?detail.views+20 : detail.views }</span> 
                        <img src="/assets/icons/eye2.svg" className="w-3 h-3" />                            
                      </p>
                        <div className="">

                     {/*option*/}
                      <div className="cursor-pointer">
                           {
                      userdata.user && userdata.user._id === detail.bloggerID._id?
                           <Menu shadow="md" width={100} position = "bottom-end" withArrow transition="pop-bottom-right">
                            <Menu.Target>
                              <div className="">
                                {/*<BsThreeDotsVertical/>*/}
                              <img src="/assets/icons/menu-dots-vertical.svg" className="w-3 h-3"/>
                              </div>                       
                            </Menu.Target>

                            <Menu.Dropdown >
                               <Menu.Item icon={<img src="/assets/icons/pencil.svg" className="w-4 h-4"/>} onClick={()=>onEdit(detail.slug)}>
                                  Edit 
                               </Menu.Item> 
                               <Menu.Item icon={  <img src="/assets/icons/trash.svg" className="w-4 h-4"/>} onClick={()=>onDelete(detail._id)}>
                                  Delete 
                               </Menu.Item> 
                            </Menu.Dropdown>

                            </Menu>
                            :
                    <></>

                    }
                    </div>

                  </div>
                </div>

              

                {/*category*/}
                {/*<div className='flex gap-1 px-1'>
                    {
                     detail.category && detail.category.slice(0,3).map((m,i)=>{
                          return <span key={i} className="text-xs text-gray-500">{`#${m.length>6 ? m.slice(0,6)+"..." : m}`}</span>             
                      })
                    }                        
                </div>*/}
                </div>


              </div>
              )
            })}
    
            </div>
       {
        blogdata && blogdata.totalblogs > skip ?
        <div className="flex justify-center my-10">
          <button onClick={getMoreBlogs} href="" className="px-4 py-2 hover:shadow bg-white border-gray-300 text-[#ff6714] rounded-full" disabled={isLoadingMore?true:false}>More blog</button>
        </div> 
        :
        <></>
        }    
      </section>
  )
}

export default Blog



 