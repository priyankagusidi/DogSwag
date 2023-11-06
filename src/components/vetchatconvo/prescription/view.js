import axios from 'axios'
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import PdfViewer from '@/components/pdf'
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment'
import { Modal } from '@mantine/core';

export default function ViewPrescription({chatID}){
  
  const [prescList,setPrescList] = useState([])
  const router = useRouter()
  const {id} = router.query
  const [loading,setLoading]=useState(true)
  const [presInd,setPresInd] = useState(0)
  const [openPdf,setOpenPdf] = useState(false)
  const [currentPresc,setCurrentPresc] = useState({})
  const [paymentModal,setPaymentModal] = useState(false)



//   console.log(chatID,id)
  async function getPrescription(){
   setLoading(true)

   

   try{

    if(chatID){
      await axios.get(`/api/prescription/all/${chatID}`).then(res=>{
         console.log(res.data.Prescriptions)
         setPrescList(res.data.Prescriptions)
         setLoading(false)
      })
   }else{
      setLoading(false)
     return
   }

   }catch(e){
      console.log(e)
      setLoading(true)
   }
   
  } 


  useEffect(()=>{
     getPrescription()
  },[chatID])
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

  // function Save(){
  // pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // const documentDefinition = {
  //   content: [
  //     {
  //       layout: 'fullWidth', // Set the layout to fullWidth
  //       table: {
  //         widths: ['*', '*', '*', '*', '*'],
  //         headerRows: 1,
  //         body: [
  //          [
  //              // Make 'Reason' bold
  //             { text: 'Name', bold: true }, // Make 'Name' bold
  //             { text: 'No. of Drug', bold: true }, // Make 'No. of Drug' bold
  //             { text: 'No. of Time', bold: true }, // Make 'No. of Time' bold
  //             { text: 'No. of Days', bold: true }, // Make 'No. of Days' bold
  //             { text: 'Meal', bold: true }, // Make 'Meal' bold
  //           ],
  //           ... prescList[presInd]?.prescriptions.map(item => [
              
  //             item.name,
  //             item.noofdrug,
  //             item.nooftime,
  //             item.noofdays,
  //             item.meal,
              
  //           ])
  //         ]
  //       }
  //     }
  //   ]
  // };

  // const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  // pdfDocGenerator.download('data.pdf');
  // }

  console.log(prescList)

  function handleIndex(type){

   //  console.log()

     if(type==="prev" && presInd < prescList.length-1){
        setPresInd(presInd+1)
      //   setCurrentPresc()
      //   setCurrentPresc(prescList[(prescList.length-1)- presInd]?.prescriptions)
        return
     }

     if(type==="next" && presInd > 1){
        setPresInd(presInd-1)
      //   setCurrentPresc(prescList[(prescList.length-1)- presInd]?.prescriptions)
        return
     }
  }

  if(prescList.length < 1){
    return(
           <div className="h-80 flex flex-col gap-4 w-full overflow-scroll items-center justify-center text-sm">
              No prescription yet!
           </div>
        )
  }


  const handlePayment = async (amount,currency,plantype,blogsCount,notificationsCount) => {

   // console.log(id,dogListData?._id,currentDate.add(dayIndex,'day').format("YYYY-MM-DD"),slot.start,slot.end,slotId,meetReason)
    
   // return
    try {
     const {data} = await axios.post('/api/billing/create',{
        amount:1, currency,paymentMethod:"payu",plantype:"prescription",credit:1,
      //   doctorId:id,dogId:dogListData?._id,date:currentDate.add(dayIndex,'day').format("YYYY-MM-DD"),start:slot.start,end:slot.end,slotId,reason:meetReason
     })

   //   setOpenSchedule(false)

     document.open(); 
     document.write(data); 
     document.close(); 
 
    } catch(e) {
    

    }
}


console.log(presInd,(prescList.length-1) - parseInt(presInd) ,"jje",prescList[(prescList.length-1)- presInd]?.prescriptions)

  function download(){
    if(prescList[prescList.length-1].nature === true){
      setPaymentModal(true)
      return
    }


    setOpenPdf(true)
    
  }
   return(
      <div>
           <PdfViewer openPdf={openPdf} setOpenPdf={setOpenPdf} dignostics={prescList[(prescList.length-1) - presInd]?.dignostics} prescriptions={prescList[(prescList.length-1)- presInd]?.prescriptions}/>

        <div className="h-80 flex flex-col gap-4 w-full overflow-scroll text-sm">
             {/*No Prescription !!*/}
            <h1 className="py-2 border-b-2 w-[330px] fixed bg-white hidden md:block">Prescription</h1>
            <div className="flex w-full justify-between md:mt-12">
               <button onClick={()=>handleIndex("prev")} className={`${presInd === prescList.length-1? "text-gray-500":"text-gray-900"}`}>Previous</button>
               <button onClick={()=>handleIndex("next")} className={`${presInd <= 0 ? "text-gray-500":"text-gray-900"}`}>Next</button>               
            </div>

            <div onClick={download} className='border shadow-sm'>
               <img src='/pdf.jpg' className='h-32 w-full object-cover object-top'/>
               <div className='p-5 font-semibold'>
                  <h2>prescription.pdf</h2>
               </div>
            </div>
            
            {/* {
               prescList[prescList.length-1 ]?.prescriptions.map((p,i)=>{
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
            } */}
         </div> 
           <div className='flex justify-between'>
           <div>
              <span className="text-sm text-gray-500">{moment(prescList[prescList.length-1]?.createdAt).format("MMM Do YY")}</span>
           </div>
           <div onClick={download} className='flex gap-2 cursor-pointer'>
              <span className='font-semibold'>PDF</span>
              <img src="/download.svg" className="w-5 h-5"/>
           </div>
           </div>

           <Modal
             opened={paymentModal}
             centered
             onClose={()=>setPaymentModal(false)}
             size={"sm"}
           >
            <h4 className='p-2 text-xl font-semibold text-center text-gray-700'>This is a chargeable prescription of Rs ₹ 200.</h4>
            <button className="rounded-lg bg-amber-500 text-white p-2 uppercase text-center w-full" onClick={()=>handlePayment(1,"INR","schedulecredit")}>Proceed to pay</button>
           </Modal>
          </div>
        )
}