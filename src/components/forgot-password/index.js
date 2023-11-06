import axios from 'axios'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Index(){

	const [email,setEmail] = useState("")
	const [message,setMessage] = useState("")
	const router = useRouter()


	function handleChange(e){
		setEmail(e.target.value)
	}


	async function SendPassword(){
		setMessage("")
		try{
			await axios.post(`/api/auth/resetemail`,email).then(res=>{
			  setMessage("Registration successfull! ")
			})
		}catch(err){
			setMessage(err?.response?.data?.msg)
		}

		setTimeout(()=>{
			setMessage("")
		},5000)

	}


	return(
		  <div className="flex bg-gray-100 justify-center h-screen px-5">
<Link href="/"> 
    <div className="flex items-center  absolute  top-2">
      <img src="/logo.png" className="w-12"/>
      <span className="text-[#5F2600] font-bold text-xl">DogSwag</span>
    </div>
    </Link>
		   <div className="max-w-md mt-20 h-fit mx-auto rounded-xl bg-white flex flex-col gap-2 w-full shadow-lg">

		    <div className="p-5 flex flex-col gap-2 w-full">
		    {
		     message &&  <p className="text-xs text-amber-500 text-center">{message}</p>
		    }
		    <h2 className="text-2xl font-semibold">Enter your email</h2>
		    <input onChange={handleChange} name={"email"} type="email" placeholder="email" className="p-2 border border-gray-300 w-full"/>
		    <button onClick={SendPassword} className="p-2 bg-amber-800 rounded-xl text-white">Send email</button>		     
            </div>
		    </div>

		  </div>
		)
}