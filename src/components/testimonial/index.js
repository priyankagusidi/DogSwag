import React, { useEffect, useState } from 'react';
import TestimonialCard from './index2';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const Testimonial = () => {
const reviews = [
    {
        _id: 1,
        name: "Rylie Gibbs" ,
        comment: "I can't thank Vet Chat enough for their exceptional service. When my beloved Jackie was feeling unwell, their prompt and caring advice helped us navigate a challenging situation. The veterinarians were not only knowledgeable but also compassionate, providing us with clear guidance and reassurance. It's heartwarming to know that such a valuable resource exists, making pet care more accessible and comforting. Vet Chat truly goes above and beyond to support pets and their owners when they need it the most. Thank you for being a lifeline",
        profilePic: "https://i.ibb.co/MDjyLQq/Avatar.png"
    },
   
    {
        _id: 2,
        name: "Sarah Kim" ,
        comment: "I can't express how relieved I am to have the vet chat at my fingertips. Being able to discuss my dog's health concerns with a qualified vet without leaving my home has been a lifesaver. They've helped me make informed decisions about my dog's well-being, and I appreciate the convenience and expert care they provide.",
        profilePic: "https://i.ibb.co/jDQmRbg/Avatar-1.png"

    },
    {
        _id: 3,
        name: "Emily Perry" ,
        comment: "Vet Chat has been an absolute lifesaver for me and my dog Mario . The convenience of getting expert veterinary advice from the comfort of my home is unmatched. The veterinarians are not only highly knowledgeable but also incredibly compassionate. They've guided me through various pet health issues with patience and care, ensuring the best possible outcome for my pets. Thanks to Vet Chat, I feel more empowered and confident in taking care of my beloved companions. I'm truly grateful for this invaluable service!",
        profilePic: "https://i.ibb.co/YkNDVgy/Avatar-2.png"
    },
]



    return (
        <div className="mx-auto max-w-7xl p-10">
            <div className="text-center">
                <h1 className="font-Jumper text-4xl">Don’t just take our word for it</h1>
                <p className="font-Inter text-gray-600">Here’s is what our customers have to say about our services</p>
            </div>
    
    <div className="block mx-auto  lg:hidden mt-10">
      <Carousel
            autoPlay
            infiniteLoop  
            showThumbs  ={false}
            showArrows  ={false}
            >
              {reviews.map(review =>  <div key={review._id}  className="border shadow-md p-4">
            <div className="flex gap-4 items-center">
                <img style={{width: '40px',height: '40px'}} className="h-[40px]  w-[40px]" src={review.profilePic} alt="" />
                <h3 className="testimonial-card-title">{review.name}</h3>
            </div>
            <div className="mt-2 border-b-2 w-full"></div>
            <p className="card-text mt-4 text-left">{review.comment}</p>
        </div>)}
            </Carousel>
      </div>

        <div className="lg:block hidden mt-10">
                <div className="grid grid-cols-3 gap-10 ">
                        {
                            reviews.map(review => <TestimonialCard key={review._id} 
                                review={review}
                            ></TestimonialCard>
                            )
                        }
                </div>
        </div>

        </div>
    );
};

export default Testimonial;