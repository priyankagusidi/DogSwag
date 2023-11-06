// Modal component
import DogList from '@/components/doglist'

import Link from "next/link";
import { useState } from "react";
import {Modal,useMantineTheme,Select,Stepper} from '@mantine/core'
import DogInfo from '@/components/dogprofile'
const StartChatModal = ({
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
    isConnecting,dogdata, createChatRoom ,isModalOpen, setIsModalOpen ,reason,handleReasonInput ,handleSelectReason}) => {
    // console.log(info)
    

    const theme = useMantineTheme();

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal by updating the state variable
    };

    const [text, setText] = useState('');
    const [conditionsList,setConditionList] = useState(conditions)
    const [active, setActive] = useState(0);

    const nextStep = () => {

        if(active == 0 && dogList?.length <1){
            alert('Add your dog info')
            return
        }
  
    
  
        setActive((current) => (current < 4 ? current + 1 : current));
    }

   
    return (
       <Modal 
           opened={isModalOpen}
           onClose={()=>setIsModalOpen(false)}
           size="xl"
           title="Dog Details"
        >
 {
                        isConnecting ?
                        <div
                         className="h-96 flex justify-center items-center text-gray-500 font-semibold"
                        >
                        Connecting you to the vet in 5 sec
                        </div>
                        :
                        <div>

<Stepper  size="xs" active={active} onStepClick={setActive}>
                          

                          <Stepper.Step>
                           <DogList handleDogInfo={handleDogInfo}
                                    dogInfo={dogInfo}
                                    addDogProfile={addDogProfile}
                                    deleteDog={deleteDog}
                                    selectedDog={selectedDog}
                                    setSelectedDog={setSelectedDog}
                                    isEditingDog={isEditingDog}
                                    setIsEditingDog={setIsEditingDog}
                                    currentDogInfo={currentDogInfo}
                                    setCurrentDogInfo={setCurrentDogInfo}
                                    saveCurrentDogInfo={saveCurrentDogInfo}
                                    dogList={dogList}
                                    loading={loading}
                                    handleCurrentDogInfo={handleCurrentDogInfo}
                                    showReason={false}
                            />
                           </Stepper.Step>
                           
                          
                           <Stepper.Step>
                               <div className="font-[Roboto]">
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="w-full flex flex-col gap-5">
                                        <div className=" flex flex-col gap-2">
                                            <p className="text-xs text-gray-500">Select A Reason</p>
                                            <div class="relative w-full">
                                            <Select
                                                searchable
                                                nothingFound="No options"
                                                data={conditionsList}
                                                creatable
                                                onChange={handleSelectReason}
                                                getCreateLabel={(query) => `+ Create ${query}`}
                                                onCreate={(query) => {
                                                    const item = { value: query, label: query };
                                                    setConditionList((current) => [...current, item]);
                                                    return item;
                                                }}
                                            />
                                        </div>  
                                        </div>
                                    <div className="text-xs text-gray-500 relative flex flex-col gap-2">
                                        <p>
                                            Add a note
                                        </p>
                                        <textarea
                                            className="w-full p-3 text-sm h-32 md:h-52 border border-gray-300 rounded-2xl"
                                            maxLength={280}
                                            value={reason}
                                            onChange={handleReasonInput}
                                        ></textarea>
                                        <div 
                                        className="absolute top-8 right-3">
                                            {reason?.length}/{280}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-end mt-8 items-center ml-auto gap-4 text-sm text-gray-500">
                                        {/* <p>
                                        You will be charged 1 chat credit
                                    </p> */}
                                <button onClick={createChatRoom} className="bg-yellow-500 text-white p-5 text-sm rounded-lg hover:bg-yellow-600">Agree & Continue</button>
                            </div>
                        </div>
                           </Stepper.Step>
                           
                        </Stepper>

                        
                            {
                            active < 1 &&
                            <button className="p-2 bg-yellow-500 w-32" onClick={nextStep}>Next</button>  
                           }
                        </div>
                       
               
            }
            </Modal>
        )

};

export default StartChatModal

  // VetChatDoctorsProfile component

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

  