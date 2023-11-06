import React from 'react'

export default function Index({
                              handleCurrentDogInfo,
                              handleDogInfo,
                              dogInfo,
                              addDogProfile,
                              deleteDog,
                              selectedDog,
                              setSelectedDog,
                              isEditingDog,
                              setIsEditingDog,
                              currentDogInfo,
                              setCurrentDogInfo,
                              saveCurrentDogInfo,
                              dogList,
                              loading,
                              showReason
                            }) {

  return (
        isEditingDog ?
                <div className="flex flex-col gap-2 w-full">
                   <input onChange={handleDogInfo} value={dogInfo?.name} name={"name"}  placeholder="Name" className="p-2 border border-gray-300 rounded-md"/>
                   <input onChange={handleDogInfo} value={dogInfo?.breed} name={"breed"}  placeholder="Breed" className="p-2 border border-gray-300 rounded-md"/>
                   <input onChange={handleDogInfo} value={dogInfo?.weight} name={"weight"}  placeholder="Weight" className="p-2 border border-gray-300 rounded-md"/>
                   <input onChange={handleDogInfo} value={dogInfo?.age} name={"age"}  placeholder="Age" className="p-2 border border-gray-300 rounded-md"/>
                   {
                     showReason ? 
                     <select onChange={handleDogInfo}  name={"reason"} className="p-2 border border-gray-300 rounded-md">
                   <option>Consultation</option>
                   <option>Surgery</option>
                   <option>General</option>
                   <option>Vaccination</option>
                   <option>Follow up</option>
                   </select>
                   :
                   <></>
                   }
                   
                   <div>
                     <button  onClick={()=>addDogProfile()} className="p-2 bg-yellow-500 rounded-xl">Add dog</button>
                   </div>
                </div>
        :

             <div className="p-3 flex flex-col gap-2">           
                <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full flex flex-row gap-2 md:flex-col md:w-3/12">
                   <img src="/assets/img/puppy.png" className="w-32 h-32 rounded-lg border border-gray-300"/>
                   <div className="w-full flex flex-col gap-2">
                     {
                      dogList?.map((d,i)=>{
                        return(
                             <div key={i} className={` ${selectedDog === i ? "bg-gray-300": ""} flex justify-between w-full h-full gap-4 items-center cursor-pointer border border-gray-300 rounded-md p-2 w-2/12`}>
                                <div onClick={()=>{setCurrentDogInfo(d),setSelectedDog(i)}} className="flex items-center gap-2 w-8/12">
                                <img src="/assets/img/puppy.png" className="w-8 h-8 rounded-lg"/>
                                <p className="truncate">{d.name}</p>
                                </div>
                                <div onClick={()=>deleteDog(d._id)} className="hover:opacity-50 w-2/12">
                                  <img src="/assets/icons/cross.svg" className="w-4"/>
                                </div>
                             </div>
                          )
                      })
                     
                     }
                     <button disabled={dogList?.length > 0} onClick={()=>setIsEditingDog(true)} className={`${dogList?.length > 0 ? "opacity-50":""} p-2 flex justify-center items-center gap-2 text-xs bg-blue-500 text-white rounded-lg`}>
                      Add <img  src="/assets/icons/plus.svg" className="w-5 invert"/>
                     </button>
                   </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-9/12">
                   <input onChange={handleCurrentDogInfo}name={"name"} value={currentDogInfo?.name}placeholder="Name" className="p-2 border border-gray-300 rounded-md" />
                   <input onChange={handleCurrentDogInfo} name={"breed"} value={currentDogInfo?.breed} placeholder="Breed" className="p-2 border border-gray-300 rounded-md" />
                   <input onChange={handleCurrentDogInfo} name={"weight"} value={currentDogInfo?.weight} placeholder="Weight" className="p-2 border border-gray-300 rounded-md" />
                   <input onChange={handleCurrentDogInfo} name={"age"}  value={currentDogInfo?.age} placeholder="Age" className="p-2 border border-gray-300 rounded-md" />
                   <select onChange={handleCurrentDogInfo} name={"reason"} className="p-2 border border-gray-300 rounded-md" >
                   <option selected={currentDogInfo?.reason=='Consultation'? true : false}>Consultation</option>
                   <option selected={currentDogInfo?.reason=='Surgery'? true : false}>Surgery</option>
                   <option selected={currentDogInfo?.reason=='General'? true : false}>General</option>
                   <option selected={currentDogInfo?.reason=='Vaccination'? true : false}>Vaccination</option>
                   <option selected={currentDogInfo?.reason=='Follow up'? true : false}>Follow up</option>
                   </select>
                   <div className="flex justify-end">
                   <button disabled={loading} onClick={()=>saveCurrentDogInfo(currentDogInfo?._id)} className={`p-2 flex w-32 justify-center items-center gap-2 text-xs bg-blue-500 text-white ${loading?"opacity-70":""} rounded-lg`}>Save</button>
                   </div>
                </div>

                </div>                  
                {/*<button className="p-2 bg-amber-500 w-40" onClick={Confirm}>Confirm</button>*/}
              </div>
  )
}



const conditions = [
      "Allergy",
      "Abdominal pain",
      "Atopy",
      "Anaphylactic reaction",
      "Anal gland impaction (Adenitis)",
      "Arthritis",
      "Anemia",
      "Alopecia",
      "Breathing distress",
      "Bellowing/belching",
      "Bleeding (urine/poop/nose/mouth)",
      "Coughing",
      "Cataract",
      "Corneal ulcer",
      "Crying",
      "Chocolate toxicity",
      "Conjunctivitis",
      "Coprophagy",
      "Cardiac affections",
      "Cystitits",
      "Diarhhoea",
      "Dysentery",
      "Drooling",
      "Dog bite",
      "Dermatitis",
      "Demodecosis",
      "Eczema",
      "Eclampsia",
      "Ear infection",
      "Eye infection",
      "Epilepsy",
      "Frothing",
      "Flea infestation",
      "Fracture",
      "Gagging",
      "Gingivitis",
      "Grape ingestion",
      "Halitosis",
      "Humping excessively",
      "Head shaking",
      "Haematoma",
      "Hip dysplasia",
      "Heat cycle",
      "Hematemesis",
      "Hematuria",
      "Hematochezia",
      "Hygroma",
      "Injury",
      "Inappetance",
      "Infection",
      "Itching",
      "Jaw champing",
      "Jaundice",
      "Knuckling on legs",
      "Knee pain",
      "Kidney stones/infection",
      "Limping",
      "Lung infection",
      "Lack of appetite",
      "Lethargy",
      "Leptospirosis",
      "Mastitis",
      "Maggot wound",
      "Mite infection",
      "Mycoplasma infection",
      "Mammary gland swelling",
      "Nasal discharge",
      "Nasal bleeding",
      "Oral papilloma",
      "Ocular bleeding",
      "Penile infection",
      "Pustular dermatitis",
      "Podo dermatitis",
      "Pseudopregnancy",
      "Pruritus",
      "Parasites",
      "Pneumonia",
      "Pyometra",
      "Poisoning",
      "Respiratory infection",
      "Restlessness",
      "Ringworm",
      "Retching",
      "Rickets",
      "Sneezing",
      "Seizures",
      "Spondylitis",
      "Scrotal infection",
      "Tick infestation",
      "Tick fever",
      "Tilting of head",
      "Tumor mass",
      "Toxicity",
      "Uveitis",
      "Ulceration",
      "Urinary incontinence",
      "Vomiting",
      "Viral infection",
      "Vaccination",
      "Wheezing",
      "Wobbly gait",
      "Xerophthalmia",
      "Yeast infection",
      "Zoonotic diseases",
];
