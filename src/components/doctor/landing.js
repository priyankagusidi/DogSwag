import {useRouter} from 'next/router'

const Vet = () => {
const router = useRouter()

    return (
        <div className=" bg-white">
        <div className="max-w-8xl mx-auto p-5">
            <h3 className="font-Jumper text-5xl font-bold text-center text-black">Connecting pet parents for doctors</h3>
            <button onClick={()=>router.push("/auth")} className="rounded-lg mx-auto  py-4 text-white px-8 mt-4 flex justify-center" style={{background: 'linear-gradient(0deg, #9747FF, #9747FF)'}} >Get Started</button>

            <div className="md:flex p-10 gap-2">
                <div className="w-full md:w-5/12 text-black">
                    <img className="w-[500px] md:h-[400px] object-cover" src={"/appoinment.png"} alt="" />
                    <button className="rounded-xl mx-auto text-white py-2 px-8 mt-4 flex justify-center" style={{background: 'linear-gradient(0deg, #9747FF, #9747FF)'}} >Appointment Booking</button>
                </div>
                <div className="w-full md:w-7/12 border-4 h-[400px] rounded-2xl md:mt-0 mt-4   border-yellow-500 px-4">
                <div className="flex flex-col my-16 gap-8">
                <ul className="flex flex-col gap-10 px-5">
                <li className=" text-xl md:text-3xl text-black font-medium font-Jumper list-disc">Priority slots listed by doctors   </li>
                <li className=" text-xl md:text-3xl text-black font-medium font-Jumper list-disc"> Pet parents book a slot   </li>
                <li className=" text-xl md:text-3xl text-black font-medium font-Jumper list-disc"> Make a payment only for booking an appointment </li>
                </ul>
                </div>
                </div>
            </div>

            <div className="md:flex p-10 gap-8 mt-8">
            <div className="border-4 h-[400px] rounded-2xl  border-yellow-500 px-4">
                <ul className="flex flex-col px-5 gap-10 my-16">
                <li className=" text-xl md:text-3xl text-black font-medium font-Jumper list-disc"> PET Parent reach out to vet  </li>
                <li className=" text-xl md:text-3xl text-black font-medium font-Jumper list-disc">  Chat with vets on real time</li>
                <li className=" text-xl md:text-3xl text-black font-medium font-Jumper list-disc">   Get emergency assistance & advise  </li>
                </ul>
                </div>
                <div>
                    <img  className="md:mt-0 mt-4 md:h-[400px] object-cover" src={"/chat.png"} alt="" />
                    <button className="rounded-xl mx-auto text-white py-2 px-8 mt-4 flex justify-center" style={{background: 'linear-gradient(0deg, #9747FF, #9747FF)'}} >Vet Chat</button>
                </div>
            </div>

            <div className="mt-8 mx-auto">
            <h3 className="font-Jumper text-4xl font-bold text-center text-black">{`What's in it for the clinic/vet?`}
            </h3> 
            <div className="grid md:grid-cols-2 p-10 gap-20 mx-auto md:ml-60 ml-[60px]">
                <div className="bg-[#9747FF] w-[200px] border-yellow-500 border-4 rounded-xl px-10 py-4 text-center">
                    <h4 className="font-Jumper text-xl font-bold text-center text-white">Helps to 
            organise  <br /> your  
            sechedule </h4>
                </div>
                <div className="bg-[#9747FF] w-[200px]  border-yellow-500 border-4 rounded-xl px-10 py-4 text-center">
                    <h4 className="font-Jumper text-xl font-bold text-center text-white">Generate <br />
            Additional  <br /> Revenue   </h4>
                </div>
            </div>
            <div className="bg-[#9747FF] w-[200px] mx-auto flex justify-center border-yellow-500 border-4 rounded-xl px-10 py-4 text-center">
                    <h4 className="font-Jumper text-xl font-bold text-center text-white">Provides emergency
            assistance & advice   </h4>
                </div>
            </div>
            <div className="mt-8">
            <h3 className="font-Jumper text-4xl font-bold text-center text-black">How can I register?</h3>
        <div className="md:flex gap-20 max-w-sm mx-auto">
             <button  onClick={()=>router.push("/auth")} className="rounded-lg w-32 border-gray-300 mx-auto text-black border-yellow-500 border-4 uppercase font-semibold  py-4 px-8 mt-4 flex justify-center hover:bg-[#9747FF]"  >Clinic</button>
             <button  onClick={()=>router.push("/auth")} className="rounded-lg w-32 border-gray-300 mx-auto text-black border-yellow-500 border-4 uppercase font-semibold  py-4 px-8 mt-4 flex justify-center hover:bg-[#9747FF]"  >Vet</button>
        </div>
            </div>
        </div>
        </div>
    );
};

export default Vet;