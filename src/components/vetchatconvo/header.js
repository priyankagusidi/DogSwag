import {useRouter} from 'next/router'

export default function Header({setMenuActive,isMenuActive}){
    const router = useRouter()

    const {id}= router.query 

	return(  
    <div className="p-4 fixed bg-white w-full border-b border-gray-300 z-10">
           <div className="p-4 fixed bg-white w-full lg:w-10/12  border-b border-gray-300 flex justify-between z-50">
               <h3 className="text-lg font-semibold text-[#101010]">Sender naem</h3>
               <img src={isMenuActive ? '/close.svg': '/ham.svg'} className="w-5 block lg:hidden" onClick={()=>setMenuActive(!isMenuActive)}/>
            </div>      
    </div>
    
    )
}