import axios from 'axios'
import {useRouter} from 'next/router'
import {useState} from 'react'
import Places from './place'
const DogInfoRegister = () => {


    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const handleDogInfoRegister = async (event) => {
        event.preventDefault();
        setLoading(true)
        const dogInfoForm = event.target;
        const dogName = dogInfoForm.dogName.value;
        const doBreed = dogInfoForm.doBreed.value;
        const dogAge = dogInfoForm.dogAge.value;
        const dogWeight = dogInfoForm.dogWeight.value;
        const city = dogInfoForm.city.value;
        const country = dogInfoForm.country.value;

        const dogInfoCollection = {
            dogName: dogName,
            doBreed: doBreed,
            dogAge: dogAge,
            dogWeight: dogWeight,
            city: city,
            country: country
        }

        console.log(dogInfoCollection)

        try {
            const response = await axios.post('/api/dogInfo/create', dogInfoCollection);
            router.push('/video')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }


    }



    return (
        <div>
            <div className="rounded-lg bg-[#F3F3F3]">
                <form onSubmit={handleDogInfoRegister}>
                    <div className="grid p-8 grid-cols-2 gap-6">
                        <div className="flex  flex-col">
                            <label className="text-sm font-medium text-gray-500 my-1">
                                <span className="label-text font-semibold">Dog Name </span>
                            </label>
                            <input type="text" name='dogName' required placeholder="Type your dog name... " className="p-2 bg-[#e9ecef] border text-sm rounded" />
                        </div>
                        <div className="flex  flex-col">
                            <label className="text-sm font-medium text-gray-500 my-1">
                                <span className="label-text font-semibold">Dog Breed </span>
                            </label>
                            <input type="text" name='doBreed' required placeholder="Type your dog breed... " className="p-2 bg-[#e9ecef]  border text-sm rounded" />
                        </div>
                        <div className="flex  flex-col">
                            <label className="text-sm font-medium text-gray-500 my-1">
                                <span className="label-text font-semibold">Dog Age</span>
                            </label>
                            <input type="number" name="dogAge" min="0"  required placeholder="Type your dog age..." className="p-2 bg-[#e9ecef]  border text-sm rounded" />
                        </div>


                        <div className="flex  flex-col">
                            <label className="text-sm font-medium text-gray-500 my-1">
                                <span className="label-text font-semibold">Dog Gender </span>
                            </label>
                            <input type="text" name='dogGender' required placeholder="Type your dog gender..." className="p-2 bg-[#e9ecef]  border text-sm rounded" />
                        </div>
                        <div className="flex  flex-col">
                            <label className="text-sm font-medium text-gray-500 my-1">
                                <span className="label-text font-semibold">Dog Weight</span>
                            </label>
                            <input required name="dogWeight" type="number" min="0" placeholder="Type your dog weight..." className="p-2 bg-[#e9ecef]  border text-sm rounded" />
                        </div>

                        <div className="flex  flex-col">
                            <label className="text-sm font-medium text-gray-500 my-1">
                                <span className="label-text font-semibold">Country</span>
                            </label>
                            <input name="country" type="text" placeholder="Type your dog country..." className="p-2 bg-[#e9ecef]  border text-sm rounded" />

                        </div>

                        <div className="flex  flex-col">
                            <label className="text-sm font-medium text-gray-500 my-1">
                                <span className="label-text font-semibold">Dog City</span>
                            </label>
                            <input name="city" type="text" placeholder="Type your dog city..." className="p-2 bg-[#e9ecef]  border text-sm rounded" />

                        </div>

                        {/*<Places/>*/}


                    </div>
                    <div className="flex p-8 flex-col mt-3">
                        <button className=" md:py-3 md:px-6 sm:py-[0.67rem] rounded-full font-semibold sm:px-[1.4rem] py-[0.55rem] px-[1.3rem] bg-yellow-700 hover:bg-yellow-600 transition-all shadow-2xl hover:shadow-md text-white font-mono hover:text-black">Register Dog </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DogInfoRegister;