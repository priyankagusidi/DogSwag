import axios from 'axios'
import {useRouter} from 'next/router'
export default function DocTerms(){
	const router = useRouter()
	async function handleAgree(){
		try {
			await axios.post('/api/doctor/create').then(res=>{
				console.log(res.data)
				router.push('/doctor/profile')
			})
		} catch(e) {
			console.log(e);
		}
	}
	return(
		  <div>
		     <button onClick={handleAgree} className="p-2 bg-amber-800">Agree & Continue</button>
		  </div>
		)
}