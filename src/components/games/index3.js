export default function Index(){
	const cat = [
		  {
		  	image:"/c1.png",
		  	text:"Energetic play",
		  	width:"40"
		  },
		  {
		  	image:"/c2.png",
		  	text:"Energetic play",
		  	width:"32"
		  },
		  {
		  	image:"/c3.png",
		  	text:"Energetic play",
		  	width:"40"
		  },
		  {
		  	image:"/c4.png",
		  	text:"Energetic play",
		  	width:"32"
		  }
		]
	return(
		<main className="font-Inter    mx-auto">

		<section className="pl-16 flex">

<div className="py-28 ">
<div className="font-Jumper  font-bold text-7xl">
		  What is <br/> <span className="text-[#FFA90F]">Mental Enrichment</span> <br/> for dogs?
	   </div>
		   <p className="text-2xl font-black mt-4 uppercase">Mental Enrichment  <span className="text-[#FFA90F]">{`Increases your Dog's Longevity!`}</span></p>
		   <p className="text-2xl  max-w-lg uppercase font-black">{`We specialize in keeping your Dog's mentally FIT`} & <span className="text-[#FFA90F]">create A STRONG BOND WITH YOU</span></p>
		  <button className="px-5 py-2 text-xl bg-[#FFA90F] text-white rounded-lg my-5 uppercase">Find out more</button>
</div>
<div className="bg-cover ml-full w-[720px] bg-center h-screen" style={{ backgroundImage: "url('/headerRightShapes1.png')" }}>
<img src='/gamesheaderrightdog.png' className="w-[530px] absolute top-8  h-[730px]"/>
</div>
		</section>

		<section className="flex ">
		<div className="bg-cover ml-full w-[561px] bg-center h-[768px]" style={{ backgroundImage: "url('/headerLeftShapes1.png')" }}>
		<img src='/question1.png' className="w-[450px]  absolute top-[730px] left-60  h-[320px]"/>

<img src='/gamesheaderleftdog.png' className="w-[885px]  absolute top-[800px] -left-20 h-[742px]"/>
</div>
	   <div>

<div>
<img src="/question7.png" className="w-[985px] h-[1070px] absolute  left-80 top-[600px]"/>
</div>  
 <div className="absolute top-[1150px] left-[500px] ">
 <div className="flex justify-center">
   <div>
   <h1 className="text-[3rem] leading-[4rem]  tracking-widest font-Jumper font-bold text-[#FFA90F]">
		  HOW
	   </h1>
	   <p className="text-2xl font-semibold w-[670px] uppercase ml-2">Mental Enrichment should be FUN and Learning!</p>

   </div>
   <img src="/question4.png" className="w-[450px] absolute left-[460px] -bottom-36 h-[320px] "/>
   <img src="/question7.png" className="w-[985px] h-[1070px]  absolute left-[560px] -bottom-[900px] h-[320px] "/>

	   </div>

 </div>
	    </div>
  
	   


		</section>

		<section className="relative">
	   
		 <h3 className="uppercase text-center font-bold text-3xl  my-10 font-Jumper">It is broken down into Four Categories</h3>
		 <ul className="flex justify-center items-center  flex-wrap gap-10 mb-10">
		   {
			   cat.map((c,i)=>{
				   return(
					   <li key={i} className="p-8 grid rounded-3xl flex flex-col h-72 justify-center items-center relative w-fit bg-[#FFA90F]">
						   <img src={c.image} className={`w-32`}/>
						   <span className="text-center text-md font-bold uppercase">{c.text}</span>
					   </li>
					   )
			   })
		   }
		 </ul>
		 {/*<div className="flex justify-center items-center relative h-[191px] max-w-5xl mx-auto">
		 <img src="/dogfood.png" className="w-32 absolute  bottom-0 left-40"/>
		 <img src="/exercisedog.png" className="w-[400px] absolute"/>
		 </div>*/}
	   </section>


		<section className=" py-10 relative">
		 <h3 className="uppercase text-center font-semibold text-xl">{`N'Rich Zone activity space`}</h3>
		 <ul className="flex flex-wrap gap-10 justify-center my-10">
			 <li className="relative w-[300px] h-fit text-center">
				 <img src="/exce1.png" className=""/>
				 <img src="/dec.png" className="absolute bottom-0"/>
				 <p className="absolute font-semibold  bottom-0 h-16  p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
			 </li>

			 <li className="relative w-[300px] h-fit text-center">
				 <img src="/exce1.png" className=""/>
				 <img src="/dec.png" className="absolute bottom-0"/>
				 <p className="absolute font-semibold  bottom-0 h-16  p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
			 </li>

			 <li className="relative w-[300px] h-fit text-center">
				 <img src="/exce1.png" className=""/>
				 <img src="/dec.png" className="absolute bottom-0"/>
				 <p className="absolute font-semibold  bottom-0 h-16  p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
			 </li>
			 
		 </ul>
	   </section>


   <section className="h-[300px] bg-[#FFEECF] mx-w-4xl mx-auto rounded-tl-[100px] flex flex-col justify-center">
		  <p className="text-center text-[#5E6282]">{`Subscribe to get information, latest news and other
interesting offers about Dogswag.club`}</p>
		  <div className='max-w-md mx-auto flex gap-5 mt-10'>
  
			<div className="bg-white flex items-center relative rounded-xl">
			  <div className="w-2/12 flex justify-center ">
			   <img src="/email.svg" className="w-5 h-5"/>
			   </div>
			  <input className="w-10/12 p-4 rounded-xl" placeholder="Your Email"/>
			</div>
			<button className="rounded-xl bg-orange-400 px-4 text-white bg-gradient-to-t from-[#FFA910]  to-[#FAE80C]">Subscribe</button>
		  </div>
	   </section>

		 
	 </main>
		)
}