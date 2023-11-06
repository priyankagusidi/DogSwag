export default function User({info}) {
	return(

<div className="flex flex-col border rounded-lg">
            <div className="border p-2 ">
              <div className="flex gap-8 items-center ">
                <img src="/gender.svg" alt="" />
                <div>
                  <p className="text-sm text-gray-500 font-normal">Gender</p>
                  <h3 className="text-gray-900 text-base font-medium">{info ? info.dogGender || "Male":"Male"}</h3>
                </div>
              </div>
            </div>
            <div className="border p-2 ">
              <div className=" flex gap-8 items-center">
                <img src="/year.svg" alt="" />
                <div>
                  <p className="text-sm text-gray-500 font-normal">Age</p>
                  <h3 className="text-gray-900 text-base font-medium">{info ? info.dogAge || "3" :"3"}</h3>
                </div>
              </div>
            </div>
            <div className="border p-2 ">
              <div className="flex gap-8 items-center ">
                <img src="/bone.svg" alt="" />
                <div>
                  <p className="text-sm text-gray-500 font-normal">Weight</p>
                  <h3 className="text-gray-900 text-base font-medium">{info ? info.dogWeight || "11":"11"}</h3>
                </div>
              </div>
            </div>
            <div className="border p-2 ">
              <div className="flex gap-8 items-center ">
                <img src="/dog.svg" alt="" />
                <div>
                  <p className="text-sm text-gray-500 font-normal">Breed</p>
                  <h3 className="text-gray-900 text-base font-medium">{info ? info.dogBreed || "German":"German"}</h3>
                </div>
              </div>
            </div>
            </div>
		)
} 