export default function Index(){
	const cat = [
		  {
		  	image:"/c1.png",
		  	text:"Energetic play",
		  	width:"40",
		  	bg:"#F47892"
		  },
		  {
		  	image:"/c4.png",
		  	text:"Training",
		  	width:"32",
		  	bg:"#B188E5"
		  },
		  {
		  	image:"/c3.png",
		  	text:"Unleased Creativity",
		  	width:"40",
		  	bg:"#FFCB07"
		  },
		  {
		  	image:"/c2.png",
		  	text:"Life Skills",
		  	width:"32",
		  	bg:"#A9E40B"
		  }
		]
	return(
		  <main className="font-Inter  py-10 max-w-7xl mx-auto">

		     <section className="px-5 gap-10 ">
            <div className="font-Jumper text-3xl md:text-6xl text-center">
               What is <span className="text-[#BE389D]">Mental Enrichment</span> for dogs?
            </div>


            <div className="flex flex-col md:flex-row gap-2  items-center mb-5">
           
            <div className="flex justify-center items-center">
              <img src="/pug2.png" className="mix-blend-multiply rounded-2xl w-60 md:w-96"/>
	 	         </div>

            <div className="px-5 uppercase text-center md:text-start">
		            <p className="text-md md:text-2xl lg:text-3xl text-gray-700 font-bold mt-2 ">Mental Enrichment  <span className="text-[#2C86CF]">{`Increases your Dog's Longevity!`}</span></p>
		            <p className="text-md md:text-2xl lg:text-3xl text-gray-700  font-bold ">{`We specialize in keeping your Dog's`} <span className="text-[#62CD11]">MENTALLY FIT</span> & Create a <span className="text-[#62CD11]"> STRONG BOND </span> </p>
		        </div>

		        </div>
            

            <div className="flex justify-center md:-ml-16">
	            <button 
	             className="bg-purple-500 text-white text-xl p-4 rounded-xl hover:after:content-['_↗'] uppercase">Get Started
	             </button>
            </div>
            
		     </section>

        <section className="flex flex-col md:flex-row justify-center text-center md:text-start mt-5 md:mt-0 items-center px-5 mx-auto">
	 	         <div>
	 	         {/*<h3 className="text-6xl font-bold text-[#B188E5]">How?</h3>*/}
		         <p className="text-md md:text-2xl lg:text-3xl text-gray-700 uppercase font-bold ">Mental Enrichment should be <br/><span className="text-[#62CD11]">FUN AND LEARNING</span><br/>without you having to <span className="text-[#2C86CF]">SPEND ANY MONEY</span></p>
             </div>
              <div className="flex justify-center">
              <img src="/doggroup.png" className="mix-blend-darken rounded-2xl w-[400px]"/>
	 	         </div>
        </section>


		     <section className="relative">
		    
		      <h3 className="uppercase text-center font-bold text-3xl  my-10 font-Jumper">It is broken down into <span className="text-[#BE389D]">{`Four`}</span> Categories</h3>
		     
		      <ul className="flex justify-center items-center  flex-wrap gap-10 mb-10 px-5">
		        {
		        	cat.map((c,i)=>{
		        		return(
		        			<li key={i} style={{backgroundColor:c.bg}} className={`p-8 grid rounded-3xl flex  flex-col h-72 justify-center items-center relative w-full md:w-60 shadow-md border`}>
					        	<img src={c.image} className={`w-32`}/>
					        	<span className="font-Jumper text-white text-center text-md font-bold uppercase">{c.text}</span>
					        </li>
		        			)
		        	})
		        }
		      </ul>

            <div className="flex justify-center md:-ml-5">
	            <button 
	             className="bg-purple-500 text-white text-xl p-4 rounded-xl hover:after:content-['_↗'] uppercase">Get Started
	             </button>
            </div>
		      {/*<p className="text-gray-500 text-center text-lg">We will upload one video from any of these categories which you can use as reference to engage your dog.</p>*/}
		  
		    </section>


		     <section className=" relative">
		      {/*<img src="/paw.png" className="absolute w-60 -right-0 rotate-45"/>*/}

		      <h3 className="uppercase text-center font-bold text-3xl  mt-10 mb-2 font-Jumper"><span className="text-[#BE389D]">{`N'Rich Zone `}</span> </h3>
		      
		      {/*<p className="text-gray-500 text-center">Guide lines will be clearly given chat support is available in case you need help.*/}

		      {/*<br/>At the end of the week you can upload your task video.</p>*/}
		      
		      {/*<p className="text-[#BE389D] text-center">The winners get Gift Hampers and goodie bags</p>*/}

		     
		      <ul className="flex flex-wrap gap-10 justify-center my-10">
		      	<li className="relative w-[300px] h-fit text-center shadow-md">
		      		<img src="/exce1.png" className=""/>
		           <img src="/example.png" className="absolute w-40 left-[-80px] top-[-95px] rotate-12"/>
		      		{/*<img src="/dec.png" className="absolute bottom-0"/>*/}
		      		<p className="absolute font-semibold  bottom-0 z-10 h-24 bg-opacity-70 bg-[#33D8F8] text-white rounded-b-2xl p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
		      	</li>

		      	<li className="relative w-[300px] h-fit text-center shadow-md">
		      		<img src="/exce1.png" className=""/>
		      		{/*<img src="/dec.png" className="absolute bottom-0"/>*/}
		      		<p className="absolute font-semibold  bottom-0 h-24 bg-opacity-70 bg-[#33D8F8] text-white rounded-b-2xl p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
		      	</li>

		      	<li className="relative w-[300px] h-fit text-center shadow-md">
		      		<img src="/exce1.png" className=""/>
		      		{/*<img src="/dec.png" className="absolute bottom-0"/>*/}
		      		<p className="absolute font-semibold  bottom-0 h-24 bg-opacity-70 bg-[#33D8F8] text-white rounded-b-2xl p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
		      	</li>		      	
		      </ul>
          
		    </section>
		  </main>
		)
}