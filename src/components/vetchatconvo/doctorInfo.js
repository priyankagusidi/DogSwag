export default function Doc({info}) {
	return(

            <div className="flex flex-col border rounded-lg">
            <div className="border p-4 ">
              <div className="flex gap-8 items-center ">
                <img src="/hospitalSVG.svg" alt="" />
                <div>
                  <p className="text-sm text-gray-500 font-normal">Hospital / Clinic</p>
                  <h3 className="text-gray-900 text-base font-medium">{info ?info.location || "bangalore":"bangalore"}</h3>
                </div>
              </div>
            </div>
            <div className="border p-4 ">
              <div className=" flex gap-8 items-center">
                <img src="/starSVG.svg" alt="" />
                <div>
                  <p className="text-sm text-gray-500 font-normal">Years Of Experience</p>
                  <h3 className="text-gray-900 text-base font-medium">{info ?info.experience || "8" :"8"}</h3>
                </div>
              </div>
            </div>
            <div className="border p-4 ">
              <div className="flex gap-8 items-center ">
                <img src="/clockSVG.svg" alt="" />
                <div>
                  <p className="text-sm text-gray-500 font-normal">Available Time</p>
                  <h3 className="text-gray-900 text-base font-medium">{info ?info.availTimeStart || "8:00 AM":"8:00 AM"} - {info ?info.availTimeEnd || "11:00 AM":"11:00 AM"}</h3>
                </div>
              </div>
            </div>
            </div>

		)
} 