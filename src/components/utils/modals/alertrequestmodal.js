import {useRouter} from 'next/router'
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@mantine/core').then((m) => m.Modal), {
  ssr: false,
});

export default function Alert({isSentRequest, setIsSentRequest}){
    
    const router = useRouter()

	return(
		 <Modal
               opened={isSentRequest}
               onClose={() => setIsSentRequest(false)}
               size = {"md"}
             >
            <div className="flex flex-col items-center justify-center">
            <img className="w-60" src="img/puppy.png"/>
            {
                router.query.am ? <p className="font-normal text-sm mt-1 text-gray-500 font-semibold">Thank you for adding new member to dog swag community !</p> :
                router.query.rm ? <p className="font-normal text-sm mt-1 text-gray-500 font-semibold">Thank u for making right choice.</p> :
                                  <p className="font-normal text-sm mt-1 text-gray-500">Your request has been sent and you will be notified in 48 hours. Please check your Inbox/Spam/Promotions Tab for the email.</p>
            }
            </div>
           </Modal>
		)
}