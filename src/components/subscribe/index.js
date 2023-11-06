import {useState,useEffect} from 'react'
import {Loader} from '@mantine/core'
import axios from 'axios'

export default function Index(argument) {
    const [subscribe,setSubscribe] = useState(true)
    const [subscribed,setSubscribed] = useState(false)
    const [email,setEmail] = useState("")
    const [isSubscribing,setIsSubscribing] = useState(false)

    async function onSubscribe(){
        setIsSubscribing(true)
       

        if(!email){
            alert("please enter your email")
            setIsSubscribing(false)
            setSubscribe(false)
		    setSubscribed(false)
            return
        }

        if(!ValidateEmail(email)){
            alert("Invalid email")
            setIsSubscribing(false)
            setSubscribe(false)
		    setSubscribed(false)
            return
        }
       
        await axios.post('/api/subscribe/',{email}).then(res=>{
            console.log(res)
            setIsSubscribing(false)
            setSubscribe(true)
		    setSubscribed(true)
            setEmail("")
        }).catch(err=>{
            setIsSubscribing(false)
            setSubscribe(false)
		    setSubscribed(false)
            alert(err.response && err.response.data.msg)
            console.log(err)
            setEmail("")
        })
        
        
    }
    
function ValidateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;

  }
}


 
    useEffect(()=>{
    	setSubscribe(false)
    	setSubscribed(false)
    },[])


	return(
		  <div className="py-10 px-5 ">
		  <div className="max-w-5xl rounded-3xl font-[poppins] shadow-2xl bg-yellow-100 mx-auto">
		    <div className="text-center py-2">
		       <h1 className="text-5xl font-bold text-amber-800 tracking-wider mt-2">Newsletter</h1>
		    </div>
		     <div className="w-full flex relative justify-center py-2">
		  	    <img src={subscribe ? "/img/mouthclose.png":"/img/mouthopen.png"} className="w-96"/>
		  	    <div className={`${subscribe ? "scale-0": "scale-100"} transition duration-1000 absolute top-[270px] grid`}>
		  	        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-2  bg-white bg-white border border-gray-300 text-amber-900 bg-opacity-25"/>
		            <button disabled={isSubscribing?true:false} className={`${isSubscribing ? "bg-gray-200":"bg-amber-800"}   text-white p-2 b rounded-md relative flex items-center justify-center`} onClick={onSubscribe}>Subscribe{isSubscribing ?<Loader size={"xs"} color={"gray"} className="absolute"/>:<></>}</button>
		        </div>
		        <div className={`${!subscribed ? "scale-0": "scale-100"} transition duration-1000 absolute top-[270px] grid`}>
		            <div className="bg-amber-300 p-4 text-black rounded-md">Woof, Woof is all set to feed you with good stuff every week.</div>
		        </div>
		     </div>

		      <div className="p-5 text-sm flex gap-2 flex-col">
<div>		      
<h2 className="text-lg font-bold text-amber-800">{"Why should I sign up for this newsletter?"}</h2>
<div className="text-sm text-amber-700 p-5 border-l-2 mx-2 border-amber-400">{"We are going to be sharing insights on training, food, recipes, boarding, and playtime."} 
{"Insights that are easy to understand, and do, and one where you see awesome results for your dogs. Insights that we have gained from the last 25+ years."}
</div>
</div>
<div>
<h3 className="text-lg font-bold text-amber-800 flex flex-col">About us : </h3>
<div className="text-sm text-amber-700 px-5 border-l-2 mx-2 border-amber-400">{"Pavithra Sunder is a certified trainer and has trained more than 200+ dogs in the last 5 years. She is an avid animal rescuer and works with various groups."}</div>
<div className="text-sm text-amber-700 px-5 mt-2 border-l-2 mx-2 border-amber-400">{"Sunder Raman, Chef for Dogs, cooking for the last 7 years, follows Dr Karen Becker's methodology and teaching. Also, does acupressure for dogs. "}</div>
</div>
<div>
<h2 className="text-lg font-bold text-amber-800">{"What else do you want me to say?"}</h2>

<div className="text-sm text-amber-700 p-5 border-l-2 mx-2 border-amber-400">{"It is FREE for the first 100 pet parents"}</div>
</div>	
		    </div>

		  </div>
		  </div>
		)
}