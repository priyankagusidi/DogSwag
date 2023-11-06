import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover object-cover bg-center" style={{ backgroundImage: `url('/img/vetTalksLandingImage.jpg')` }}>
      <div className="text-white max-w-md  bg-opacity-60 text-center">
        <h1 className="mb-5 text-4xl font-bold">
          <span className="text-orange-500 ">Empowering Pet Health</span>
          <span className="text-yellow-600"> and Wellness</span>
        </h1>
        <p className="mb-5 hover:text-1xl text-neutral-content  text-center">Your Trusted Resource for Expert Pet Care Advice and Insights to Promote the Health and Happiness of Your Beloved Pets</p>
        <Link href="/registerdog">
          <button className=" md:py-3 md:px-6 sm:py-[0.67rem] rounded-full font-semibold sm:px-[1.4rem] py-[0.55rem] px-[1.3rem] bg-yellow-700 hover:bg-yellow-600 transition-all shadow-2xl hover:shadow-md text-white font-mono hover:text-black">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;


