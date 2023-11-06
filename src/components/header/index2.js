import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const HeaderCard =({singleData})=>{
    return (
    <div className="bg-white p-5 font-Inter h-full w-full rounded-lg ">
       <h3 className="text-lg font-bold">{singleData.title}</h3>
       <div className="w-full mt-2 border-2 "> </div>
       <p className="text-center p-5 text-sm text-gray-600">{singleData.text}</p>
    </div>
    )
}

export default HeaderCard