import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Add from './add'
import View from './view'

export default function Prescription({sessionID,handleIsPrescribed,chatID}) {
    const router = useRouter()
    const [info, setInfo] = useState({reason:"", name:"", noofdrug:1, nooftime:1, noofdays:1, meal:"before"})
    
    const [presList,setPresList] = useState([])
    const [selectedTab,setSelectedTab] = useState(0)
    
    const tabs = [
        {
            name:"View",
            comp:<View chatID={chatID} />
        },
        {
            name:"Add",
            comp:<Add handleIsPrescribed={handleIsPrescribed} sessionID={sessionID}  />
        },
        ] 


    return (
     
        <div className="h-96 flex flex-col gap-2 text-sm ">
            <div className="flex flex-wrap gap-1">
              {
                tabs.map((m,i)=>{
                    return(
                        <button key={i} onClick={()=>setSelectedTab(i)} className={`px-2 py-1 ${ selectedTab === i ? "bg-yellow-500 text-white" :"border border-yellow-500"} rounded-md `}>{m.name}</button>
                        )
                })
              }
            </div>
             {tabs[selectedTab].comp}
          </div>
    )
}