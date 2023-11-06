import React, { useState, useEffect } from 'react';


const Activity =()=>{


	const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setCurrentDay(today.getDate());
    setCurrentWeek(Math.ceil(currentDay / 7));
  }, [currentDay]);



    return (
<>
<main className="lg:max-w-7xl sm:max-w-5xl font-Inter mx-auto py-10">
	
		 <section className="mx-auto">
			<div className="flex justify-center">
				<button className="bg-[#FFCB07]  mb-4  p-4 font-bold text-2xl text-center mx-auto font-Inter uppercase rounded-2xl">{`N'Rich Zone`}</button>
			</div>
         <div className="flex">
                <div className="lg:w-1/2   lg:block hidden lg:ml-0 ml-auto md:mb-10    lg:mb-0 ">
				<div className="w flex mr-auto  justify-start">
                    <img className="h-[230px]  w-[153px]" src="/nrichondoimge.png" alt="" />
                </div>
                
                </div>
				<div className="lg:w-1/2  mb-10  mx-auto lg:-left-[300px]  lg:mb-0 relative lg:top-[180px]">
				<div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                        <div className="bg-[#FFCB07] md:px-2  rounded-full text-center  text-[#1E1D4C] text-lg font-semibold font-Inter
						">
						    Energetic Play 

						</div>
						<div className="bg-[#FFCB07] rounded-full text-center md:px-2  text-[#1E1D4C] text-lg font-semibold font-Inter
						">
						    Energetic Play 

						</div>
						<div className="bg-[#FFCB07] rounded-full text-center md:px-2   text-[#1E1D4C] text-lg font-semibold font-Inter
						">
						    Energetic Play 

						</div>
						<div className="bg-[#FFCB07] rounded-full text-center md:px-2  text-[#1E1D4C] text-lg font-semibold font-Inter
						">
						    Energetic Play 

						</div>
                    </div>
				</div>

            </div>
		    <div className="flex p-4 items-center gap-10 bg-[#DBDAD4] rounded-xl">
		        <div className="flex flex-col items-center mt-2  justify-center">
		    		 <h2 className="text-2xl font-bold uppercase">August</h2>
		    	 	 <h4 className="text-md  font-semibold text-gray-500">Month</h4>
		        </div>
		        <div>
		            <h3 className="font-semibold uppercase text-sm">Pulse</h3>
		        </div>

		        <div className="flex w-full">
				<div className="relative w-10 h-20 flex justify-center items-center">
    <div className="rounded-full w-fit border-4 p-1 bg-[#FFCB07] border-white">
        <img src="/love.png" className="w-5 h-5" />
    </div>
	
    <p className="absolute text-xs top-16 text-center text-gray-500 w-20">Unlock</p>
	
</div>
<div className="relative top-8" style={{ width: '170px', height: '12px', background: 'black', borderRadius: '5px'}}>
      <div className="relative top-[2px]"
        style={{
          width: '0px',
          height: '8px',
          backgroundColor: '#FFCB07',
          borderRadius: '10px',
        }}
      />
    </div>

<div className="relative w-10 h-20 flex justify-center items-center">
    <div className="rounded-full w-fit border-4 p-1 bg-[#FFCB07] border-white">
        <img src="/love.png" className="w-5 h-5" />
    </div>
    <p className="absolute text-xs top-16 text-center text-gray-500 w-20">Unlock</p>
</div>
<div className="relative top-8" style={{ width: '170px', height: '12px', background: 'black', borderRadius: '5px'}}>
      <div className="relative top-[2px]"
        style={{
          width: '0px',
          height: '8px',
          backgroundColor: '#FFCB07',
          borderRadius: '10px',
        }}
      />
    </div>
		        <div className="relative w-10 h-20 flex justify-center items-center">
		           <div className="rounded-full w-fit border-4 p-1 bg-[#FFCB07] border-white">
		           	 <img  src="/love.png" className="w-5 h-5"/>
		           </div>
		           <p className="absolute text-xs top-16 text-center text-gray-500 w-20">Unlock</p>
		        </div>
				<div className="relative top-8" style={{ width: '170px', height: '12px', background: 'black', borderRadius: '5px'}}>
      <div className="relative top-[2px]"
        style={{
          width: '0px',
          height: '8px',
          backgroundColor: '#FFCB07',
          borderRadius: '10px',
        }}
      />
    </div>
		        <div className="relative w-10 h-20 flex justify-center items-center">
		           <div className="rounded-full w-fit border-4 p-1  bg-[#FFCB07] border-white">
		           	 <img  src="/love.png" className="w-5 h-5"/>
		           </div>
		           <p className="absolute text-xs top-16 text-center text-gray-500 w-20">Unlock</p>
		        </div>
				<div className="relative top-8" style={{ width: '180px', height: '12px', background: 'black', borderRadius: '5px'}}>
      {/* <div className="relative top-[2px]"
        style={{
          width: '180px',
          height: '8px',
          backgroundColor: '#FFCB07',
          borderRadius: '10px',
        }}
      /> */}
    </div>
                <div className="relative -left-8 w-20 h-20 flex justify-center items-center">
		           
		           	 <img  src="/award.png" className="w-4 h-4 z-10 ml-3 mt-1" />
		           	 <img  src="/star.png" className="absolute left-4 w-[55px] h-[55px]"/>
		          
		        </div>
		        </div>

		        <div>
		            <h3 className=" uppercase text-sm">Super Dog Badge</h3>
		        </div>

		    </div>

		 </section>
		 </main>
         </>
    )
}

export default Activity