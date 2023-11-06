// Modal component

import Link from "next/link";
import { useState } from "react";
import {Modal,useMantineTheme} from '@mantine/core'
const StartChatModal = ({ createChatRoom ,isModalOpen, setIsModalOpen ,handleReasonInput }) => {
    
    const theme = useMantineTheme();

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal by updating the state variable
    };

    const [text, setText] = useState('');

  
    return (
       <Modal 
   opened={isModalOpen}
   onClose={()=>setIsModalOpen(false)}
   size="xl"
   title="Dog Details"
>

                <div className="font-[Roboto]">
                    {/*{/*------------------------------------- heading div with close icon ------------------------------------- */}
                    

                    <div className="flex flex-col md:flex-row gap-5">

                        {/*------------------------------------- left side div------------------------------------- */}
                        <div className="md:w-4/12 flex flex-col gap-5">
                            <div className=" rounded-full flex flex-col items-center justify-center gap-2">
                                <img src="/doguser.png" className="w-20 h-20 rounded-full border bg-gray-300" alt="" />
                                <p className="text-black font-medium text-sm">Milo</p>
                            </div>
                            <div className="text-gray-500 text-sm grid grid-cols-2  justify-center items-center gap-2">
                                <p className="p-3 rounded-lg border border-gray-300 grid"> 
                                    <span>Gender :</span> 
                                    <span className="text-black">Male</span> 
                                </p>
                                <p className="p-3 rounded-lg border border-gray-300 grid"> 
                                      <span>Age : </span>
                                      <span className="text-black">6</span> </p>
                                <p className="p-3 rounded-lg border border-gray-300 grid"> 
                                      <span>Weight :</span> 
                                      <span className="text-black">10Kg</span> </p>
                                <p className="p-3 rounded-lg border border-gray-300 grid">
                                       <span>Breed : </span>
                                       <span className="text-black">German</span>
                                 </p>
                            </div>
                            <div className="flex justify-center w-full">
                                   <button  className="border w-20 p-2 border-gray-300 rounded-xl">Edit</button>
                            </div>
                        </div>

                        {/*------------------------------------- right side div -------------------------------------*/}

                        <div className="md:w-8/12 flex flex-col gap-5">
                            <div className=" flex flex-col gap-2">
                                <p className="text-xs text-gray-500">Select A Reason</p>
                                <div class="relative w-full">
                                <select className="appearance-none w-full rounded-2xl py-2 pl-4 pr-10 w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="Vommiting" className="cursor-pointer p-2">Vommiting</option>
                                    <option value="Fever" className="cursor-pointer p-2 bg-gray-100">Fever</option>
                                    <option value="Headeche" className="cursor-pointer p-2 hover:bg-gray-200">Headache</option>
                                    <option value="option4" className="cursor-pointer p-2">Fracture</option>
                                </select>
                                 <div class="absolute inset-y-0 right-0 flex items-center  pointer-events-none">
                                   <svg class="w-10 h-7 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" clip-rule="evenodd" />
                               </svg>
                             </div>  
                             </div>  
                            </div>
                            <div className="text-xs text-gray-500 relative flex flex-col gap-2">
                                <p>
                                    Add a note
                                </p>
                                <textarea
                                    className="w-full p-3 text-sm h-52 border border-gray-300 rounded-2xl"
                                    maxLength={280}
                                    // value={text}
                                    onChange={handleReasonInput}
                                ></textarea>
                                <div 
                                className="absolute top-8 right-3">
                                    {text.length}/{280}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-end mt-8 items-center ml-auto gap-4 text-sm text-gray-500">
                             <p>
                                You will be charged 1 chat credit
                            </p>
                        <button onClick={createChatRoom} className="bg-yellow-500 text-white p-5 text-sm rounded-lg hover:bg-yellow-600">Agree & Continue</button>
                    </div>
                </div>
            </Modal>
        )

};

export default StartChatModal

  // VetChatDoctorsProfile component

