import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const TestimonialCard = ({ review }) => {
    return (
        
        
        <div className="border border-gray-200 flex flex-col shadow p-5 rounded-xl">
            <div className="flex gap-4 items-center">
                <img className="h-[57px] w-[57px] font-Inter" src={review.profilePic} alt="" />
                <h3 className="text-lg font-bold text-gray-600">{review.name}</h3>
            </div>
            <div className="mt-2 border-b-2 w-full"></div>
            <p className="text-sm text-gray-600 p-4 font-Inter">{review.comment}</p>
        </div>
 
        
        
    );
};

export default TestimonialCard