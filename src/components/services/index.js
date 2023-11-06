import Link from "next/link"

const Services = ()=>{
    return (    
<div className="flex flex-col w-full max-w-7xl mx-auto p-5">
    
    <div className="my-10">
      <h1 className="font-Jumper  text-4xl text-center">Our Services</h1>
      <p className='font-Inter mt-2 text-center text-gray-500 font-bold'>Comprehensive Services Tailored to Your Dogs Every Need</p>
    </div>

<div className="flex flex-col lg:flex-row gap-10 w-full">

<div className="relative h-[400px] lg:h-[500px] w-full lg:w-8/12 bg-[#FECA38] rounded-xl">

<div className="p-10 z-50 text-white">
    <h3 className="z-50 font-Jumper text-md lg:text-3xl">Blogs</h3>
     <p className="z-50 font-Inter font-bold text-sm lg:text-lg">{`MicroBlog, Write, Share, and Earn. Share your knowledge, stories, `}<br/>{`training tips, tricks, food recipes for dogs.`}</p>
</div>
<Link href="/blog">
<button id={"landing_blog_button_clicked"} className="bg-white z-50 xs:block w-40 bottom-10 right-10 absolute p-5 text-black rounded-xl">Join Now</button>
</Link>
<img className="w-[250px] lg:w-[300px] z-10 h-[250px] lg:h-[300px] object-cover  md:right-96 lg:left-0 absolute  bottom-0 rounded-xl"  src="/organizerCardImage.png" alt="" />
</div>


<div className="relative h-[400px] lg:h-[500px] w-full lg:w-4/12 bg-[#DA6C84] rounded-xl">
<div className="p-10 z-50 text-white">
    <h3 className="z-50 font-Jumper text-md lg:text-3xl">{`Vet Chat`}</h3>
    <p className="z-50 font-Inter font-bold text-sm lg:text-lg">Connect with Professional Vets for  <br className="md:hidden block" />  Personalized  <br className="hidden md:block" /> Dog Care Guidance</p>
    
</div>
     <Link href="/vetchat/landing">
     <button  id={"landing_nrich_zone_button_clicked"}
     className="bg-white z-50 xs:block w-40 bottom-10 right-10 absolute p-5 text-black rounded-xl">
     Join Now
     </button>
     </Link>

<div className=""><img className="z-10 w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] object-cover absolute  bottom-0 rounded-xl" src="/vetTalkCardImage.png" alt="" />
</div>
</div>


</div>

    <div className="relative bg-[#54ABA2] h-[400px] lg:h-[500px] rounded-xl mt-10">

    <div className="p-10 z-50  text-white">
        <h3 className="font-Jumper text-md lg:text-3xl">Vet Chat</h3>
        <p className="font-Inter font-bold text-sm lg:text-lg z-50">Connect with Professional Vets for  <br className="md:hidden block" />  Personalized  <br className="hidden md:block" /> Dog Care Guidance</p>
    </div>
     <Link href="/vetchat/landing">
     <button  id={"landing_vetchat_button_clicked"}
     className="bg-white z-50 xs:block w-40 bottom-10 right-10 absolute p-5 text-black rounded-xl">
     Join Now
     </button>
     </Link>

    <div>
        <img className="z-10 w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] object-cover absolute md:right-96 bottom-0 rounded-xl" src="/vetChatCardImage.png" alt="" />
    </div>


</div>

</div>
    )
}

export default Services