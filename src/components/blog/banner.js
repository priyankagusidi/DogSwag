import React from 'react';
import Link from 'next/link'
const Banner = () => {
  return (
    <Link href={"/do"}>
    <div className="bg-amber-500 mb-4">
      <div className="container mx-auto py-12 px-4 sm:flex items-center justify-between">
        <div className="sm:w-1/2">
          <p className="text-xl sm:text-xl text-black font-semibold mb-4">
            Have you tried the <span className="text-white">DogSwag Organizer?</span>
          </p>
          <p className="text-lg sm:text-md text-white mb-4">
            {`"Set, Reminder, Track and Analyze your dog's daily schedule and behavior patterns."`}
          </p>
          <h1 className="text-3xl sm:text-2xl text-black font-bold mb-4">JOIN</h1>
          <div className="flex items-center">
            <p className="text-xl text-white font-bold mr-4">Try our</p>
            <button className="px-6 py-2 text-xl font-bold bg-white text-purple-600 rounded-full border-none shadow-lg">
              Trial Pack Today
            </button>
          </div>
        </div>
        <div className="sm:w-1/2 sm:flex justify-end">
          <img className="w-full hidden md:block h-60 w-60 object-cover" src="/assets/img/puppy.png" alt="" />
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Banner;
