import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import {nanoid} from 'nanoid'
import {Select} from '@mantine/core'

export default function Add({sessionID,handleIsPrescribed}) {
    const router = useRouter()
    const [info, setInfo] = useState({name:"", noofdrug:"", nooftime:"", noofdays:"", meal:"before"})
    const {id} = router.query
    const [presList,setPresList] = useState([])
    const [selectedTab,setSelectedTab] = useState(0)
    const [reason,setReason] = useState("Vomitting")
    const [loading,setLoading] = useState(false)
    const [sent,setSent] = useState("Send")
    const [qty,setQty] = useState(["1/2 spoon","Full Spoon", "1 Tablet", "2 Tablet",])
    const [dignostics,setDignostics] = useState("")
    const [paid,setPaid] = useState(false)


    async function add(){
    console.log(info)
    console.log(reason)
        if( !info.name || !info.noofdrug || !info.nooftime || !info.noofdays || !info.meal || !dignostics){
            alert("input missing field")
            return
        }
        setPresList([...presList,{...info,id:nanoid()}])
        setInfo({name:"", noofdrug:"", nooftime:"", noofdays:"", meal:"before",dignostics:""})
    }



    const handleChange = (e,mantineValue) => {

      if(mantineValue){
        setInfo((prevData) => ({ ...prevData, noofdrug: e }));
      }else{
        
        const { name, type, checked, value } = e.target;

        if (type === 'checkbox') {
            setPaid(checked)
        } else {
            setInfo((prevData) => ({ ...prevData, [name]: value }));
        }
      }
      


  };


    async function AddPrescription() {
        handleIsPrescribed()

        console.log(sessionID)

        if(!sessionID){
            alert("Start Session first! ")
            return
        }

        if(presList?.length < 1){
          alert("Add atleast one prescription")
          return
        }


        // const { reason, name, noofdrug, nooftime, noofdays, meal } = info
        setLoading(true)

        const data = { sessionID: sessionID,
          prescriptions:presList,
          reason:reason,
          dignostics:dignostics,
          paid:paid}
          console.log(data)

        try {
            await axios.put('/api/prescription/create', data).then(res=>{
              console.log(res.data)
              setLoading(false)
              setSent("Sent")
              setDignostics("")
              
               setTimeout(()=>{
                    setSent("Send")
               },5000)
            })
        } catch (e) {
            console.log(e);
            alert("Start Session first!")
            setLoading(false)
        }
    }


    function onDelete(id){
        const del = presList.filter((p,i)=>p.id !== id)
        setPresList(del)
    }


    return (
        <div>
        <div className="flex flex-col gap-2 text-xs h-80 overflow-y-auto ">
           
             <div className="flex flex-col gap-2">
             
               <div>
                   <select name="reason" value={reason} onChange={(e)=>setReason(e.target.value)} className="p-2 rounded-full border border-gray-300 w-full">
                    {
                      conditions.map((c,i)=>{
                        return(
                          <option key={i} value={c}>{c}</option>
                        )
                      })
                    }
                       
                      
                   </select>
               </div>

               <div>
               <textarea 
                    onChange={(e)=>setDignostics(e.target.value)}
                    value={dignostics}
                    name="dignostics"
                    className="p-2 rounded-xl border border-gray-300 w-full" placeholder="Dignostics"
                />
               </div>


               <div className="flex flex-col gap-2"> 
                   <input onChange={handleChange}
                      value={info.name}
                    name="name"
                    className="p-2 rounded-full border border-gray-300 w-full" placeholder="Name of drug"/>
                </div>
              
              <div className="flex gap-4">
               {/*<input onChange={handleChange}
                  value={info.noofdrug}
                  type="number"
                  name="noofdrug" className="p-2 rounded-full border border-gray-300 w-24" placeholder="No of drugs to be taken"
                />*/}
               <Select
                  searchable
                  nothingFound="No options"
                  data={qty}
                  creatable
                  value={info.noofdrug}
                  onChange={(e)=>handleChange(e,"qty")}
                  radius={"xl"}
                  placeholder={"No of drug"}
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query };
                    setQty((current) => [...current, item]);
                    return item;
                  }}
               />

               
               <input onChange={handleChange}
                  value={info.nooftime}
                  type="number"
                  name="nooftime" className="p-2 rounded-full border border-gray-300 w-24" placeholder="No of times daily"/>
               <input onChange={handleChange}
                  value={info.noofdays}
                  type="number"
                  name="noofdays" className="p-2 rounded-full border border-gray-300 w-24" placeholder="No of days to be taken"/>
              </div>
             

             </div>
               <div className="flex gap-2 py-2">
                 <div className="flex gap-2 items-center">
                   <input onChange={handleChange}
                      value={"before"}
                      checked={info.meal === "before"}
                      id="b_meal" name="meal" type="radio"/>
                   <label htmlFor="b_meal">Before every meal</label>
                 </div>
                 <div className="flex gap-2 items-center">
                   <input onChange={handleChange}
                      value={"after"}
                      checked={info.meal === "after"}
                      id="a_meal" name="meal" type="radio"/>
                   <label htmlFor="a_meal">After every meal</label>
                 </div>
               </div>
               <label className='flex gap-2 items-center'>
                             <input name="paid" onChange={handleChange} className='' type='checkbox'/>
                             paid
                </label>
              <div className="flex justify-center items-center">
               <img onClick={add} src="/add.svg" className="w-7 cursor-pointer"/>
              </div>
              
               <div>

               <div className="grid grid-cols-12 w-full bg-yellow-500 rounded-lg mt-3">
                    <div className="text-xs col-span-4 font-bold">name</div>
                    <div className="text-xs col-span-1 font-bold">no</div>
                    <div className="text-xs col-span-1 font-bold">time</div>
                    <div className="text-xs col-span-1 font-bold">days</div>
                    <div className="text-xs col-span-3 font-bold">meal</div>
                    <div className="text-xs col-span-2 font-bold">Del</div>
               </div>
               
               <div className="w-80 h-28 overflow-auto overflow-x-auto flex flex-col gap-1 mt-2">
               {

                  presList.map((m,i)=>{
                    return(
                          <div key={i} className="grid grid-cols-12 w-full bg-gray-100">
                             <span className="text-semibold col-span-4">{m.name}</span>
                             <span className="text-semibold col-span-1">{m.noofdrug}</span>
                             <span className="text-semibold col-span-1">{m.nooftime}</span>
                             <span className="text-semibold col-span-1">{m.noofdays}</span>
                             <span className="text-semibold col-span-3">{m.meal}</span>
                             <span className="text-xs col-span-2 font-bold"><img src="/assets/icons/trash.svg" onClick={()=>onDelete(m.id)} className="w-3"/></span>
                          </div>
                        )
                  })
               }
               </div>
                
               </div>
          </div>
          <div className="flex justify-center mt-2">
                <button onClick={AddPrescription} className={`${loading ?"bg-yellow-200" : sent === "Sent" ? "bg-green-500":"bg-yellow-500"} px-2 py-1 rounded-lg text-white`}> {sent} </button>
               </div>
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