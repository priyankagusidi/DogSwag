import {useState} from 'react'
import {Modal} from '@mantine/core'
import axios from 'axios'
import Paypal from '@/components/paypal';
// import Stripe from '@/components/stripe';
// import { Elements ,CardElement,useElements} from '@stripe/react-stripe-js';
// import StripePaymentForm from '@/components/stripe';

// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe('pk_test_51NbkruSHAVi1546zdee7VfgbOYlZEa9dfXeRJ2m6oUGlMnlufe3h5ZgOCVUF3YcIK0Gu6DjJRdviNsgGBeTx6MqH00BfLrk21g');


export default function CreditModal({credit,setCredit,isModalOpen,setIsModalOpen}){

	// const [open,setOpen] = useState(isModalOpen)
	const [counter,setCounter] = useState(1)
  const [alerts,setAlerts] = useState(false)
	const [clientSecret, setClientSecret] = useState('');
	const [contributeValue,setContributeValue] = useState(25)

    const amount = 1

	const handlePayment = async (amount,currency,plantype,blogsCount,notificationsCount) => {
	     try {
	      const {data} = await axios.post('/api/billing/create',{
	         amount:contributeValue, currency,paymentMethod:"payu",plantype:"contribute",blogsCount,notificationsCount,credit:contributeValue
	      })

	      document.open(); 
	      document.write(data); 
	      document.close(); 
	  
	     } catch(e) {
	       console.log(e);
	     }
	}



  const handlePaypalPayment = async (amount) => {
    try {
      // Send a request to the backend to create a payment intent
      const response = await axios.post('/api/billing/create', { 
      	amount: contributeValue,
        paymentMethod:"stripe",
        plantype:"conribute" 
       });
      setClientSecret(response.data.clientSecret);
      return response.data
      console.log(clientSecret)
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };


    function handleInput(e) {
    	setCounter(e.target.value)
  	}
    function handleCounter(type){
    	if(type==="dec"){
    		if(counter <= 1){
    			return
    		}
    		setCounter(counter-1)
    		return
    	}

    	if(type==="inc"){
    		setCounter(counter+1)
    		return
    	}
    }

    function Buy(){
    	setCredit(parseInt(counter)+parseInt(credit))
    	setAlerts(true)
    }

    async function BuyCredit(){

    	try {
    		await axios.put(`/api/user/chat/buy`,{credit:counter},{
                credentials: 'include'
            }).then(res=>{
    			console.log(res.data)
    			Buy()
    		})
    	} catch(e) {
    		// statements
    		console.log(e);
    	}
    } 

    function Close(){
    	setIsModalOpen(false)
    	setAlerts(false)
    }


	return(
		  <Modal
		  opened={isModalOpen}
		  onClose={Close}
		  size="sm"
		  title="Chat credit"
		  >
		  {
		   alerts ? 
		  <div className="flex flex-col gap-2 items-center justify-center">
		  	<img src="/dog2.svg" className="w-40 h-40"/>
		  	<p className="text-gray-500 text-center">Thank u ! For Contributing</p>
		  	<div>
		  		<button onClick={Close} className="bg-[#FFCB07] p-2 w-24 rounded-lg text-white">Done</button>
		  	</div>
		  </div>
		  :
		  <div className="flex flex-col gap-4 items-center">
		   	<img src='/contribute.svg' className="w-24 h-24"/>
		   	<div className="flex flex-col gap-2">
		   	<div className='flex gap-2 items-center'>
		   		<input value={contributeValue} onChange={handleInput} type="number" min="25" className="p-2 rounded-xl w-full text-sm border border-gray-300"/>
		   	</div>
		   	<div className='text-sm flex justify-start flex-wrap'>
		   	  <span onClick={()=>setContributeValue(25)}  className="border bg-green-500 px-5 rounded-2xl py-1 text-white cursor-pointer">₹ 25 / $ 0.30 </span>
		   	  <span onClick={()=>setContributeValue(50)}  className="border bg-green-500 px-5 rounded-2xl py-1 text-white cursor-pointer">₹ 50 / $ 0.60 </span>
		   	  <span  onClick={()=>setContributeValue(75)} className="border bg-green-500 px-5 rounded-2xl py-1 text-white cursor-pointer">₹ 75 / $ 0.90</span>
		   	  <span onClick={()=>setContributeValue(100)}  className="border bg-green-500 px-5 rounded-2xl py-1 text-white cursor-pointer">₹ 100 / $ 1.20</span>
		    </div>
		    </div>
		    <div className="w-full flex flex-col gap-2">
		      <button onClick={()=>handlePayment(1,"INR","chatcredit")} className="p-2 w-full bg-[#FFCB07] text-white rounded-lg justify-center flex"><img src="/payu.svg"/></button>
		      <Paypal counter={counter}/>
		      {/*<Elements stripe={stripePromise}>
		         <StripePaymentForm  handlePayment={handlePaypalPayment} />
		      </Elements>*/}
		    </div>
		  </div>
		  }
		  </Modal>
		)
}