import Calendar from '../calendar2'
import Dogdetail from './demoDogDetail'
import Pricing from '../pricing'
import DogProfiles from '../dogprofileList'
import {useState,useRef} from 'react'
import { Walktour } from 'walktour'
import {useEffect} from 'react'

const Index = ({userdata,onedogprofiledata,dogprofiledata,billingdata}) => {
  console.log(dogprofiledata)

  const [PricingModal,setPricingModal] = useState(false)
  const [showDetail,setShowDetail] = useState(true)
  const [showPricing,setShowPricing] = useState(false)
  const [isTourOpen,setIsTourOpen] = useState(false)
  const [stepIndex,setStepIndex] = useState(0)
  const [openEditModal,setOpenEditModal] = useState(false)
  const [openCreate,setOpenCreate] = useState(false)
  const [dateSelect,setDateSelect] = useState(false)
  const [showTourDog,setShowTourDog] = useState(false)
   useEffect(() => {
    const tourDogShown = localStorage.getItem("tourDog");

    if (!tourDogShown) {
      setShowTourDog(true);
    }
  }, []);


  const addProfileRef = useRef(null);

  // Get the value from local storage if it exists

  // Set the value received from the local storage to a local state
  // const [favoriteNumber, setFavoriteNumber] = useState(value)

  // When user submits the form, save the favorite number to the local storage
  
  const saveToLocalStorage = e => {
    // e.preventDefault()
    localStorage.setItem("tourDog", false)
  }


  const scrollToComponent = () => {
    alert("scrolling")
    if (addProfileRef.current) {
      addProfileRef.current.scrollIntoView({ behavior: 'smooth' });
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

function closeTour(){
  setIsTourOpen(false)
  scrollToComponent()
}

function customDescriptionRenderer(step) {


  console.log(step)
  return (
    <div className="">
      <img src={step} className="h-20 w-full object-cover"/>
    </div>
  );
}
  return (
   <div className="flex flex-col">

        <Walktour
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
  customCloseFunc={closeTour}
  customNextFunc={customNextFunc} 
  // stepIndex={stepIndex}
/>
         <div>
        <DogProfiles addProfileRef={addProfileRef} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} showDetail={showDetail}setShowDetail={setShowDetail}/>      
        <Dogdetail />
        </div>
        <Calendar dateSelect={dateSelect} setDateSelect={setDateSelect} openCreate={openCreate} setOpenCreate={setOpenCreate} billingdata={billingdata} demo={true}/>
          <div className={`${showTourDog?"":"hidden"} z-50`}>
        <img src="/gif/goghi.gif" className={`fixed right-0 bottom-0 w-40 -scale-x-100`}/>
        <span><img src="/assets/icons/cross.svg" className="w-6 cursor-pointer z-10 fixed bottom-32 bg-white p-1 right-10" onClick={closeTourDog}/></span>
        <button onClick={startTour} className="fixed text-sm rounded-md bg-orange-500 text-white p-1 bottom-5 right-20">Start Tour!</button>
       </div>

        {/*<Pricing userdata={userdata} demo={true} PricingModal={PricingModal} setPricingModal={setPricingModal}/>*/}
    </div>
   )
};

export default Index;


