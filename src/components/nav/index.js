import React, { useState, useEffect,useRef } from 'react';
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import RightArrow from '../../assets/icons/rightarrow.svg'
import Router from 'next/router'
import { LinkedinShareButton, WhatsappShareButton, WhatsappIcon, LinkedinIcon } from 'react-share'
import dynamic from 'next/dynamic';
import { useDisclosure } from '@mantine/hooks';
import { Menu } from '@mantine/core';
// import jwt from 'jsonwebtoken'

const ProfileImage = dynamic(() => import("./image"), {
  ssr: false,
});
const Searchbar = dynamic(() => import("./search"), {
  ssr: false,
});
const Select = dynamic(() => import('@mantine/core').then((m) => m.Select), {
  ssr: false,
});

const Modal = dynamic(() => import('@mantine/core').then((m) => m.Modal), {
  ssr: false,
});
const  Loader = dynamic(() => import('@mantine/core').then((m) => m.Loader), {
  ssr: false,
});
const Notification = dynamic(() => import("./notification"), {
  ssr: false,
});

const Coin = dynamic(() => import("./coin"), {
  ssr: false,
});


const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://dogswag.club" }`

export default function Index({ userdata, isknown ,notificationdata,coindata}) {
    console.log(coindata)
    


    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openMail,setOpenMail] = useState(false)
    const [isInviting,setIsInviting] = useState(false)
    const [openWriteModal, setOpenWriteModal] = useState(router.query.uw === "true" ? true : false)
    const [reqInfo, setReqInfo] = useState({ about: "", blogger_id: "", blogger_email: "", blogger_name: "" })
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
    const [isSentRequest, setIsSentRequest] = useState(router.query.rm === "true" ? true : false || 
                                                       router.query.am === "true" ? true : false || 
                                                       router.query.sm === "true" ? true : false || 
                                                       false)
    const [bloggerList, setBloggerList] = useState([{ value: "6421495a83133d275052d937", label: "DogSwag(Admin)"}])
    const [bloggername, setBloggername] = useState([])
    const [flip, setFlip] = useState(false)
    const [login, setLogin] = useState(false)
    const [inviteModal, setInviteModal] = useState(false)
    const [inviteEmailToken, setInviteEmailToken] = useState("")
    const [buttonText, setButtonText] = useState(true)
    const [noti, setNoti] = useState(false)
    const [menu, setMenu] = useState(false)
    const [InviteEmailTo,setInviteMailTo] = useState("")
    const [imgSrc, setImgSrc] = useState()
    // const [notificationList,setNotificationList] = useState(notificationdata && notificationdata.notification?notificationdata.notification:[])
    const [getBlogger,setBlogger] = useState("")
    const [sendingRequest,setSendingRequest] = useState(false)
    const [searchValue,setSearchValue] = useState("")
    const sideNavRef = useRef(null);
    // const coinmodalRef = useRef(null);
    const [isOpen, setIsOpen] = useState(router.query.coin === "true" ? true : false );
    


      // if(isPageLoading){
      //   return <>Loading</>
      // }


// const signJwtToken = (payload, secretKey) => {
//   const token = jwt.sign(payload, secretKey);
//   return token;
// };

// const payload = {
//   userId: 123,
//   username: 'exampleuser',
//   roles: ['admin', 'user'],
// };

// const secret = 'your-secret-key';

// const token = signJwtToken(payload, secretKey.toString('utf-8'));
// const token = jwt.sign(payload, secret.toString('utf-8'), { algorithm: 'HS256', allowInsecureKeySizes: true, allowInvalidAsymmetricKeyTypes: true });

// console.log(token); // The signed JWT token



    function handleInput(e) {
        setReqInfo({ ...reqInfo, [e.target.name]: e.target.value, type: "sendrequest" })
    }

    function handleSearchBloggers(e) {}

    async function openRequestModal() {
        setIsRequestModalOpen(true)
    }

    async function getBloggerList() {

    }


   function onWrite(){
    setMenu(false)

    Router.push({
                pathname:'/write'
            })

    if(userdata && userdata.user){
        // if(userdata.user.role === "blogger"){
        //     Router.push({
        //         pathname:'/write'
        //     })
        // }else{
        //     setOpenWriteModal(true)
        // }
    }else{
        // Router.push({
        //     pathname:'/vetchatlogin',
        //     query:{ reqinfo: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoid3JpdGUiLCJpYXQiOjE2Nzk0NjkxODB9.-yvgk4Id-4Pj78DeQUIFtXLTTgVu0wijGhL3XP5UF4w' },
        // })
    }
   }


    async function sendRequest(e) {
        e.preventDefault()
        console.log(userdata)
        const { about } = reqInfo
        if(!getBlogger){
            alert("Select atleast one blogger")
            return
        }
        if (about.split(' ').length < 10) {
            alert("can't be less than 50 words")
        }

        setSendingRequest(true)
        try {
            await axios.post(`/api/request/requestauthor`, {
                about,
                blogger_ID: getBlogger
            }).then(res => {
                console.log(res)
            })
            setInviteModal(false)
            setIsSentRequest(true)
            setOpenWriteModal(false)
            setSendingRequest(false)
        } catch (err) {
            console.log(err)
            setSendingRequest(false)
            if (err.response.status === 401) {
                return router.push('/vetchatlogin')
            }
            if (err.response.data.msg) {
                return alert(err.response.data.msg)
            }

        }
    }

    async function logout() {
        try {
            router.push("/")
            await axios.get(`/api/auth/logout`)
            setMenu(false)
            return router.push("/")
        } catch (err) {
            console.log(err)
        }
    }

    function setEmail(id, name) {
        setReqInfo({ ...reqInfo, blogger_id: id, blogger_name: name })
    }

    function openInviteModal() {
        setInviteModal(!inviteModal)
        setMenu(false)
    }
   function gotoDo(){
      setMenu(false)
      
      if(userdata && userdata.user){
            Router.push({
                pathname:'/do'
            })
    }else{
       Router.push({
            pathname:'/vetchatlogin',
            query:{ reqinfo: 'do' },
        })
    }  
   }

    async function sendInviteMail(){
        setIsInviting(true)
        try{
             await axios.post(`/api/invite/create`, {InviteEmailTo}).then((res) => {
                 console.log(res.data.url.shortURL)
                 alert("invite sent")
             }).catch(err=>{
                alert(err.response && err.response.data.msg)
             })
          setIsInviting(false)

        }catch(err){
          setIsInviting(false)
        }
    }

    async function createInviteWhatsapp() {
 
        try {


            await axios.post(`api/invite/create`, null).then((res) => {
                console.log(res.data.url.shortURL)
                if(navigator.userAgentData.mobile){
                    return window.open(`whatsapp://send?text=I found an awesome platform DogSwag, where you can share your rich experience about dogs and get paid. 
Please use my exclusive invite link to become a member of this community for Free INVITE ${res.data.url.shortURL}. The link expires in 24 hours.`, '_blank')
                }
                return window.open(`https://web.whatsapp.com/send?text=I found an awesome platform DogSwag, where you can share your rich experience about dogs and get paid. 
Please use my exclusive invite link to become a member of this community for Free INVITE ${res.data.url.shortURL}. The link expires in 24 hours.`, '_blank')
            })
        } catch (err) {
            return router.push('/vetchatlogin')
        }

    }

    function openMenu() {
        setMenu(!menu)
    }

    function imgError(e) {
        console.log("error in image")
        // setImgSrc(e.currentTarget.src = "img/defaultprofile")
    }

    function imgLoad(e) {
        console.log(e)
    }
     
  useEffect(()=>{

    const searchParams = new URLSearchParams(window.location.search);
    const coinParam = searchParams.get('coin');
    
    if (coinParam) {
      setIsOpen(true);
    }

  },[router.query])
     
  useEffect(() => {

// some cchang
    // Add event listener to the document object
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {


    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        setMenu(false)
        setIsOpen(false)
        removeCoinParam()
    }
  }

function removeCoinParam() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete('coin');
  const newUrlParams = urlParams.toString() ? `?${urlParams.toString()}` : '';
  const newUrl = `${window.location.pathname}${newUrlParams}`;
  window.history.pushState({}, '', newUrl);
}

  if(isOpen){
   return (
    <div className="relative z-50 border  border-4 border-black"  >
      {
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center border  border-4 border-black" >
          <div className="p-8 rounded-lg flex flex-col justify-center items-center bg-yellow-600" ref={sideNavRef}>
            <img src="/assets/icons/coin.svg" className="w-20 rounded-full animate-bounce  shadow-xl"/>
            <h2 className="text-sm font-bold my-2 text-white ">You earned 5 coins.</h2>
            <Link href="/vetchatlogin">
            <button
              className="bg-amber-900 text-white font-bold py-1 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              SIGN UP
            </button>
            </Link>
          </div>
        </div>
      }
    </div>
  );
      
}




    return (        
        <div className="z-50 bg-white relative grid grid-cols-2 md:grid-cols-3 justify-between px-4 py-2 items-center shadow ">
            {/*left*/}
           {/*<button className="p-2 bg-red-600">Do</button>*/}

           <Link href="/">
           <div className="flex justify-start">
                <img src="/img/logo.png" alt="logo" className='block h-16 w-16 fill-current'/>
                <h2 className='my-auto font-bold text-3xl text-[#5f2600] hover:text-[#542200]'>DogSwag </h2>
           </div>
           </Link>

           {/*mobile menu*/}
           <div className="block md:hidden">
           <div className="flex justify-end">
               <button onClick={openMenu}>
                    <img src="/assets/icons/menu-burger.svg" className="cursor-pointer text-[#5f2600] w-5 h-5 text-[#5f2600]"/>
               </button>
           </div>
           </div>

           {/* mobile menu*/}
            <div
               ref={sideNavRef} 
               // className={`absolute transition-all block ${menu? "left-0 ":"left-[2000px]"} h-screen w-full bg-white z-[200] top-0 p-5`}
               className={`absolute transition-all  block md:hidden ${menu ? "left-[35%] " : "left-[2000px]"} h-screen w-[65%] bg-white z-[200] top-0 p-5 duration-500`}
            >
             
            <div className="flex justify-end w-full mt-5">
                <button onClick={openMenu}>
                    <img src="/assets/icons/cross.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/>
                </button>
            </div>

             <div className='flex items-center font-semibold text-c border-b mb-5 py-5'>
                <img src="/img/dlogo.png" className="w-16 object-cover" alt="" />
                <div className=""> 
                  <h2 className="text-xl">DogSwag</h2>
                  <span className="opacity-75 text-sm font-normal">for every dog&apos;s swag</span>
                </div>
             </div>
             
             <Searchbar/>

             <div className="flex flex-col w-full gap-6 text-sm mt-5">              
               <ul>
                {/*<li>
                     <div className="flex justify-center">
                       <button onClick={gotoDo} className='md:py-3 md:px-6 sm:py-[0.67rem] rounded-full font-semibold sm:px-[1.4rem] py-[0.55rem] px-[1.3rem] bg-yellow-600 hover:bg-yellow-500 transition-all shadow-2xl hover:shadow-md text-white font-mono'>DO</button>
               
                     </div>
                </li>*/}
                {/*<li>   
                      <Link href="/" onClick={()=>setMenu(false)}>
                         <div className="flex gap-3 items-center p-2 hover:bg-gray-300 rounded">
                          <button>
                             <img src="/assets/icons/home.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> 
                          </button>
                          <span> Home </span>
                         </div>
                      </Link>
         
                </li>*/}

                <li>
               
            
                      <div onClick={()=>router.push('/vet/landing')}>
                         <div className="flex gap-3 items-center p-2  rounded">
                          <img src="/assets/icons/edit.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> 
                          <span> I am a vet </span>
                         </div>
                      </div>
         
                </li>

               <li>
               
            
                      <div onClick={onWrite}>
                         <div className="flex gap-3 items-center p-2 hover:bg-gray-300 rounded">
                          {/*<img className="w-5 h-5" src={"img/edit.png"}></img>*/}
                          {/*<AiTwotoneEdit size={15}/>*/}
                          <img src="/assets/icons/edit.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> 
                          <span> Write </span>
                         </div>
                      </div>
         
                </li>
               

              {
                userdata && !userdata.user?
                <li className="text-center border-t py-5">
                      <Link href={`/vetchatlogin`} onClick={()=>setMenu(false)}>
                         <button type="button" className="px-2 text-sm  w-20 justify-center py-[6px] text-white bg-[#692A00] rounded-full">
                            {/*{isknown.isknown? "Sign in": "Sign up"}*/}
                            Sign in
                         </button>
                      </Link>
                </li>
                :
                <>
                {/*<li>
                      <Link href={`/profile/${userdata && userdata.user && userdata.user._id}`} onClick={()=>setMenu(false)}>
                         <div className="flex gap-3 items-center p-2 hover:bg-gray-300 rounded">
                          <img src="/assets/icons/user.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> 
                          <span> Go to Profile </span>
                         </div>
                      </Link>
                </li>*/}
           {

             userdata && userdata.user && userdata.user.role === "blogger" ?   
               <>
                {/*<li>
                      <Link href={`/billings`} onClick={()=>setMenu(false)}>
                         <div className="flex gap-3 items-center p-2 hover:bg-gray-300 rounded">
                         
                          <img src="/assets/icons/wallet.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> 
                          <span> Billings </span>
                         </div>
                      </Link>
                </li>*/}
                <li>
                       
                      <button onClick={openInviteModal} className="w-full">
                         <div className="flex gap-3 items-center p-2 hover:bg-gray-300 rounded">
                          {/*<img className="w-5 h-5" src={"/img/help.png"}></img>*/}
                          {/*<SiMinutemailer size={15}/>*/}
                          <img src="/assets/icons/paper-plane.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> 
                          <span> Invite </span>
                         </div>
                      </button>
                      
                </li>
 
                
                </>:<></>
                 }
                <li>
                      <button onClick={logout} className="w-full">
                         <div className="flex gap-3 items-center p-2 hover:bg-gray-300 rounded">
                          {/*<RiLogoutBoxFill size={15}/>*/}
                          <img src="/assets/icons/sign-out-alt.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> 
                          <span> Log out </span>
                         </div>
                      </button>
                </li>
                </>
            }
          </ul>
             </div>


           </div>


           {/*middle*/}
           <div className="hidden md:block">
             <div className="flex justify-center">
              <Searchbar/>
             </div>
           </div>
          {/*end*/} 
          <div className="hidden md:block">
          <div className="flex gap-3 p-2 justify-end">
             <div className="flex gap-2 items-center">

               
                  <div onClick={()=>router.push('/vet/landing')} className="text-sm font-semibold flex items-center text-[#692a00]  gap-2 py-2 px-3 rounded-full cursor-pointer border-b-4 border-[#d1bdb0] hover:border">
                           <img src="/doctor.svg" className='hover:text-[#5f2600] w-6' alt="" />
                          <span> I am a vet </span>
                  </div>

                  <div onClick={()=>router.push('/vetchatlogin')} className="text-sm font-semibold flex items-center text-[#692a00]  gap-2 py-2 px-3 rounded-full cursor-pointer border-b-4 border-[#d1bdb0] hover:border">
                           <img src="/dog-face.svg" className='hover:text-[#5f2600] w-6' alt="" />
                          <span> Pet parent </span>
                  </div>
         
                {/* <div onClick={onWrite}>
                 <div className="flex items-center  gap-2 py-2 px-3 rounded-full cursor-pointer border-b-4 border-[#d1bdb0] hover:border">
                   <img src="/img/writeLogo.svg" className='hover:text-[#5f2600]' alt="" />
                   <span className="text-sm font-semibold text-[#692a00] hover:text-[#5f2600]">Write</span>
                 </div>
               </div>       */}
      
             </div>

            {
                userdata && !userdata.user ? 
                <></>
                :
                <Notification notificationdata={notificationdata}/>
            }
             {/*{
                userdata && !userdata.user ? 
                <></>
                :
                <Coin coindata = {coindata}/>
            }*/}
           

             <div className="flex justify-center items-center">

              {
                userdata && !userdata.user ?
                    <Link href="/vetchatlogin">
                    <div className="w-full flex items-center">
                    <button type="button" className="p-2 gap-2 justify-center py-[10px] text-white bg-[#692A00] rounded-full text-xs flex items-center w-20 font-semibold">
                       {/*{isknown.isknown? "Sign in": "Sign up"}*/}
                        Sign in
                    </button>
                    </div>
                    </Link>
                :

             <> 
            <Menu shadow="md" width={200} position = "bottom-end" withArrow transition="pop-bottom-right">  
                   <Menu.Target>
                        <button type="button" className="" onClick={()=>{setOpen(!open)}}>
                                    {/*<GiHamburgerMenu/>*/}
                                 
                                       {/*<img src="/assets/icons/menu-burger.svg" className="cursor-pointer text-[#5f2600] w-4 h-4 text-[#5f2600]"/> */}
                                 <ProfileImage userdata={userdata}/>  
                        </button>
                  </Menu.Target>
                  <Menu.Dropdown >           
                        <h3 className='topHead'>Dogswag<br/><span>for every dog&apos;s swag</span></h3>
{/*                        <Link href={`/`}>
                           <Menu.Item icon = {<img src="/assets/icons/home.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/>}>Home</Menu.Item>
                        </Link>*/}
                        {/*<Link href={`/dashboard`}><Menu.Item icon = {<AiFillHome/>}>Dashboard</Menu.Item></Link>*/}
                        {/*<Link href={`/profile/${userdata && userdata.user  && userdata.user._id}`}>
                           <Menu.Item icon = {<img src="/assets/icons/user.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/>}>Go to profile</Menu.Item>
                        </Link>*/}
                       
                        {
                         userdata && userdata.user && userdata.user.role === "blogger" ?
                         <>
                           {/*<Link href={`/billings`}><Menu.Item icon = {<img src="/assets/icons/wallet.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> }>Billings</Menu.Item></Link>*/}
                           <Menu.Item icon = {<img src="/assets/icons/paper-plane.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> } onClick={openInviteModal}>Invite</Menu.Item> 
                         </>:
                         <></>               
                        }
                        <Menu.Item icon = {<img src="/assets/icons/sign-out-alt.svg" className="cursor-pointer text-[#5f2600] w-4 h-3 text-[#5f2600]"/> } className="border" onClick={logout}>Logout</Menu.Item>
                   </Menu.Dropdown>
           </Menu>

                        <Modal
                           opened={inviteModal}
                           onClose={() => setInviteModal(false)}
                           size = {"lg"}
                         >
                             <div  className='rounded'>
                              <div className='flex flex-col md:flex-row text-center w-full md:mb-5'>
                                <img src="/img/inviteImg.jpg" alt='/' className='w-[250px] hidden md:block rounded-tl-lg rounded-bl-lg'/>
                                <img src="/img/vetchatloginSlider4.jpg" alt='/' className='w-full h-60 object-cover block md:hidden rounded-tl-lg rounded-bl-lg'/>
                                <div className='modalRight'>
                                  <div className='p-5'>
                                    <p className='text-[#5f2600]'><span className='text-[#c7570d] font-medium'>DogSwag is an invite only member community.</span>  The power of inviting the right people rests in your hands.</p>
                                    <h1 className='mt-3 text-[#5f2600] font-[poppins] text-sm font-semibold'>Invite people whose writing will inspire and empower millions of pet parents.</h1>
                                    <div className=''>
                                    <p className='text-[#7d5134] mt-3 '>At the end of the day, we are here to serve </p>
                                      <div className="w-fit mx-auto mt-4 shadow-xl hover:drop-shadow-2xl rounded-full">
                                        <div className="btn1 blog-button">
                                          <div className="primary1 text">GOD</div>
                                          <div className="secondary1 text">DOG</div>
                                        </div>
                                      </div>
                                    </div> 
                                  </div>

                                  <div className="grid gap-2">
                                  <h1 className='text-[#7d5134] text-sm'>SEND INVITE :</h1>
                                    <div>
                                    <div className="flex gap-3 items-center justify-center">
                                      <button className='' onClick={()=>setOpenMail(!openMail)}>
                                      <img className='h-5 w-5' src="/img/gmail.png" alt="" />
                                    </button>  
                                    <button className='' onClick={createInviteWhatsapp}>
                                      <img className='h-5 w-5' src="/img/whatsapp.png" alt="" />
                                    </button>

                                    </div>
                                     <div className={`${openMail ? "block mt-3":"hidden"}`}>
                                    <div className="flex justify-center text-xs">
                                       <input className="px-2 py-1 border bg-gray-100" placeholder="email" onChange={(e)=>setInviteMailTo(e.target.value)}/>
                                       <button onClick={sendInviteMail} className={`px-2 py-1 ${isInviting ? "bg-gray-300":"bg-[#5f2600]"} text-white rounded-r relative flex items-center justify-center`} disabled={isInviting?true:false}>Invite {isInviting ?<Loader className="absolute" size={"xs"} color ={"brown"}/>:<></>} </button>
                                    </div>

                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                         </Modal>
                </>
            }

             </div>
             <div className="flex items-center">
             <div className="hidden md:block">

              {/*<Link href={'/woofwoof'}>
               <button className="p-2 gap-2 justify-center py-[10px] text-white bg-[#692A00] rounded-full text-xs flex items-center font-semibold"><img src="/assets/icons/paw_like.svg" className="w-3 h-3 invert" /> <span className=" hidden lg:block">Woof Woof</span></button>
             </Link>*/}
               {/*<button onClick={gotoDo} className='md:py-3 md:px-6 sm:py-[0.67rem] rounded-full font-semibold sm:px-[1.4rem] py-[0.55rem] px-[1.3rem] bg-yellow-600 hover:bg-yellow-500 transition-all shadow-2xl hover:shadow-md text-white font-mono'>DO</button>*/}
             </div>
             </div>
          </div>
          </div>


          {/*modal for sending request*/}
           <Modal
                     opened={openWriteModal}
                     onClose={() => setOpenWriteModal(false)}
                     title="Request message"
              >
            <p className="font-normal font-[poppins] text-xs text-gray-500">This is an invite only club, so we request you let the content writers know why you will be a great fit for DogSawg</p> 
              <form className="flex flex-col gap-4 mt-3" onSubmit={sendRequest}>
                <label className="text-xs">Tell us in 50 words why you should get an invite <span className="text-red-500">(Minimum 10 words)</span></label>
                {/*<input className="py-1 px-2 rounded border shadow-inner text-sm" onChange={handleInput} name="user_email" placeholder="your email"/>*/}
                <textarea className="py-2 px-2 rounded text-xs border shadow-inner h-40 text-sm font-[poppins]" onChange={handleInput} name="about" placeholder="Write here ...." required/>
                <h4 className="text-md mt-2">Choose profile</h4> 
                <div className="relative">
                 <Select
                      data={bloggerList}
                      placeholder="Select a Blogger"
                      nothingFound="Nothing found"
                      searchable
                      value={getBlogger}
                      onChange={setBlogger}
                    />
                </div>
                <div className="flex justify-end">
                    <button className={`px-4 py-1 relative flex justify-center items-center ${ sendingRequest || (reqInfo.about.split(" ").length < 10 || !getBlogger) ? "bg-gray-300":"bg-black"} text-white rounded flex items-center gap-3 text-sm`} disabled={sendingRequest || (reqInfo.about.split(" ").length < 10 || !getBlogger)? true:false}>
                             Send request

                             {
                                sendingRequest ? <Loader size="xs" color={"gray"} className="absolute" /> :""
                             }
                             <svg width="10" 
                             height="10" 
                             viewBox="0 0 14 14" 
                             fill="none" 
                             xmlns="http://www.w3.org/2000/svg">
                             <path d="M7.00004 0.333496L5.82504 1.5085L10.475 6.16683H0.333374V7.8335H10.475L5.82504 12.4918L7.00004 13.6668L13.6667 7.00016L7.00004 0.333496Z" fill="white"/>
                             </svg>
                    </button>
                </div>
             </form>
             </Modal>

             {/*modal for confirmation*/}
            <Modal
               opened={isSentRequest}
               onClose={() => setIsSentRequest(false)}
               size = {"md"}
             >
            <div className="flex flex-col items-center justify-center">
            <img className="w-60" src="img/puppy.png"/>
            {
                router.query.am ? <p className="font-normal text-sm mt-1 text-gray-500 font-semibold">Thank you for adding new member to dog swag community !</p> :
                router.query.rm ? <p className="font-normal text-sm mt-1 text-gray-500 font-semibold">Thank u for making right choice.</p> :
                                  <p className="font-normal text-sm mt-1 text-gray-500">Your request has been sent and you will be notified in 48 hours. Please check your Inbox/Spam/Promotions Tab for the email.</p>
            }
            </div>
            </Modal>
        </div>
    )
}