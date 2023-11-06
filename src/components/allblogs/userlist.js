import {useEffect,useState} from 'react';
import axios from 'axios'
import {useRouter} from 'next/router'

export default function UserList({userdata}) {
   const [users,setUsers] = useState([])
   const router = useRouter()
   useEffect(()=>{
      axios.get('/api/info/recommandedprofile').then(res=>{
         setUsers(res.data ? res.data.user:[])
      })
   },[])
   console.log(users)
   async function onFollow(id,userID) {

        if(!userdata.user){
          router.push('/login')
          return
       }
       if(!userdata.user.hascreatedprofile){
           router.push('/createprofile')
           return
       }

       const follow = users.map((m,i)=>{
            if(m.infoID === userID){
             if(m.followers.includes(userdata.user._id)){
               console.log("exist")
               const removefollower = m.followers.filter(d=>d !== userdata.user._id)
               return {...m, followers:removefollower}
             }else {
               console.log("not exist")
               return {...m, followers:[...m.followers,userdata.user._id]}
             }
         }else {
            return {...m}
         }

       })
       console.log(follow)
       setUsers(follow)
       try{
         await axios.put(`/api/info/follow/${userID}`).then(res=>{
            console.log(res)
         })
       }catch(err){
         console.log(err)
       }
    }
   return(
   	  <div className="bg-white p-2 shadow rounded-md">
          <div className="font-bold">
            Who to follow
          </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-1">
        {
           users && users.map((m,i)=>{
               return(

                    <div className="mt-2 flex justify-between gap-2  p-2" key={m._id}>
                    {
                     userdata && userdata.user && userdata.user._id === m.infoID ?
                     <></>
                     :
                     <>
                     <div className="flex flex-col gap-2">
                       <div className="flex items-start gap-2">
                          <img src={m.profilePic} className="w-7 h-7 rounded-full"/>
                          <div className="">
                             <h1 className="text-sm">{`${m.firstname} ${m.lastname}`}</h1>
                             <p className="text-xs text-gray-500">{m.bio} </p>
                          </div>
                       </div>
                      </div>
                  
                        <div className="flex items-center">
                         <button onClick={()=>onFollow(m._id,m.infoID)} className={`w-16 p-2 rounded text-[.6em] ${m.followers.includes(userdata && userdata.user && userdata.user._id) ? "bg-gray-300 text-black" : "bg-[#5f2600] text-white"}`}> {m.followers.includes(userdata && userdata.user && userdata.user._id) ? "Followed" : "Follow"}</button>
                       </div>
                       </>
                    }
                      
                      
                    </div> 
                  )
           })
        }
         </div>
        </div>	
        )
}