import { Stepper } from '@mantine/core';
import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import Link from 'next/link'
export default function Steppers(){


  const [active, setActive] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const shouldAllowSelectStep = (step) => highestStepVisited >= step && active !== step;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [activity,setActivity] = useState([])
  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setCurrentDay(today.getDate());
    setCurrentWeek(Math.ceil(currentDay / 7));
  }, [currentDay]);




    async function fetchActivity(){
    try {
        await axios.get('/api/activity/getactivity/August/2023').then(res=>{
           console.log(res)
           setActivity(res.data.activity)
        })
    } catch(e) {
      // statements

      console.log(e);
    }
  }

  useEffect(()=>{
       fetchActivity()
  },[])
  

  console.log(activity)



    return(
         <div>
          <div className="flex justify-center py-10">
                <Link href="/activity"><button className="bg-[#FFCB07]  mb-4  p-4 font-bold text-2xl text-center mx-auto font-Inter uppercase rounded-2xl">{`N'Rich Zone`}</button>
                </Link>
            </div>
          <div className="flex justify-between items-center  p-5 bg-white rounded-xl shadow-md">
                <div className="md:w-2/12 w-6/12">
                  <h1 className="text-4xl font-semibold">Month</h1>
                  <span className="text-sm text-gray-500">August</span>
                </div>

                <div className="md:w-10/12 w-6/12">

                <Stepper active={0}  breakpoint="sm">


                    {
                        activity?.map((a,i)=>{
                            return(

                                <Stepper.Step key={i}    
                             allowStepSelect={shouldAllowSelectStep(i)}
                             icon={<img src="/love.svg"/>}  label={`Week ${i+1} `} description={a.title}>
                     </Stepper.Step>

                                )
                        })
                    }

                <Stepper.Step    
                             allowStepSelect={shouldAllowSelectStep(4)}
                             icon={<img src="/star.png"/>} label="Final" description="Super Dog Badge">
                </Stepper.Step>
                <Stepper.Completed>
                  Completed, click back button to get to previous step
                </Stepper.Completed>
              </Stepper>
              </div>
          </div>
          </div>
        )
}