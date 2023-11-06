import React, { useEffect, useState ,useRef} from "react";
import { Carousel } from '@mantine/carousel';
import Link from 'next/link'
export default function Meme({memedata}) {
    
    console.log(memedata)
    const [width, setWidth]   = useState(typeof window !== null && window.innerWidth);
   	const [height, setHeight] = useState(typeof window !== null && window.innerHeight);
   
   	const updateDimensions = () => {
	    setWidth(window.innerWidth);
	    setHeight(window.innerHeight);
	}

	useEffect(() => {
	    window.addEventListener("resize", updateDimensions);
	    return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	if(memedata && !memedata._id){
		return <div className="p-2 flex justify-center items-center h-screen text-xs text-gray-500">Nothing to display.</div>
	}

	return(
		  <div className="max-w-[1000px] bg-white mx-auto p-2 flex flex-col gap-3">
			    <div className="flex">
			    	<Link href="/woofwoof">
			    	     <button className="cursor-pointer bg-[#5f2600] border w-12 flex justify-center rounded-md"><img src="/assets/icons/back-arrow.svg" className="w-8 h-8 invert" /></button>
			        </Link>
			    </div>

			    <div className="p-2 border shadow-inner">
					<Carousel
					
				      controlSize={width > 700 ? 90:40 }
				      withIndicators
				      styles={{
				        control: {
				          borderRadius:"10px",
				          // backgroundColor:'white !important',	
				          '&[data-inactive]': {
				            opacity: 0,
				            cursor: 'default',
				          },
				        },
				        indicator: {
				          width: '10px',
				          height: '10px',
				          borderRadius:'20px',
				          border:'1px solid white',
				          backgroundColor:'white !important',
				          color:'white',
				          zIndex:'90',
				          transition: 'width 250ms ease',

				          '&[data-active]': {
				            width:'2rem',
				          },
				        },
				      }}

				  >

				    
				    {
				    	memedata && memedata.type === "video" ? 
				    	  <Carousel.Slide ><video alt="dog" className="object-cover mx-auto md:h-96" src={memedata && memedata.imagelist[0]} controls/></Carousel.Slide>
				    	:
				    	memedata && memedata.imagelist && memedata.imagelist.map((m,i)=>{
				          return <Carousel.Slide key={i}><img alt="dog" className="object-cover mx-auto md:h-96" src={m}/></Carousel.Slide>
				    	})
				    }				      
				    </Carousel>
				    <div className="text-xs p-2 ">
				  	          {memedata && memedata.captionData}    
				  	</div>
			    </div>
			    <div className="flex w-full justify-center">
		       </div>
			  </div>
		)
}