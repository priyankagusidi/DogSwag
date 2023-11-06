export default function Index(){
	const cat = [
		  {
		  	image:"/gamecat1.svg",
		  	text:"Energetic play",
		  	width:"40"
		  },
		  {
		  	image:"/gamecat2.svg",
		  	text:"Energetic play",
		  	width:"32"
		  },
		  {
		  	image:"/gamecat3.svg",
		  	text:"Energetic play",
		  	width:"60"
		  },
		  {
		  	image:"/gamecat4.svg",
		  	text:"Energetic play",
		  	width:"32"
		  }
		]
	return(
		  <main className="font-Inter  py-10 max-w-[1440px] mx-auto">
		    <section className="px-5 gap-10 relative h-[410px]">
		    <div className="absolute shadow-xl h-[600px] w-[600px] border  rounded-full -right-36 -top-40 bg-[#FFA90F]"></div>
		    <div className="absolute shadow-xl h-[650px] w-[650px] border border-[16px] border-[#FFA90F] rounded-full -right-36 -top-40 "></div>
		    
		    <h1 className="text-6xl font-semibold uppercase -mt-2">
		       What is 
		    <br/>
		      <span className="text-6xl text-[#FFA90F] font-bold">Mental enrichment</span>
		    <br/>
		       for dogs?
		    </h1>
		    <p className="text-2xl font-black mt-2 uppercase">Mental Enrichment <br/> <span className="text-[#FFA90F]">{`Increases your Dog's Longevity!`}</span></p>
		    <p className="text-2xl  max-w-lg uppercase font-black">{`We specialize in keeping your Dog's mentally FIT`} & <span className="text-[#FFA90F]">create a A STRONG BOND WITH YOU</span></p>
		    <button className="px-5 py-2 text-xl bg-[#FFA90F] text-white rounded-lg my-5 uppercase">Find out more</button>
		    <img src='/gameslanding.png' className="w-[450px] absolute right-36 -top-28"/>
		    </section>


		    <section className="px-5 w-full justify-center flex items-center gap-10 relative h-[600px] flex">
		    <div className="absolute h-[500px] w-[500px] rounded-r-full -left-16 to bg-[#FFA90F]"></div>
		    <img src='/gameslanding2.png' className="w-[500px] absolute left-16 bottom-0 z-10"/>
		    <img src="/question1.svg" className="w-[300px] absolute left-0 top-24 -scale-x-100"/>
		    <img src="/question1.svg" className="w-[500px] absolute left-40 -top-20"/>
		    <img src="/question1.svg" className="w-[400px] absolute right-72 top-20"/>
		    <img src="/question7.png" className="w-[600px] absolute -right-72 top-24"/>
		    <div className=" flex flex-col z-10 absolute left-[500px]">
		    <h1 className="text-[7rem] leading-[5rem]  font-bold text-[#FFA90F]">
		       HOW
		    </h1>
		    <p className="text-2xl font-semibold uppercase ml-2">Mental Enrichment should be FUN and Learning!</p>
		    </div>
		    </section>

		    <section className="relative">
		      <div className="absolute h-[450px] w-[230px] rounded-r-full -left-16 to bg-[#FFA90F]"></div>
		      <div className="absolute h-[480px] w-[270px] blur-[10px] border border-[10px] border-[#FFA90F] rounded-r-full -left-16 -top-5 "></div>
		    
		      <h3 className="uppercase text-center font-bold text-2xl  my-10">It is broken down into Four Categories</h3>
		      <ul className="flex justify-center items-center  flex-wrap gap-10 ml-48 mt-20 mb-10">
		        {
		        	cat.map((c,i)=>{
		        		return(
		        			<li key={i} className="p-8 rounded-3xl flex flex-col h-72 justify-center items-center relative w-fit bg-[#FFA90F]">
					        	<img src={c.image} className={`w-${c.width} absolute -top-20`}/>
					        	<span className="text-center text-md font-bold uppercase">{c.text}</span>
					        </li>
		        			)
		        	})
		        }
		      </ul>
		      <div className="flex justify-center items-center relative h-[191px] max-w-5xl mx-auto">
		      <img src="/dogfood.png" className="w-32 absolute  bottom-0 left-40"/>
		      <img src="/exercisedog.png" className="w-[400px] absolute"/>
		      </div>
		    </section>


		    <section className="h-[790px] py-10 relative">
		      <h3 className="uppercase text-center font-semibold text-xl">{`N'Rich Zone activity space`}</h3>
		      <ul className="flex flex-wrap gap-10 justify-center my-10">
		      	<li className="relative w-[300px] h-fit text-center">
		      		<img src="/exce1.png" className=""/>
		      		<p className="absolute font-semibold bg-[#FFA90F] bottom-0 h-20 rounded-2xl p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
		      	</li>
		      	<li className="relative w-[300px] h-fit text-center">
		      		<img src="/exce1.png" className=""/>
		      		<p className="absolute font-semibold bg-[#FFA90F] bottom-0 h-20 rounded-2xl p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
		      	</li>
		      	<li className="relative w-[300px] h-fit text-center">
		      		<img src="/exce1.png" className=""/>
		      		<p className="absolute font-semibold bg-[#FFA90F] bottom-0 h-20 rounded-2xl p-2">Bosco is a High-Energy Lab and needs to channel his energy</p>
		      	</li>
		      </ul>
		      <img src="/womenwithdog.png" className="absolute -right-20 w-96 bottom-5"/>
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