import axios from 'axios'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function VetLogin({userdata}){
	const [info,setInfo] = useState({})
	const [activeTab,setActiveTab] = useState(0)
	const [message,setMessage] = useState("")
	const router = useRouter()

	function handleChange(e){
		setInfo({...info,[e.target.name]:e.target.value})
	}


	async function Login(){
		setMessage("")
		console.log(info)
		try{
			await axios.post(`/api/auth/${activeTab===0 ?'signin':'signup' }`,info).then(res=>{
				console.log(res)
				if(activeTab === 0){
				  router.push('/doctor')
				  return
				}
				if(activeTab === 1){
					 setActiveTab(0)
					 setMessage("DogSwag team will get in touch with you in 24 hours!")
					 return
				}
			})
		}catch(err){
			console.log(err)
			setMessage(err?.response?.data?.msg)
		}

		setTimeout(()=>{
			setMessage("")
		},5000)

	}


const googleAuth = (e) => {
    e.preventDefault()
    if(userdata.user){
      router.push('/vetchat')
      return
    }
      window.open(
        `/api/auth/google/callback/vetchat`,
        "_self"
      );

  };


	
	return(
		  <div className="flex bg-gray-100 justify-center h-screen px-5">
			<Link href="/"> 
	    <div className="flex items-center  absolute  top-2">
	      <img src="/logo.png" className="w-12"/>
	      <span className="text-[#5F2600] font-bold text-xl">DogSwag</span>
	    </div>
	    </Link>
		   <div className="max-w-md mt-20 h-fit mx-auto rounded-xl bg-white flex flex-col gap-2 w-full shadow-lg">
		    <div className="grid grid-cols-2 ">
		      <div onClick={()=>setActiveTab(0)} className={`border p-2 ${activeTab === 0 ? "bg-amber-500":""} cursor-pointer rounded-tl-xl`}>Log in</div>
		      <div onClick={()=>setActiveTab(1)} className={`border p-2  ${activeTab === 1 ? "bg-amber-500":""} cursor-pointer rounded-tr-xl`}>Sign up</div>
		    </div>

		    <div className="p-5 flex flex-col gap-2 w-full">
		    {
		     message &&  <p className="text-xs text-amber-500 text-center">{message}</p>
		    }
		    <h2 className="text-2xl font-semibold">{activeTab === 1 ? "Sign up":"Log in"}</h2>
		    <input onChange={handleChange} name={"email"} type="email" placeholder="Email" className="p-2 border border-gray-300 w-full"/>
		   {
		   	activeTab === 0 ?
		    <input onChange={handleChange} name={"password"} type="password" placeholder="Password" className="p-2 border border-gray-300 w-full"/>	
		    :
		    <></>	   	
		   }
		    {
		    activeTab ===1 ?
		    <>
		    <input onChange={handleChange} name={"fullname"} type="text" placeholder="Full name" className="p-2 border border-gray-300 w-full"/>
		    <input onChange={handleChange} name={"clinicname"} type="text" placeholder="Clinic name" className="p-2 border border-gray-300 w-full"/>
		    <input onChange={handleChange} name={"phoneno"} type="phoneno" placeholder="Mobile" className="p-2 border border-gray-300 w-full"/>
		    </>
		    :
		    <></>
		    }
		    <button onClick={Login} className="p-2 bg-amber-800 rounded-xl text-white">{activeTab === 0 ? "Log in":"Sign up" }</button>
		    <Link href="/forgot-password">{activeTab === 0 ? "Forgot password?" : ""}</Link>
		    <hr/>

		    {/* {
		    	 activeTab ===0 ? 
		    	   <div className="flex justify-center">
               <button onClick={(e)=>googleAuth(e)} className="border border-gray-300 w-full gap-2 flex items-center justify-center rounded-xl p-2"> Sign in with <img src="/googleSVG.svg" className="w-7" alt="" /> Google</button>
             </div>
             :
             <></>
		    } */}
		  
        
        </div>
		    </div>

		  </div>
		)
}