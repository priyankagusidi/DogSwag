import {useState} from 'react'
import {faqArray} from './faq'

export default function Faq(){
 const [TabIndex,setTabIndex] = useState("about")
//  const [FaqCategory,setFaqCategory] = useState(about)
 const [FaqIndex,setFaqIndex] = useState(null)

 function setTab(category){
    setTabIndex(category)
    setFaqIndex(null)
    if(category === "about"){
        setFaqCategory(about)
    }else if(category === "monetization") {
        setFaqCategory(monetization)
    }else if (category === "writingablog") {
        setFaqCategory(writingblog)
    }else if (category=== "advertise") {
        setFaqCategory(advertise)
    }else {
       setFaqCategory(technical)
    }
 
 }

 function show(index) {

    setFaqIndex(index === FaqIndex ? null : index)
 }
  

    return(
        <div className="m-5 font-[poppins]">
          <section className="bg-white  max-w-6xl mx-auto  rounded-md shadow ">
    <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl">Have any Questions?</h1>

        <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
            

            <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
               

                {
                   faqArray.map((m,i)=>{
                        return (
                                <div className="" key={i}>
                                <button className="flex text-start" onClick={()=>show(i)}>
                                  {
                                    FaqIndex === i ? 
                                       <svg className="flex-shrink-0 w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>                               
                                    :
                                     <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                      </svg>
                                }
                                  {/*<h1 className=" text-sm md:text-lg text-gray-700">{m.question}</h1>*/}
                                <p className="max-w-3xl text-sm md:text-lg px-4 text-gray-500 ">{m.question}</p>

                                </button>
                           {
                        FaqIndex === i ?
                            <div className="flex mt-4">
                                <span className="border border-amber-800"></span>

                                <p className="max-w-3xl text-xs md:text-sm px-4 text-gray-500 ">
                                {m.answer}
                                </p>

                            </div>:
                            <></>
                           }
                          <hr className="my-8 border-gray-200"/>

                        </div>
                            )
                    })
                
                }
               

            </div>
        </div>
    </div>
</section>
</div>
        )
}


