import { useState, useEffect } from "react"
import HeaderCard from "./index2.js"
import Link from "next/link.js"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Header = () => {
  const headerCardDataMobile = [
    {
      _id: 1,
      title: "Your Problem",
      text: "Difficulty Keeping Track of Vaccinations",
      title2: "Our  Solution",
      text2: "DogSwag allows you to input vaccination dates and sends you reminders for upcoming vaccinations, ensuring your dog's immunization stays up to date",
    },
    {
      _id: 2,
      title: "Your Problem",
      text: "Missed Appointments and Important Dates",
      title2: "Our  Solution",
      text2: "Stay organized with our calendar feature. Easily schedule and set reminders for vet appointments, grooming sessions, training classes, and important dates to ensure you never miss a commitment",
    },
    {
      _id: 3,
      title: "Your Problem",
      text: " Chaotic Feeding Schedule",
      title2: "Our  Solution",
      text2: "With our Dog Organizer, you can create and manage a consistent feeding schedule, set meal reminders, and track dietary preferences, ensuring your dog receives proper nutrition at the right times.",
    }


  ]
  const headerCardData = [
    {
      _id: 1,
      title: "Your Problem",
      text: "I am not sure if this is growth? ",
      solution:"Consult the top doctors with a click of a button and get immediate answers."

    },
    {
      _id: 2,
      title: "Your Problem",
      text: "My dog is scratching non-stop. ",
      solution: "Chat with some of the best Vets to get solutions to your dog's problems. You are just a click away!",
     
    },
    {
      _id: 3,
      title: "Your Problem",
      text: " My dog's ears are red.",
      solution: "Don't take this lightly. Chat with the best Vets to get your queries answered now.",

    }

  ]
  const [mobileData, setDataMobile] = useState([])
  const [data, setData] = useState([])


  useEffect(() => {
    setDataMobile(headerCardDataMobile);
    setData(headerCardData);
    // Set the initial data directly
    console.log(headerCardData)

  }, []);
  return (

    <div className="max-w-7xl font-Jumper mx-auto py-4">
      
      <div className="flex z-20 flex-col justify-center w-full relative px-5 lg:px-10 gap-2 md:gap-5">
          <span className="uppercase text-[2.5rem] sm:text-[3.5rem] leading-10 sm:leading-[3rem] md:leading-[4rem] lg:leading-[4.5rem] md:text-[4rem] tracking-[.1rem] md:tracking-[.14rem]">Simplify and Optimize Dog Care</span>
          <div className="flex flex-col lg:flex-row items-center gap-5 justify-center lg:justify-between">
            <span className="font-Inter sm:text-lg text-gray-500">Chat With Doctors for Free| Book Priority Appointments and Beat the Queue| Organize your Pet Care.</span>
            <Link href="/vetchatlogin">
                <button 
                  className="p-4  bg-[#FFCB07] w-60 text-xl font-Inter text-white rounded-xl cursor-pointer"
                >
                Get Started
                </button>
            </Link>
          </div>
      </div>

      <img className="absolute left-0" src="/ellipse3.png" alt="" />

      {/*------------------------- for laptop and big device]-------------------------------------- */}
      
      <div className="relative h-[250px] xs:h-[350px]  lg:h-[400px]">
        <div className="mx-auto px-5 absolute bottom-0 flex w-full justify-center">
          <img className="w-[400px]  xs:w-[500px] lg:w-[600px]" src="/ellipse1.png" alt="" />
        </div>
        <div className="mx-auto px-5 absolute bottom-0 flex w-full justify-center">
          <img className="w-[300px]  xs:w-[400px] lg:w-[500px]" src="/ellipse2.png" alt="" />
        </div>
        
        <div className="mx-auto z-10 px-5 absolute bottom-0 flex w-full justify-center">
          <img className="w-[200px] xs:w-[300px] lg:w-[400px]" src="/headerDog.png" alt="" />
        </div>
      </div>

      <div className="relative flex items-center justify-center max-w-7xl mx-auto h-[450px] lg:h-[630px] p-5">
        <div className="absolute bottom-0 px-5 flex w-full justify-center">
          <img className="object-cover  h-[450px] lg:h-[630px] w-full rounded-3xl rounded-lg" src="/doc-bg.jpeg" alt="" />
        </div>
         <div className="hidden lg:block p-16">
          <div className="grid grid-cols-3 gap-4 ">
            {
               headerCardData && headerCardData.map((m,i)=>{
                    return(
                         <div key={i} className="flex flex-col gap-4 font-Inter  z-50 max-w-md mx-auto text-gray-500 font-Inter">
                             <div className="bg-white p-5 rounded-xl shadow-md">
                             <h3 className="text-lg font-bold mb-3">Your Problem</h3>
                             <hr className="border border-5"/>
                             <div className="text-center text-sm mt-2">{m.text}</div>
                             </div>
                             <div className="bg-white p-5 rounded-xl shadow-md">
                             <div className="text-center text-sm mt-2">{m.solution}</div>
                             </div>
                          </div>

                        )
                })
             }
          </div>
          </div>     
          <div className="block lg:hidden ">                
           <div className="items-center h-96 flex  justify-center font-Inter ">
           <Carousel
            autoPlay
            infiniteLoop  
            showThumbs  ={false}
            showArrows  ={false}
            >
             {
               headerCardData && headerCardData.map((m,i)=>{
                    return(
                         <div key={i} className="flex flex-col gap-4 font-Inter text-center z-50 ">
                             <div className="bg-white max-w-xs sm:max-w-sm mx-auto p-5 rounded-xl shadow-md">{m.text}</div>
                             <div className="bg-white max-w-xs sm:max-w-sm mx-auto p-5 rounded-xl shadow-md">{m.solution}</div>
                          </div>

                        )
                })
             }
            </Carousel>
            </div>
           </div>
      </div>
      
    </div>
  )
}

export default Header