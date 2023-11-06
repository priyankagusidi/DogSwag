import Link from "next/link"
import axios from 'axios'
import {useRouter} from 'next/router'

const Terms =()=>{
    
const router = useRouter()

 async function agree(){
        try {
            await axios.put('/api/user/agreevetchat',{
                credentials: 'include'
            }).then(res=>{
                console.log(res.data)
            })
        } catch(e) {
            console.log(e);
        }
     }  

    return (
   
        <div className="relative bg-white flex flex-col" >
        
        <div className="border border-gray-300 rounded-2xl p-5 mx-10 my-5">
        <h3 className="text-black text-4xl font-medium">{`Do's :`}</h3>
        <ul className="list-disc text-[#74747C] mt-8 font-medium list-inside">
            <li className="list-item">{`Do provide accurate and detailed information about your pets symptoms, behavior, and medical history when seeking advice from the veterinarian`}.</li>
            <li className="list-item">{` Do ask specific questions to get the most relevant information and guidance from the veterinarian`}.</li>
            <li className="list-item">{` Do provide updates to the veterinarian if there are any changes in your pets condition or if the initial advice does not show improvement`}.</li>
            <li className="list-item">{`Do ask for clarification if you don not understand something the veterinarian has recommended or explained`}.</li>
            <li className="list-item">{`Do respect the veterinarians expertise and follow their advice accordingly.`} </li>
            <li className="list-item">{` Do keep the conversation polite and professional, as you would with any healthcare professional`}.</li>
            <li className="list-item">{` Do keep the conversation polite and professional, as you would with any healthcare professional`}.</li>
            <li className="list-item">{`Do use the chat service for non-emergency situations and general queries. In emergencies or urgent cases, contact a local veterinarian or animal hospital.`} </li>
        </ul>
        </div>

        
        <div className="border border-gray-300 rounded-2xl p-5 mx-10 my-5">
        <h3 className="text-black text-4xl font-medium">{`Don'ts :`}</h3>
        <ul className="list-disc text-[#74747C] mt-8 font-medium list-inside">
        <li className="list-item">{`Don't use the chat service as a substitute for a physical examination by a veterinarian when necessary. Some conditions may require hands-on assessment and diagnostic tests.`} </li>
        <li className="list-item">{` Don't expect an immediate response at all times.Veterinarians may have other appointments or may need time to research and provide accurate information.`}</li>
        <li className="list-item">{`Don't provide false or misleading information about your pet's condition, as it can lead to inaccurate advice and potential harm to your pet. `}</li>
        <li className="list-item">{` Don't rely solely on the chat service for serious or life-threatening conditions. Seek immediate veterinary care in such cases.`}</li>
        <li className="list-item">{` Don't share personal or sensitive information unrelated to your pet's health with the veterinarian.`} </li>
        <li className="list-item"> {` Don't use the chat service for obtaining prescriptions or medication without proper examination and authorization from a licensed veterinarian.`}</li>
        
        </ul>
        </div>
        <div className='mx-10 my-10 mb-20 flex justify-end gap-4'>
               <button className="bg-slate-300 border-red-500 border-2 px-8  hover:border-red-50 border-b-amber-700 rounded-lg py-4">Cancel</button>     
               <button onClick={agree}  className="bg-[#E6B207] px-8 hover:bg-yellow-800 border-b-amber-700 rounded-lg py-4">Agree</button>
        </div>
        </div>

       
    )
}

export default Terms