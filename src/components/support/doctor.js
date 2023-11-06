import React, { useState } from 'react';


const SupportPage = () => {
  const DocDetails = [
  {
    id:1,
    name:'Dr Devyani',
    desc:'My name is Dr. Devyani Panicker, born and brought in Mumbai, Maharashtra. I have always been passionate and loved knowing about animals. I still remember how I decided to be a Vet as I was watching the famous Steve Irwin show “croc files” it gave me an adrenaline rush about the fact that how he was not afraid to confront these animals and he could manage his fear so well as if he laughed on the face of fear. He gave me courage to make a decision about how is it okay to be different and weird in my own way. He made me realise how extraordinary animals are and if I learn this knowledge and skill it will help so many of these amazing animals and at some minute level I can make a change in this world. So that’s how I chose my career path to be a Veterinarian finished my graduation from Bombay Veterinary College in 2014. Immediately after that I decided to do my Masters in Veterinary Pharmacology and Toxicology from Kerala Veterinary College, Pookode, Kerala which i completed in 2018. I joined Bangalore Pet hospital since 2019 as a Veterinary Practitioner and continuing my practice and trying to make changes in small simple ways so that I can live and fulfill my dreams.',
    img:'/assets/img/doc4.jpeg'
  },
  {
    id:2,
    name:'Dr Riya',
    desc:'Hi I am Dr Riya Ashok Bakde. I have done my graduation from Bombay veterinary college (2012 batch). Post my undergrad, I have completed my MASTERS IN PREVENTIVE MEDICINE from KERALA. (2017 batch). Immediately after my masters I joined Wildlife sos Bannerghatta bear rescue Center in Bengaluru where I was handling the management and care of Sloth bears. During the Covid pandemic, I joined Bangalore pet hospital in July 2020. Since then I have been working with canines and felines and have strived to give the best pet care to these furry ones.',
    img:'/assets/img/doc2.jpeg'
  },
  ]

  return (
    <div class="flex flex-wrap items-center justify-center py-5 gap-5">
      {
        DocDetails.map((m,i)=>{
          return (
      <div key={i} class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div class="h-96 w-72">
          <img class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={m.img} alt="" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div class="absolute inset-0 flex translate-y-[60%] flex-col px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <h1 class="font-dmserif text-3xl font-bold text-white">{m.name}</h1>
          <p class="mb-3 text-xs italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 overflow-auto">{m.desc}</p>
          {/*<button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-amber-400 shadow shadow-black/60">Head manger of bengalore pet hospital</button>*/}
        </div>
      </div>
            )
        })
      }
    </div>  
  );
};

export default SupportPage;
         // <div className="p-2 max-w-sm border border-black h-96">
         //       <img className="w-72 object-cover" src={m.img}/>
         //       <h1 className="text-2xl">{m.name}</h1>
         //       <p className="text-xs">{m.desc}</p>
         //    </div>
         //    