import Doctor from './doctor'
export default function App(){
	return(
		<div className="bg-white">
		  <h1 className="text-2xl md:text-4xl text-center font-bold">Supported By</h1>
		  <div>
		     <div className="my-5 flex items-center flex-col gap-5 text-sm">
		        <img src="/assets/img/bph.jpg" className="w-96  shadow-md rounded-md"/>
		        <p className="font-bold text-gray-600">Bangalore Pet Hospital.</p>
		     </div>
		     <div className="my-5 flex items-center flex-col gap-5 text-sm">
		        <img src="/assets/img/dis.jpeg" className="w-96 shadow-md rounded-md"/>
		        <p className="font-bold max-w-sm text-gray-600">Our Director, Sunder Raman, Dr. Riya and Dr. Deviyane in discussion to create an exciting educational series for pet parents in partnership with Bangalore Pet Hospital.</p>
		     </div>

		     <div className="text-2xl md:text-4xl text-center font-bold">
		        Our Doctors
		     </div>
		     <Doctor/>
		    {/* <div className="max-w-xl mx-auto flex justify-between my-5 text-gray-600">
		     	<div className="flex items-center flex-col gap-2">
		     		<img src="/assets/img/doc1.jpeg"className="object-cover bg-gray-100" />
		     		<label className="font-semibold">Dr. Lohit</label>
		     	</div>
		     	<div className="flex items-center flex-col gap-2">
		     		<img src="/assets/img/doc1.jpeg"className="object-cover bg-gray-100" />
		     		<label className="font-semibold">Doctor Name</label>
		     	</div>
		     	<div className="flex items-center flex-col gap-2">
		     		<img src="/assets/img/doc1.jpeg"className="object-cover bg-gray-100" />
		     		<label className="font-semibold">Doctor Name</label>
		     	</div>
		     </div>*/}
		  </div>
		</div>
		)
}