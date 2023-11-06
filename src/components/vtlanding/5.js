export default function App(){
	return(
		  <div className="py-20 font-Jumper flex flex-col items-center gap-5 text-center max-w-5xl mx-auto">
		  	<div className="text-3xl md:text-5xl">Are you on the invite list?</div>
		  	<div className="max-w-sm font-Inter"><input placeholder={"Enter your email"} className="p-2 border  border-gray-500 rounded-xl"/></div>
		  	<div className=" font-Inter"><button className="p-2 bg-black w-32 rounded-xl text-white">Send Invite</button></div>
		  </div>
		)
}