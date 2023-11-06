import Link from "next/link"

const QuickLinks =()=>{
    return (
        <div className="flex items-center justify-center gap-8 mx-auto mt-12 max-w-5xl">

            <Link href="/vetchathome" className="bg-[#E0C96E]  p-10 flex rounded-lg justify-center items-center uppercase text-lg  lg:text-2xl text-black font-semibold font-Inter">Vet Chat</Link>
            <Link href="/vetchathome" className="bg-[#E0C96E] p-10 flex   rounded-lg justify-center items-center uppercase text-lg lg:text-2xl text-black font-semibold font-Inter">Orginizer</Link>
        </div>
    )
}

export default QuickLinks