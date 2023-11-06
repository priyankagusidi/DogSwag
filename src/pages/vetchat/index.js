import SideNavbar from '@/components/sidenavbar';
import MobileNavBar from '@/components/mobilenav';
import VetChat from '@/components/vetchat';
import React from 'react';
import {m_title,m_description} from '@/meta/index'
import Head from 'next/head'
const index = (props) => {

  return (
      <div className="flex  w-full min-h-screen font-Inter">
      <Head>
          <title>DogSwag - For every dogs swag, Blog about dogs, share and get paid</title>
           
            <meta name="description" content={m_description} key="desc" />
            <meta property="og:title" content={m_title}/>
            <meta property="og:description" content={m_description}/>
            <link rel="icon" href="/img/logo.png" />
            <meta property="og:url" content="https://dogswag.club/"/>
            <meta property="og:type" content="Blogging website"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <meta charSet="utf-8"></meta>
            <meta name="google-site-verification" content="Hv9JsVd4FGvDsHikaGYqshKLHZA4ji-CVZh3oq58GJU" />
            <link rel="canonical" href="https://dogswag.club/" key="canonical"/>
            <meta property="og:image" content="/img/logo.png"/>
            <meta name="keywords" content="Dog blogs, Canine experiences, Dog owners community, Dog lovers forum, Dogswag blogs, Pet blogs, Canine stories, Dogswag experiences, Pawsome stories, Dog blog community, Dogswag forum, Share your dog experiences, Best dog blogs, Dogswag writers, Canine bloggers, PetBlogPay, PawsWrite, BarkEarn, FurryWords, WoofWage, CanineCoin, TailTalesPay, BlogBark, PetProsePay, InvitePaw, Pet Blogging Platform - An exclusive invite-only platform where pet parents and experienced bloggers can share their knowledge and expertise about dogs, their behavior, health, diet, and training techniques Pay Per Minute - A unique earning opportunity for pet bloggers who will be paid by the minute for every user read time. The more readers engage with your content, the more you earn, Focused on Canines - This platform is exclusively focused on dogs, allowing bloggers and pet parents to share their experiences, advice, and expertise about their furry companions, Educational and Engaging - Our platform is dedicated to providing high-quality content that is both educational and engaging. Pet parents can find answers to their questions, while bloggers can share their expertise and earn money, Community-Driven - Our platform is a community-driven space where pet bloggers and parents can interact, share ideas, and support each other in their pet-related endeavors, Vetted Members - All members of our platform are vetted to ensure that the content shared is authentic, reliable, and useful for our readers. This way, we maintain the quality of our platform and uphold the trust of our readers, Growing Network - Our platform is constantly expanding, bringing together pet lovers and experts from all around the world. As we grow, we continue to provide new opportunities for bloggers to earn money by sharing their knowledge about dogs, Personalized Experience - Our platform provides a personalized experience for both readers and bloggers. Readers can find content tailored to their specific needs and interests, while bloggers can target specific audiences and earn more money, User-Friendly Interface - Our platform is easy to use, with a simple and intuitive interface that allows bloggers to focus on creating quality content and earning money, write blog and earn money" />
      </Head>
        <div className="relative md:w-2/12 border-r border-gray-300">
          <div className="hidden md:block">
            <SideNavbar/>
          </div>
        </div>
        <div className="w-full h-full md:w-10/12 flex flex-col relative">
              <VetChat userdata={props.userdata} />
        </div>
        <div className="block md:hidden">
           <MobileNavBar/>
        </div>
      </div>
  );
};

export default index;


export async function getServerSideProps({req,params}) {

try{
     const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.PROD_URI }`
     const res = await fetch(`${url}/api/auth/login/success`, {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
    });
     const userdata = await res.json()
     
    if(!userdata.user){
        return {
          redirect: {
            permanent: false,
            destination: `/vetchatlogin`,
          }
        }
    }




     return {
        props : {userdata}
     }

       }catch(err){
         return {
           props : {error:true,status:503}
        }
    }
    
    

}
