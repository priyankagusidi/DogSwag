import Calendar from './calendar2'
import Addcontact from './addcontact'
import Invite from './invite'
import Dogdetail from './dogdetail3'
import DogProfiles from './dogprofileList'
import Pricing from './pricing'
import {useState,useRef} from 'react'
// import { Walktour } from 'walktour'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import { nanoid } from 'nanoid';
import axios from 'axios'

// const ChatEngine = dynamic(() => import('./chat'), {
//   ssr: false // Disable server-side rendering
// });
import Chat from '@/components/chat' 
// import Router2 from 'next/router'

// Handle custom events from the server
// socket.on('eventName', (data) => { ... });



const Index = ({userdata,onedogprofiledata,dogprofiledata,billingdata,dogdata}) => {
  console.log(billingdata)
// let value;
// if (typeof window !== "undefined") {
//   value = localStorage.getItem("tourDog") || true;
// } 

// console.log(value)

  const [PricingModal,setPricingModal] = useState(false)
  const [showDetail,setShowDetail] = useState(true)
  const [showPricing,setShowPricing] = useState(false)
  const [isTourOpen,setIsTourOpen] = useState(false)
  const [stepIndex,setStepIndex] = useState(0)
  const [openEditModal,setOpenEditModal] = useState(false)
  const [openCreate,setOpenCreate] = useState(false)
  const [dateSelect,setDateSelect] = useState(true)
  const [showTourDog,setShowTourDog] = useState(false)
  

const router = useRouter()


const generateClientId = () => {
  let clientId = localStorage.getItem('gaClientId');
  if (!clientId) {
    clientId = nanoid(); // Generate a UUID for the client ID
    localStorage.setItem('gaClientId', clientId); // Store the client ID in localStorage
  }
  return clientId;
};



const trackEvent = async (ec,ea,el) => {
  const clientId = generateClientId();
  try {
    await axios.post('/api/analytics', {
      // Measurement Protocol parameters
      v: '1', // API version
      tid: 'G-6DXTQM0TPS', // Your Measurement ID
      cid: clientId, // A unique client ID
      t: 'event', // Hit type
      ec: ec, // Event category
      ea: ea, // Event action
      el: el, // Event label
      // Other parameters if needed
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};




 useEffect(() => {
    const tourDogShown = localStorage.getItem("tourDog");

    if (!tourDogShown) {
      setShowTourDog(true);
    }
  }, []);


  const pricingRef = useRef(null);

  // Get the value from local storage if it exists

  // Set the value received from the local storage to a local state
  // const [favoriteNumber, setFavoriteNumber] = useState(value)

  // When user submits the form, save the favorite number to the local storage
  
  const saveToLocalStorage = e => {
    // e.preventDefault()
    localStorage.setItem("tourDog", false)
  }


  const scrollToComponent = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  async function customNextFunc(i){
        // await new Promise((resolve) => {
  if(i.stepIndex === 4){
    // alert("switch to event edit")
    setOpenCreate(true)
    setDateSelect(true)
    // setOpenEditModal(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        }, 2000); // Replace 2000 with the desired duration in milliseconds
    }); 
  }

  i.next();
  }

  function customTitleRenderer(step) {

  
  console.log(step)
  return (
    <div>
      <h1>{step}</h1>
    </div>
  );
}


function content(){
  return(
      <>hello</>
    )
}
const closeTourDog = () => {
    setShowTourDog(false);
    localStorage.setItem("tourDog", true);
};


function startTour(){
  setIsTourOpen(true)
  setShowTourDog(false)
}

function customDescriptionRenderer(step) {


  console.log(step)
  return (
    <div className="">
      <img src={step} className="h-20 w-full object-cover"/>
    </div>
  );
}

console.log(stepIndex)
  return (
   <div className="flex flex-col">
{/*       <Walktour
  steps={[
    { selector: "#create_profile", title: "Create a Profile", description: "/gif/createprofile.gif" },
    { selector: "#create_profile", title: "Please fill in the details.", description: "/gif/registration.gif" },
    { selector: "#edit_profile_button", title: "Click on Edit and update cover picture.", description: "/gif/coverpic.gif" },
    { selector: "#step-one", title: "Hard press to create an event", description: "/gif/click.gif" },
    { selector: "#step-one", title: "Hard press and drag on mutiple dates and create an event .", description: "/gif/drag.gif" },
    { selector: "#add_more_content_button", title: "Fill in details like, food, medicine, or create your own event", description: "/gif/addcontent.gif" },
    { selector: "#notification_button", title: "Set reminders to friends, family, and caretakers ", description: "/gif/notification.gif" },
    // { selector: "#step-one", title: "Click to Edit or Delete your event", description: "/gif/2.png" },
    { selector: "#step", title: "Lets get Started!", description: "/gif/doghifi.gif" },
  ]}
   
  customTitleRenderer={customTitleRenderer}
  customDescriptionRenderer={(e)=>customDescriptionRenderer(e)}
  customHTMLContent={content}
  prevLabel={"Prev"}
  nextLabel={"Next"}
  closeLabel={"Close"}
  isOpen={isTourOpen}
  customCloseFunc={()=>setIsTourOpen(false)}
  customNextFunc={customNextFunc} 
/>*/}
         <div>
        {/*<DogProfiles trackEvent={trackEvent} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} showDetail={showDetail}setShowDetail={setShowDetail}/>      */}
        
{/*  {
    showDetail ?
        <Dogdetail  onedogprofiledata={onedogprofiledata}/>
        :
        <></>
  }*/}

        </div>
        <Calendar dogdata={dogdata} dateSelect={dateSelect} setDateSelect={setDateSelect} openCreate={openCreate} setOpenCreate={setOpenCreate} scrollToComponent={scrollToComponent} setShowPricing={setShowPricing} billingdata={billingdata}/>
       {/* <div className={`${showTourDog?"":"hidden"} z-50`}>
        <img src="/gif/goghi.gif" className={`fixed right-0 bottom-0 w-40 -scale-x-100`}/>
        <span><img src="/assets/icons/cross.svg" className="w-6 cursor-pointer z-10 fixed bottom-32 bg-white p-1 right-10" onClick={closeTourDog}/></span>
        <button onClick={startTour} className="fixed text-sm rounded-md bg-orange-500 text-white p-1 bottom-5 right-20">Start Tour!</button>
       </div>*/}
       {/*<Chat userdata={userdata}/>*/}
    </div>
   )
};

export default Index;


