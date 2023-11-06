export default function Index(){
	return(
		  <div className="flex justify-center gap-2 rounded border bg-white h-screen pt-10">
		 
		  <div className="max-w-lg mt-20 flex flex-col gap-2">
		  	<h1 className="text-5xl font-semibold"> Write, Share, and Earn </h1> 
<p className="text-gray-500">{`
Share your knowledge, learnings, stories, tips, and tricks. 
Let's make Pet Parenting happy, and healthy!
Get paid everytime your blog gets read by a subscribed user Rs 5/0.050 cents `}
</p>
<a className="text-blue-500 hover:text-blue-800">
Get Microblogging now!
</a>
		  </div>
		   <div className="">
		    <img src="/assets/img/billing.svg" className="w-96"/>
		  </div>
		  </div>
		)
}