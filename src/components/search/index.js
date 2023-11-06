import React, { useState } from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
// import { AiFillEye } from 'react-icons/ai';
// import { MdAccessTime } from 'react-icons/md';
import Link from 'next/link'
import moment from'moment'

const Blog = ({searchdata}) => {
  const [detail, setDetail] = useState(searchdata ? searchdata.blogs :[]);   
  const [skip,setSkip] = useState(6)
  const [isLoadingMore,setIsLoadingMore] = useState(false)
  const router = useRouter()

  const {keyword} = router.query

  async function getMoreBlogs(){
      setIsLoadingMore(true)
      await axios.get(`/api/blogs/search/${keyword}&${skip}`).then(res=>{
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
     if(searchdata.blogs.length <1 ){
        return (
             <div>
             
             <div className="text-2xl h-screen p-3">Search Results: 0 blogs found
                 <div className="mt-20 flex justify-center items-center">
                   <Link href="/">
                      <button className="text-sm text-white justify-center items-center px-2 py-1 rounded flex text-center items-center w-24 bg-[brown]">
                         Go Back
                      </button>
                   </Link>
                 </div>
             </div> 
             </div>
          )
     }


    return (

        <div className="mt-5 p-2 mx-auto max-w-[1000px] flex flex-col gap-3">
        <div>Back to home</div>
        <div className="text-2xl">Search Results: { searchdata && searchdata.totalblogs} blogs found</div>
      <div className='grid gap-3'>
            {detail.map((detail, ind)=>{
              return(
                <div className="bg-white p-2 shadow rounded-md" key={detail._id}>
                 
                 <div className="flex items-center gap-2 text-sm p-2">
                 <Link href={`/profile/${detail.bloggerID._id}`} className="flex gap-3 items-center">
                         <img src={detail.InfoID.profilePic} className="w-7 h-7 object-cover rounded-full"/>
                         <span className='font-semibold'>{`${detail.InfoID.firstname} ${detail.InfoID.lastname}`}</span>
                 </Link>
                   <p className='text-[#a96132] text-xs'>{moment(detail.createdAt).format("DD MMM YYYY")}</p>
                 </div>


                 

                   <div className="flex p-2 gap-2">

                        <div className='flex flex-col w-10/12'>
                           <Link href={`/blog/${detail.slug}`}  className="flex flex-col">
                              <h3 className='text-sm sm:text-lg font-bold'>{detail.title && detail.title.length > 80 ? detail.title.slice(0,80)+ "..." : detail.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-500">{detail.description && detail.description.length > 80 ? detail.description.slice(0,80)+ "..." : detail.description}</p>
                            </Link>  
                         </div>

                         <div className="w-2/10">
                           <Link href={`/blog/${detail.slug}`} className="flex flex-col gap-2">
                            <img className="rounded object-cover bg-black-100 w-24 h-16 sm:w-28 sm:h-20 md:w-40 md:h-28 hover:brightness-75" src={detail.coverimage.path} alt="" />                          
                           </Link>
                         </div>
                  </div> 


                

                   {/*category and views*/}
                <div className="flex sm:items-center flex-col sm:flex-row p-2 ">
                 {/*views and readtime*/}
                <div className="flex gap-5 px-2">
                      <p className='flex items-center gap-1 text-xs'>
                        <span>{`${detail.readtime} ${detail.readtime >1 ? "mins":"min"}`}</span>
                        <img src="/assets/icons/clock.svg" className="w-3 h-3" />
                      </p>
                      <p className='flex items-center gap-1 text-xs'>
                        <span>{detail._id === "642678e112b7174e67d80f3a"? detail.views+30: detail._id === "6422e8beea58b4d3f3cf05fb" ?detail.views+20 : detail.views }</span> 
                        <img src="/assets/icons/eye2.svg" className="w-3 h-3" />                            
                      </p>
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
        searchdata && searchdata.blogs.length > skip ?
        <div className="flex justify-center my-10">
          <button onClick={getMoreBlogs} href="" className="px-4 py-2 border hover:shadow bg-white border-gray-300 text-[#ff6714] rounded-full" disabled={isLoadingMore?true:false}>More blog</button>
        </div> 
        :
        <></>
        }    
        </div>
      )
}

export default Blog