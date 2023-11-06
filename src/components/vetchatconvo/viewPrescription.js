import axios from 'axios'
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
// import { jsPDF } from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export default function ViewPrescription(){
  
  const [prescList,setPrescList] = useState([])
  const router = useRouter()
  const {id} = router.query
  const [loading,setLoading]=useState(true)

  async function getPrescription(){
   setLoading(true)
   try{
      await axios.get(`/api/prescription/all/${id}`).then(res=>{
         console.log(res.data.Prescriptions)
         setPrescList(res.data.Prescriptions)
         setLoading(false)
      })
   }catch(e){
      console.log(e)
      setLoading(true)
   }
   
  } 


  useEffect(()=>{
     getPrescription()
  },[])
    // chatId,reason,name,noofdrug,nooftime,noofdays,meal
  if(loading){
    return(
        <div className="h-96 flex justify-center items-center">
         <div className="mt-5">
           <img src="/gif/spinner.svg" className="w-10 h-10"/>
         </div>
        </div>
      )
  }

  function Save(){
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const documentDefinition = {
    content: [
      {
        layout: 'fullWidth', // Set the layout to fullWidth
        table: {
          widths: ['*', '*', '*', '*', '*', '*'],
          headerRows: 1,
          body: [
           [
              { text: 'Reason', bold: true }, // Make 'Reason' bold
              { text: 'Name', bold: true }, // Make 'Name' bold
              { text: 'No. of Drug', bold: true }, // Make 'No. of Drug' bold
              { text: 'No. of Time', bold: true }, // Make 'No. of Time' bold
              { text: 'No. of Days', bold: true }, // Make 'No. of Days' bold
              { text: 'Meal', bold: true }, // Make 'Meal' bold
            ],
            ...prescList.map(item => [
              
              item.reason,
              item.name,
              item.noofdrug,
              item.nooftime,
              item.noofdays,
              item.meal,
              
            ])
          ]
        }
      }
    ]
  };

  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  pdfDocGenerator.download('data.pdf');
  }

  console.log(prescList)

  // return null

   return(
      <div>
		<div className="h-96 flex flex-col gap-4 w-full overflow-scroll text-sm">
             {/*No Prescription !!*/}
            <h1 className="py-2 border-b-2 w-[330px] fixed bg-white hidden md:block">Prescription</h1>
            <div className="flex w-full justify-between md:mt-12">
               <h1></h1>
               <span className="text-gray-500">Previous</span>
            </div>
            {
               prescList[0]?.prescriptions?.map((p,i)=>{
                  return(
                       <div key={p._id} className="flex gap-4 border-b-2 py-2">
                           <div>
                               <img src="/pill.svg"/>
                           </div>
                           <div className="w-full flex flex-col gap-1">
                              <h3 className="text-sm text-gray-500">Drug</h3>
                              <h1 className="text-lg">{p.name}</h1>
                              <div className="grid grid-cols-3 text-sm text-gray-500">
                                 <p className="border-r-2"><span className="text-black ">{p.noofdrug}</span> to be taken</p>
                                 <p className="border-r-2 text-center"><span className="text-black ">{p.nooftime}</span> times daily</p>
                                 <p className="border-r-2 text-center">for <span className="text-black ">{p.noofdays}</span> days</p>
                              </div>
                              <p className="text-sm font-semibold">{p.meal} meal</p>
                           </div>
                        </div>
                     )
               })
            }
         </div> 
           <div className='flex justify-between'>
           <div>
              <span className="text-sm text-gray-500">15-07-23</span>
           </div>
           <div onClick={Save} className='flex gap-2 cursor-pointer'>
              <span className='font-semibold'>PDF</span>
              <img src="/download.svg" className="w-5 h-5"/>
           </div>
           </div>
          </div>
		)
}