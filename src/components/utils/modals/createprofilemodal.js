import {useRouter} from 'next/router'
import dynamic from 'next/dynamic';

// const Modal = dynamic(() => import('@mantine/core').then((m) => m.Modal), {
//   ssr: false,
// });
import Link from 'next/link'
import {Modal} from '@mantine/core'

export default function Alert({isOpenCreateProfile,setOpenCreateProfile}){
    
	return(
		 <Modal
               opened={isOpenCreateProfile}
               onClose={() => setOpenCreateProfile(false)}
               size = {"md"}
               centered
               title="Create Profile"
             >
            <div className="flex flex-col items-center justify-center gap-3">
                <h1>Please create your profile to start writing blogs.</h1>
               <Link href="/createprofile">
                <button className="bg-amber-300 px-4 py-1 rounded text-sm">
                  Create
                </button>
                </Link>
            </div>
           </Modal>
		)
}