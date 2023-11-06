import Header from './header'
import Body from './body'
import {useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import axios from 'axios'
import SingletonRouter, { Router } from 'next/router';

export default function Index({userdata,dogdata}){
  
  const [isMenuActive,setMenuActive] = useState(false)
  const [selectedChat,setSelectedChat] = useState({})
  const [senderName,setSenderName] = useState("")
  const [isPrescribed,setIsPrescribed] = useState(false)


  const router = useRouter()
  const {id} = router.query

  async function fetchChat(){
    try {
      await axios.get(`/api/chat/${id}`).then(res=>{
        getProfile(res.data)
      })
    } catch(e) {
      // statements
    }
  }

 useEffect(()=>{
    fetchChat()
 },[id])

const shouldPreventLeaving =true
 const stringToDisplay = 'Are you sure want to leave the page ?';

  useEffect(() => {
    // Prevents tab quit / tab refresh
    if (shouldPreventLeaving) {
      // Adding window alert if the shop quits without saving
      window.onbeforeunload = function () {
        return stringToDisplay;
      };
    } else {
      window.onbeforeunload = () => {};
    }

    if (shouldPreventLeaving) {
      // Prevents next routing
      SingletonRouter.router.change = (...args) => {
        if (confirm(stringToDisplay)) {
          return Router.prototype.change.apply(SingletonRouter.router, args);
        } else {
          return new Promise((resolve, reject) => resolve(false));
        }
      };
    }
    return () => {
      delete SingletonRouter.router.change;
    };
  }, [shouldPreventLeaving]);



 function getProfile(chat){
   const name = getSenderName(userdata.user,chat.users)
   setSenderName(name)
 }

  const getSenderName = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].displayName : users[0].displayName;
  };


  return(
        <div className="w-full h-full lg:w-10/12 flex flex-col relative">
       <div className="p-4 fixed bg-white w-full lg:w-10/12 flex-grow border-b border-gray-300 flex justify-between z-10">
           <h3 className="text-lg font-semibold text-[#101010]">{senderName}</h3>
           <div className="relative block lg:hidden">
           <img src={isMenuActive ? '/close.svg': '/ham.svg'} className="w-5 " onClick={()=>setMenuActive(!isMenuActive)}/>
           {isPrescribed ?<div className="bg-red-500 p-[5px] absolute -left-1 rounded-full top-1 animate-pulse"></div>:<></>}
           </div>
        </div>
        <div className="mt-16 w-full h-full relative">
          <Body dogdata={dogdata} isPrescribed={isPrescribed} setIsPrescribed={setIsPrescribed}  isMenuActive={isMenuActive}  userdata={userdata}/>
        </div>
    </div>
    )
}
