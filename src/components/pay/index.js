import { useEffect } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
const Profile = ({ userdata }) => {
    const router = useRouter()
	useEffect(() => {
    // Extract the transaction details from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const txnid = params.get('txnid');
    const amount = params.get('amount');
    const plantype=params.get('plantype')
    const notificationsCount=params.get('notificationsCount')
    const blogsCount=params.get('blogsCount')
    const credit=params.get('credit')
    const doctorId=params.get('doctorId')
    const dogId=params.get('dogId')
    const date=params.get('date')
    const start=params.get('start')
    const end=params.get('end')
    const slotId = params.get('slotId')
    const reason=params.get('reason')

    

    console.log(amount,txnid,plantype,notificationsCount,blogsCount)

    // Send a POST request to the backend API endpoint
    axios.post('/api/billing/success', { amount,txnid,plantype,notificationsCount,blogsCount,credit,doctorId,dogId,date,start,end,slotId,reason })
      .then(response => {
        console.log('Data saved in the database:', response.data);
        // Handle any additional actions after saving the data
        if(plantype === "chatcredit"){
          router.push('/vetchat')
          return
        }

        if(plantype === 'schedulecredit'){
          router.push(`/vetchat/doctor/${doctorId}?payment=true`)
          return
        }
        // router.push('/do')
        return
      })
      .catch(error => {
      	alert(error)
        console.error('Failed to save data:', error);
        router.push('/do')
        // Handle any error scenarios
      });
  }, []);

     return(
     	  <div className="flex justify-center">
     	  	<div className="max-w-md text-center p-2 mt-10 md:p-5 shadow-md bg-white">
     	  		<div className="text-green-500 font-bold text-2xl">Sucess</div>
     	  		<div className="text-sm">Please Do not refresh or close the window.<br/>we are redirecting..</div>
     	  	</div>
     	  </div>
     	)
}

export default Profile