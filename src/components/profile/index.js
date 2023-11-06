import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router'
const Blogs = dynamic(() => import("@/components/allblogs"), {
  ssr: false,
});
const MultiSelect = dynamic(() => import("@mantine/core").then((m) => m.MultiSelect), {
  ssr: false,
});
const Modal = dynamic(() => import("@mantine/core").then((m) => m.Modal), {
  ssr: false,
});
const ProfilePicture = dynamic(() => import("@/components/utils/profilePicture"), {
  ssr: false,
});

const Profile = ({ userdata, userprofiledata, blogdata }) => {

    console.log(userprofiledata)

        const router = useRouter()

        // console.log(router)
       // return null

        const [effect, setEffect] = useState(true)
        const [opened, setOpened] = useState(false)
        const [profileEditedPic, setProfileEditedPic] = useState("")
        const [selectedImage, setSelectedImage] = useState(null)
        const [breeds, setBreeds] = useState(breedData)
        const [breedList, setBreedList] = useState(userprofiledata ? userprofiledata.breeds : []);
        const [userInfo, setuserInfo] = useState(userprofiledata ? userprofiledata : {})
        const [userName, setUserName] = useState(userprofiledata ? userprofiledata.username : "")
        const [timerId, setTimerId] = useState(null)
        const [availUserName, setavailUserName] = useState(false)

        if (userprofiledata === undefined) {
            return (
             
                 !userdata.user ||  router.query.userid !== userdata.user._id ?
                   <div className="flex flex-col justify-center items-center h-screen text-gray-500">This user have not created profile yet</div>
                   :
                    <div className="flex flex-col justify-center items-center h-screen text-gray-500">
                       You have not created your profile yet 
                           <Link href="/createprofile">
                           <div className="">
                              <button className="bg-[#5f2600] text-white p-2 rounded text-xs">create your profile</button>
                           </div>
                           </Link>
                   </div>
                )
        }
        const { user } = userdata
        
        async function onEdit() {
            
            const { bio, firstname, lastname, noofdog } = userInfo
            if(!firstname){
                alert("please input your firstname")
                return
            }
            if(!lastname){
                alert("please input your lastname")
                return
            }

            const formData = new FormData();
            formData.append("bio", bio)
            formData.append("firstname", firstname)
            formData.append("lastname", lastname)
            formData.append("noofdog", noofdog)
            formData.append("profilePic", profileEditedPic)
            formData.append("breeds", JSON.stringify(breedList))
            await axios.put("/api/info/editprofile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res)
            })
            setOpened(false)
            Router.reload();
            return
        }

        function handleChange(e) {
            e.preventDefault()
            setuserInfo({ ...userInfo, [e.target.name]: e.target.value })
        }

       async function onFollow(){ 
      
     if(!userdata.user){
       router.push('/login')
       return
     }
     try{
         if(!userInfo.followers.includes(userdata.user && userdata.user._id)){
             setuserInfo({...userInfo ,followers:[...userInfo.followers,userdata.user && userdata.user._id]})
         } else {
             setuserInfo({...userInfo,followers:[...userInfo.followers.filter(f=>f!==userdata.user._id)]})
             setuserInfo({...userInfo,followers:[...userInfo.followers.filter(f=>f!==userdata.user._id)]})
             
         }
     await axios.put(`/api/info/follow/${userInfo.infoID}`)        
     }catch(err){
        console.log(err)
     }
}

console.log(userInfo)

        function openEditProfile() {
            setOpened(true)
        }


        const handleUsername = (e) => {

            setUserName(e.target.value)
            clearTimeout(timerId);

            if (!e.target.value) {
                setavailUserName(false)
                return;
            }

            setTimerId(
                setTimeout(async () => {
                    await axios.get(`/api/info/checkusername/${e.target.value}`).then(res => setavailUserName(res.data.avail))
                }, 500)
            );
        }

return (
      <div className="">
      <div className='pt-8'>
        <div className='mx-5'>
        <div className='grid md:grid-cols-1 grid-cols-1 gap-4 text-center max-w-lg mx-auto'>
          <div className='flex justify-center'>
                <img src={userInfo.profilePic} 
                     onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/img/defaultprofile.jpg";
                      }}
                     className="rounded-full w-24 h-24 border object-cover"  alt="user" />
         </div>
          <div className='font-[poppins]'>
          <div className="flex justify-center">
            <span className='text-[#5f2600] text-xl font-semibold'>{userInfo.firstname+" "+userInfo.lastname}</span>
            <div className="relative">
            <div className="cursor-pointer inline text-sm text-gray-700 font-semibold absolute w-24 left-1">
            {
              user && userInfo.infoID === user._id ? 
              <button onClick={openEditProfile} className='bg-gray-200 py-1 px-3 hover:shadow-editShadow text-xs rounded'>Edit Profile</button>
            
             : 

             <button onClick={onFollow} className={`${userInfo.followers.includes(userdata.user && userdata.user._id) ? "bg-gray-300" : "text-gray-50 bg-[#5f2600]"} text-xs flex gap-2 justify-center h-7 items-center rounded w-24`}>
                        {/*<img src="/assets/icons/paw.svg" className="w-4 h-4 invert"/>*/}
                       <span>{userInfo.followers.includes(userdata.user && userdata.user._id) ? "followed":"follow me"}</span>
                </button>
            }
            </div>
            </div>
            </div>


            <div className='flex justify-center gap-3 flex-col items-center mt-2 text-[#5f2600] text-xs'>
            <div className='flex gap-3'>
                 <div className=''><span className='text-[#a96132]'>{blogdata.totalblogs}</span> Posts</div>
                 <div className=''><span className="text-[#a96132]">{userInfo.followers.length}</span> Followers</div>
                 <div className=''><span className='text-[#a96132]'>{userInfo.followings.length}</span> Followings</div>
            </div>
            <div className='flex gap-3'>
                    <div className=''><span className=" text-[#a96132]">{(userInfo.readtime/60).toFixed(2)}</span> Read time</div>
                    <div className=''><span className='text-[#a96132]'>{userInfo.totalviews}</span> Total views</div>
            </div>
            <div className='flex gap-2 flex-col'>
                <span className='text-xs font-semibold text-[#5f2600]'>About</span>
                <p className='text-[#8f5c3a] text-xs font-poppins'>{userInfo.bio}</p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
                {
                   userInfo && userInfo.breeds.map((m,i)=>{
                       return <span key={i} className="bg-[#a96132] text-white text-xs  justify-center rounded p-1 flex-wrap">{m}</span>
                   }) 
                }
            </div>
         
            </div>
            
          
           
        
         </div>
            
        </div>
        <div className='mt-12'>
        </div>
        <div className="">
             {/**/}
      <Modal 
                  opened={opened}
                  onClose={() => setOpened(false)}
                  size={"lg"}


      >

        {/* -----------------------------profile section start---------------- */}
       <div className="grid gap-3 justify-center items-center m-3 overflow-auto">
        
        <div className="mb-2 flex justify-center">
            <ProfilePicture setPic={setProfileEditedPic} selectedImage = {selectedImage} setSelectedImage={setSelectedImage} defPic={userInfo.profilePic ? userInfo.profilePic : "img/defaultProfile.jpg" }/>             
        </div>
          

        <div className="grid sm:grid-cols-2 gap-3">
         <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 my-1">
               Firstname
            </label>
          <input 
                 id="outlined-basic" 
                 name="firstname" 
                 value={userInfo.firstname} 
                 onChange={handleChange}
                 className="p-2 bg-[#e9ecef]  border text-sm rounded"
                 placeholder="firstname"
                 />
          </div>
          <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 my-1">
               Lastname
            </label>
          <input
                 id="outlined-basic" 
                 name="lastname"
                 className="p-2 bg-[#e9ecef]  border text-sm rounded"
                 value={userInfo.lastname} 
                 onChange={handleChange}
                 placeholder="lastname"                 
                 />
        </div>    
          </div>
        <div className="grid">
          <label className="text-sm font-medium text-gray-500 my-1">
               No of dogs
            </label>
          <input 
                      id="outlined-number" 
                      name="noofdog" 
                      value={userInfo.noofdog} 
                      type="number" 
                      onChange={handleChange}
                      className="p-2 bg-[#e9ecef]  border text-sm rounded w-28"
                      placeholder="no of dogs"
                      min="0"
                      />
          </div>
        <div className="grid">
           <label className="text-sm font-medium text-gray-500 my-1">
               Breeds
            </label>
           <MultiSelect
                      data={breeds}
                      placeholder="Select items"
                      searchable
                      creatable
                      getCreateLabel={(query) => `+ Create ${query}`}
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setBreeds((current) => [...current, item]);
                        return item;
                      }}
                      value={breedList}
                      onChange={setBreedList}
                      className="bg-gray-100"
                    />
          </div>
          
          <div className="row-span-2">  
            <label className="block mb-1 sm:text-sm text-xs font-medium text-gray-500 my-1">
             Sort bio <span className='text-gray-400 font-normal'>(max 300 character)</span>
            </label>
            
            <textarea
              id="message"
              rows="4"
              value={userInfo.bio}
              onChange={handleChange}
              maxLength={300}
              className="p-2 bg-[#e9ecef]  border text-sm rounded w-full"
              placeholder="Write here..."
              name="bio"
            ></textarea>
          
          </div>

          <div className="flex sm:justify-end justify-start">
              <button className="px-2 py-1 bg-black text-white text-xs w-24 rounded" onClick={onEdit}><span>Save</span></button>
          </div>
        </div>
    </Modal>
             {/**/}
      </div>

     {/* <div className="flex">
        <div className="px-4 py-1 bg-[#5f2600] text-white cursor-pointer">Posts</div>
        <div className="px-4 py-1 bg-[#a96132] text-white cursor-pointer">Drafts</div>
      </div>
    */}
      <hr/>
      {
       blogdata && blogdata.totalblogs < 1 ? 
        <>
           <div className="text-center text-2xl my-28 text-gray-500"> Awaiting your first blog...</div> 
        </>
        : 
        <Blogs userdata={userdata} blogdata ={blogdata}/>
      }
    </div>
    </div> 
        </div>

    )
}

export default Profile



const breedData= [
    { value: 'afghan hound', label: 'Afghan hound' },
    { value: 'airedale terrier', label: 'Airedale terrier' },
    { value: 'akita', label: 'Akita' },
    { value: 'alaskan Malamute', label: 'Alaskan Malamute' },
    { value: 'american Staffordshire terrier', label: 'American Staffordshire terrier' },
    { value: 'american water spaniel', label: 'American water spaniel' },
    { value: 'australian cattle dog', label: 'Australian cattle dog' },
    { value: 'australian shepherd', label: 'Australian shepherd' },
    { value: 'australian terrier', label: 'Australian terrier' },
    { value: 'aasenji', label: 'basenji' },
    { value: 'aasset hound', label: 'basset hound' },
    { value: 'beagle', label: 'beagle' },
    { value: 'bearded collie', label: 'bearded collie' },
    { value: 'bedlington terrier', label: 'Bedlington terrier' },
    { value: 'bernese mountain dog', label: 'Bernese mountain dog' },
    { value: 'bichon frise', label: 'bichon frise' },
    { value: 'black and tan coonhound', label: 'black and tan coonhound' },
    { value: 'bloodhound', label: 'bloodhound' },
    { value: 'border collie', label: 'border collie' },
    { value: 'border terrier', label: 'border terrier' },
    { value: 'borzoi', label: 'borzoi' },
    { value: 'boston terrier', label: 'Boston terrier' },
    { value: 'bouvier des Flandres', label: 'bouvier des Flandres' },
    { value: 'boxer', label: 'boxer' },
    { value: 'briard', label: 'briard' },
    { value: 'brittany', label: 'Brittany' },
    { value: 'brussels griffon', label: 'Brussels griffon' },
    { value: 'bull terrier', label: 'bull terrier' },
    { value: 'bulldog', label: 'bulldog' },
    { value: 'bullmastiff', label: 'bullmastiff' },
    { value: 'cairn terrier', label: 'cairn terrier' },
    { value: 'banaan dog', label: 'Canaan dog' },
    { value: 'bhesapeake Bay retriever', label: 'Chesapeake Bay retriever' },
    { value: 'bhihuahua', label: 'Chihuahua' },
    { value: 'bhinese crested', label: 'Chinese crested' },
    { value: 'bhinese shar-pei', label: 'Chinese shar-pei' },
    { value: 'chow chow', label: 'chow chow' },
    { value: 'blumber spaniel', label: 'Clumber spaniel' },
    { value: 'cocker spaniel', label: 'cocker spaniel' },
    { value: 'collie', label: 'collie' },
    { value: 'curly-coated retriever', label: 'curly-coated retriever' },
    { value: 'dachshund', label: 'dachshund' },
    { value: 'balmatian', label: 'Dalmatian' },
    { value: 'boberman pinscher', label: 'Doberman pinscher' },
    { value: 'bnglish cocker spaniel', label: 'English cocker spaniel' },
    { value: 'bnglish setter', label: 'English setter' },
    { value: 'bnglish springer spaniel', label: 'English springer spaniel' },
    { value: 'bnglish toy spaniel', label: 'English toy spaniel' },
    { value: 'bskimo dog', label: 'Eskimo dog' },
    { value: 'binnish spitz', label: 'Finnish spitz' },
    { value: 'flat-coated retriever', label: 'flat-coated retriever' },
    { value: 'fox terrier', label: 'fox terrier' },
    { value: 'foxhound', label: 'foxhound' },
    { value: 'French bulldog', label: 'French bulldog' },
    { value: 'berman shepherd', label: 'German shepherd' },
    { value: 'berman shorthaired pointer', label: 'German shorthaired pointer' },
    { value: 'berman wirehaired pointer', label: 'German wirehaired pointer' },
    { value: 'golden retriever', label: 'golden retriever' },
    { value: 'bordon setter', label: 'Gordon setter' },
    { value: 'breat Dane', label: 'Great Dane' },
    { value: 'greyhound', label: 'greyhound' },
    { value: 'irish setter', label: 'Irish setter' },
    { value: 'irish water spaniel', label: 'Irish water spaniel' },
    { value: 'irish wolfhound', label: 'Irish wolfhound' },
    { value: 'jack Russell ', label: 'Jack Russell ' },
    { value: 'terrier', label: 'terrier' },
    { value: 'japanese spaniel', label: 'Japanese spaniel' },
    { value: 'keeshond', label: 'keeshond' },
    { value: 'kerry blue terrier', label: 'Kerry blue terrier' },
    { value: 'komondor', label: 'komondor' },
    { value: 'kuvasz', label: 'kuvasz' },
    { value: 'labrador retriever', label: 'Labrador retriever' },
    { value: 'lakeland terrier', label: 'Lakeland terrier' },
    { value: 'lhasa apso', label: 'Lhasa apso' },
    { value: 'maltese', label: 'Maltese' },
    { value: 'manchester terrier', label: 'Manchester terrier' },
    { value: 'mastiff', label: 'mastiff' },
    { value: 'mexican hairless', label: 'Mexican hairless' },
    { value: 'ewfoundland', label: 'Newfoundland' },
    { value: 'orwegian elkhound', label: 'Norwegian elkhound' },
    { value: 'orwich terrier', label: 'Norwich terrier' },
    { value: 'otterhound', label: 'otterhound' },
    { value: 'papillon', label: 'papillon' },
    { value: 'Pekingese', label: 'Pekingese' },
    { value: 'pointer', label: 'pointer' },
    { value: 'Pomeranian', label: 'Pomeranian' },
    { value: 'poodle', label: 'poodle' },
    { value: 'pug', label: 'pug' },
    { value: 'puli', label: 'puli' },
    { value: 'rhodesian ridgeback', label: 'Rhodesian ridgeback' },
    { value: 'rottweiler', label: 'Rottweiler' },
    { value: 'saint Bernard', label: 'Saint Bernard' },
    { value: 'saluki', label: 'saluki' },
    { value: 'samoyed', label: 'Samoyed' },
    { value: 'schipperke', label: 'schipperke' },
    { value: 'schnauzer', label: 'schnauzer' },
    { value: 'scottish deerhound', label: 'Scottish deerhound' },
    { value: 'scottish terrier', label: 'Scottish terrier' },
    { value: 'sealyham terrier', label: 'Sealyham terrier' },
    { value: 'shetland sheepdog', label: 'Shetland sheepdog' },

];