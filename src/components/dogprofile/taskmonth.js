const TaskMonth =()=>{
    return (
<div className="mt-8 bg-white absolute border border-black">
<div className=" mb-4 mx-auto ">
				<div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                        <div className="bg-[#FFCB07] md:px-1  rounded-full text-center  text-[#1E1D4C] text-lg font-semibold font-Inter
">
    Energetic Play 

</div>
<div className="bg-[#FFCB07] rounded-full text-center md:px-1  text-[#1E1D4C] text-lg font-semibold font-Inter
">
    Energetic Play 

</div>
<div className="bg-[#FFCB07] rounded-full text-center md:px-1   text-[#1E1D4C] text-lg font-semibold font-Inter
">
    Energetic Play 

</div>
<div className="bg-[#FFCB07] rounded-full text-center md:px-1  text-[#1E1D4C] text-lg font-semibold font-Inter
">
    Energetic Play 

</div>
                    </div>
				</div>

<div className="lg:flex p-2 items-center gap-10 bg-[#DBDAD4] rounded-xl border border-black">
		        <div className="flex flex-col items-center mt-2  justify-center">
		    		 <h2 className="text-2xl font-bold uppercase">August</h2>
		    	 	 <h4 className="text-md  font-semibold text-gray-500">Month</h4>
		        </div>
		        <div>
		            <h3 className="font-semibold uppercase text-sm">Pulse</h3>
		        </div>

		        <div className="lg:flex grid grid-cols-2 w-full">
				<div className="relative w-10 h-20 flex justify-center items-center">
    <div className="rounded-full w-fit border-4 p-1 bg-[#FFCB07] border-white">
        <img src="/love.png" className="w-5 h-5" />
    </div>
	
    <p className="absolute text-xs top-16 text-center text-gray-500 w-20">Week 1</p>
	
</div>
<div className="relative top-8" style={{ width: '170px', height: '12px', background: 'black', borderRadius: '5px'}}>
      <div className="relative top-[2px]"
        style={{
          width: '170px',
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
    <p className="absolute text-xs top-16 text-center text-gray-500 w-20">Week 2</p>
</div>
<div className="relative top-8" style={{ width: '180px', height: '12px', background: 'black', borderRadius: '5px'}}>
      <div className="relative top-[2px]"
        style={{
          width: '180px',
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
          width: '180px',
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
            <div className="flex lg:gap-0 gap-10 items-center">
            <div className="relative -left-8 w-20 h-20 flex justify-center items-center">
		           
               <img  src="/award.png" className="w-4 h-4 z-10 ml-3 mt-1" />
               <img  src="/star.png" className="absolute left-4 w-[55px] h-[55px]"/>
           
         </div>
         <div>
		            <h3 className=" uppercase text-sm">Super Dog Badge</h3>
		        </div>
            </div>
              
		        </div>

		       

		    </div>
</div>
    )
}

export default TaskMonth