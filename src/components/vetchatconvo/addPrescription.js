import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Add() {
    const router = useRouter()
    const [info, setInfo] = useState({reason:"", name:"", noofdrug:1, nooftime:1, noofdays:1, meal:"before"})
    const {id} = router.query
    const [presList,setPresList] = useState([])
    const [selectedTab,setSelectedTab] = useState(0)

    async function add(){
        setPresList([...presList,info])
    }

    const handleChange = (e) => {
            const { name, value } = e.target;
            setInfo((prevData) => ({ ...prevData, [name]: value }));
    };
    async function AddPrescription() {
       
        const { reason, name, noofdrug, nooftime, noofdays, meal } = info
        
        console.log(info)
        // return
        try {
            await axios.post('/api/prescription/create', {
                chatId: id,
                reason,
                name,
                noofdrug,
                nooftime,
                noofdays,
                meal
            }).then(res=>{
              console.log(res.data)
            })
        } catch (e) {
            // statements
            console.log(e);
        }
    }

    const tabs = [
    {
        name:"View"
    },
    {
        name:"Add"
    },
    ] 


    return (
     
        <div className="h-96 flex flex-col gap-2 text-sm">
           
             <div className="flex flex-col gap-2">
               <div className="flex flex-col gap-2">
                   <input onChange={handleChange}
                      value={info.reason}
                    name="reason"
                    className="p-2 rounded-full border border-gray-300 w-full" placeholder="Reason for prescription"/>
                   <input onChange={handleChange}
                      value={info.name}
                    name="name"
                    className="p-2 rounded-full border border-gray-300 w-full" placeholder="Name of drug"/>
                </div>
              
              <div className="flex gap-4">
               <input onChange={handleChange}
                  value={info.noofdrug}
                  type="number"
                  name="noofdrug" className="p-2 rounded-full border border-gray-300 w-24" placeholder="No of drugs to be taken"/>
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
               <div className="flex gap-2 justify-center">
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
               <img onClick={add} src="/add.svg" className="w-10 cursor-pointer"/>
               <div>
                <button className=""> Send </button>
               </div>
          </div>
    )
}