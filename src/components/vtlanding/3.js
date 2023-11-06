const FreePack =()=>{
return(
<div className="bg-[#FFCB07] font-Jumper py-20">
   <div className="max-w-5xl mx-auto text-3xl md:text-5xl font-bold text-center">
    <h4 className="tracking-widest">FREE FOR THE FIRST <br/>
    <span className="font-poppins font-black text-white">
     {` 10,000 `}
    </span>
     PEOPLE
    </h4>
    </div>

<div className="flex flex-col gap-5 mt-8 mx-auto max-w-5xl font-thin text-white p-5">
    <div className="flex flex-col md:flex-row justify-center gap-5">
    <button className="p-2 text-white text-2xl border rounded-xl">Tons of free giveway</button>
    <button className="p-2 text-white text-2xl border rounded-xl">FUN TASK</button>
    <button className="p-2 text-white text-2xl border rounded-xl">SPECIAL DISCOUNT</button>
    </div>
    <div className="flex flex-col md:flex-row justify-center gap-5">
    <button className="p-2 text-white text-2xl border rounded-xl">COMMUNITY CONNECT</button>
    <button className="p-2 text-white text-2xl border rounded-xl">winners get goodie bags every week</button>
    <button className="p-2 text-white text-2xl border rounded-xl">FREE CREDITS</button>
    </div>
</div>
</div>
)
}

export default FreePack