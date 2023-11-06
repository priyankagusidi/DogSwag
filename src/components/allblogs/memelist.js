import {useEffect,useState} from 'react';
import axios from 'axios'
import Link from 'next/link'

export default function UserList() {
      const [memes,setMemes] = useState([])
      useEffect(()=>{
         axios.get('/api/memes/recent').then(res=>{
            setMemes(res.data ? res.data.memes:[])
         })
      },[])

   return(

   	  <div className="bg-white p-2 shadow rounded-md">
          <div className="font-bold">
            Woof,Woof (Joke of the day)
          </div>
   	   
        {
          memes && memes.slice(0,1).map((m,i)=>{
            return(
                  <div className="mt-2 flex gap-2 h-20 p-2" key={m._id}>
                   <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                       {
                        m.type ==="video"?  
                        <Link scroll={false} href={`/woofwoof/${m._id}`}> 
                        <video alt={"dog"}  src={m.imagelist[0]}  className="object-cover w-14 h-14 rounded"/>
                        </Link>
                        :
                        <Link scroll={false} href={`/woofwoof/${m._id}`}>
                           <img  alt={"dog"} src={m.imagelist[0]} className="object-cover w-14 h-14 rounded"/>
                        </Link>
                       }
                       <div className="">
                        <Link scroll={false} href={`/woofwoof/${m._id}`}>
                          <h1 className="text-sm">{`${m.InfoID.firstname}  ${m.InfoID.lastname}`}</h1>
                          <p className="text-xs text-gray-500">{m.caption}</p>
                        </Link>

                       </div>
                    </div>
                   </div>
                 </div>
               )
          })
        }
        </div>	
        )
}