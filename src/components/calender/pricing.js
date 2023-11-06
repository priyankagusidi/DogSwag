import React from 'react'
import {useState,useEffect} from 'react'
import {Modal} from '@mantine/core'
import CalenderBillingModal from './calenderBilling'
import PaymentForm from './paymentForm'
import { loadScript } from './utils';
import axios from 'axios'
import Paypal from './paypal'
import { useMantineTheme } from '@mantine/core';
import crypto from 'crypto'


const PricingPage = ({userdata,PricingModal,setPricingModal,billingdata,pricingRef}) => {
  const [amount,setAmount] = useState(0)
  const [billingModal,setBillingModal] = useState(false)
  const [billingAlertModal,setBillingAlertModal] = useState(false)
  const [plantype,setPlantype] = useState("")
  const [notificationsCount,setNotificationsCount] = useState(0)
  const [blogsCount,setBlogsCount] = useState(0)
  const [country, setCountry] = useState(null);
  const [benefits,setBenefits] = useState([])
  const [error, setError] = useState(null);
  const [prefillInfo,setPrefillInfo] = useState({})
  const theme = useMantineTheme();

  const currency = "INR"
  const handleChange = (e)=>{
     // setAmount(parseInt(e.target.value)
    setPrefillInfo({...prefillInfo,[e.target.name]:e.target.value})
  }

   
  const handlePaymentTemp = async (amount,currency,plantype) => {
    try {
      // const res = await fetch('/api/billing/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount, currency,plantype}),
      // });
      // const data = await res.json();

      // console.log(data)
      // if(data.msg)
      const {data} = await axios.post('/api/billing/create',{
         amount, currency:"INR",plantype
      })


      const scriptUrl = 'https://checkout.razorpay.com/v1/checkout.js';
      await loadScript(scriptUrl);
      const options = {
        key: 'rzp_test_uHtPr0bpaZceuA',
        amount:parseInt(data.amount) ,
        currency: 'INR',
        name: 'DogSwag Pvt Ltd.',
        description: 'Product description',
        order_id: data.id,
        handler: async(response) => {
          console.log(response);
           try {
          const apiRes = await axios.post('/api/billing/success', 
                            {
                              amount:amount,
                              currency:data.currency,
                              plantype:plantype,
                              notificationsCount:notificationsCount,
                              blogsCount:blogsCount,
                              razorpay_order_id:response.razorpay_order_id,
                              razorpay_payment_id:response.razorpay_payment_id,
                              razorpay_signature:response.razorpay_signature 
                            });
          console.log(apiRes.data);
          window.location.reload();
          // Perform any necessary actions with the API response
        } catch (error) {
          console.log(error);
          // Handle API call error
        }
        },
        prefill: {
          email: prefillInfo.email,
          contact: prefillInfo.phoneno,
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      setError(err && err.response && err.response.data  ? err.response.data.msg : "error initiating payment");
    }
  };
  console.log(country)
  
console.log(billingdata) 
  const PricingCard = [{
    id:1,
    amount: country == 'IN' ? 50 : 1,
    title:"TRIAL PACK",
    desc:"one dog for one month",
    plantype:'trial',
    currency:country == 'IN' ? "₹" : "$",
    notificationcount:10,
    blogcount:5,
    offerType:"Limited Offer",
    benefits:[
    {
      id:1,
      title:"Create One Pet Profile"
    },
    {
      id:2,
      title:"Assign Notification to One Person"
    },
    {
      id:3,
      title:"Send 10 Message Notifications"
    },
    
    // {
    //   id:4,
    //   title:"1 paid microblog/video content"
    // }
    ]
  },




  {
    id:2,
    amount:country == 'IN' ? 500 :6,
    month:3,
    title:"SWAG PACK",
    plantype:'swagpack',
    notificationcount:150,
    blogcount:50,
    currency:country == 'IN' ? "₹" : "$",
    offerType:"Special Offer",
    benefits:[{
      id:1,
      title:"Create 10 Pet Profiles"
    },
    {
      id:2,
      title:"Assign Notifications to 10 People"
    },
    {
      id:3,
      title:"Send 150 Message Notifications"
    },
    // {
    //   id:4,
    //   title:"Access 5 paid micro blog/video content."
    // },
    // {
    //   id:5,
    //   title:"Set invitation with our vet/trainer/groomer,etc"
    // }
    ]
  },
  
  ]


const topUps = [
  {
    id:3,
    amount:100,
    title:"100 TopUp",
    plantype:'topup',
    notificationcount:50,
    blogcount:5,
    benefits:[{
      id:1,
      title:"You can create more 50 notification."
    },
    // {
    //   id:3,
    //   title:"You can unlock 5 more premium blogs"
    // },
    ]
  },
  {
    id:4,
    amount:400,
    title:"400 TopUp",
    plantype:'topup',
    notificationcount:200,
    blogcount:20,
    benefits:[{
      id:1,
      title:"You can create more 200 notification."
    },
    // {
    //   id:2,
    //   title:"You can unlock 20 more premium blogs."
    // },
    ]
  },
  {
    id:5,
    amount:750,
    title:"750 TopUp",
    plantype:'topup',
    notificationcount:500,
    blogcount:40,
    benefits:[{
      id:1,
      title:"You can create more 500 notification."
    },
    {
      id:2,
      title:"You can unlock 40 more premium blogs."
    },
    ]
  },
  ]


  function openBillingModal(amount,plantype,notificationcount,blogcount,benefits){
    console.log(amount,plantype,notificationcount,blogcount)
    setBillingModal(true)
    setPricingModal(false)
    setAmount(amount)
    setBlogsCount(blogcount)
    setNotificationsCount(notificationcount)
    setPlantype(plantype)
    setBenefits(benefits)
              const params = {
            key: 'vK4F7h',
            txnid: 'PQI6MqpYrjEefU',
            amount: amount,
            productinfo: 'iPhone',
            firstname: 'Bapun',
            email: 'test@gmail.com',
            surl:'https://test-payment-middlare.payu.in/simulatorResponse',
            phone:'8328821185',
            udf1: '',
            udf2: '',
            udf3: '',
            udf4: '',
            udf5: '',
          };
    
    const salt = 'Iptn0Cyh5VRkIyLhtOdRaU9Dacncyql6';
    const hash = generateHash(params, salt);
    setHashValue(hash)

  }

 const fetchCountry = async () => {
      try {
        const response = await fetch('https://geolocation-db.com/json/62d8d690-e7b8-11ed-8c81-cbb990727ab5');
        const data = await response.json();
        setCountry(data.country_code);
      } catch (error) {
        console.log('Error fetching country:', error);
      }
    };


  useEffect(() => {
    fetchCountry();
    if(billingdata && billingdata.trialQuotaAlert){
      setBillingAlertModal(true)
    }
  }, []);

  
  return (
    <div className="bg-amber-200 p-5 rounded-md shadow-md" ref={pricingRef}>
      {
       billingdata && billingdata.premium ?
       <section className="flex gap-5 justify-center flex-wrap">

    {
      topUps.map((m,i)=>{
        return(
   <div class="card-wrapper" key={m.id}> 
      <div class="card-header"> 
        <img className='pricingimg' src="/Img/svg2.svg" alt=""/> 
        <h2 className='pricingCardh2'>{m.title}</h2> 
      </div> 
      <div class="card-detail"> 
         {
          m.benefits.map((k,i)=>{
            return (
               <p key={k.id} className='flex justify-start items-center space-x-2 pricingP'><img className='pricingimg check h-6 w-6' src="/assets/icons/calendar/checkmark.svg"/> <span>{k.title}</span></p> 
              )
          })
        }
      </div> 
      <div class="card-price"> 
      <p className='flex font-bold text-3xl'>
           <span className="text-sm">₹</span>{m.amount}
        </p> 
      </div> 
      <button class="card-button" onClick={()=>openBillingModal(m.amount,m.plantype,m.notificationcount,m.blogcount,m.benefits)}>I WANT IT</button> 
    </div> 
          )
      })
    }
    

 
  </section>
       :
       <section className="flex gap-5 justify-center flex-wrap">

    {

      PricingCard.map((m,i)=>{

        if (billingdata && billingdata.trial && m.plantype === 'trial') {
            return null; // Skip rendering the trial plan
        }

        return(
  
    <div key={i} class="w-full text-xs px-6 py-4 transition-colors duration-300 transform rounded-lg md:mx-5 md:w-96 bg-gray-50 dark:bg-gray-800">
                <div class="text-center">
                    <p class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{m.title}</p>
                    <p class="mt-4 text-gray-500 dark:text-gray-300 text-md">{m.offerType}</p>
                    {/*<h4 class="mt-2 text-gray-600 line-through dark:text-gray-400">{m.amount}</h4>*/}
                    <div className="flex justify-center relative">
                    <h4 class="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">{`${m.currency}${m.amount}`}</h4>
                    <p class={`mt-4 text-gray-500 ${m.month ? "":"hidden"} relative top-3 dark:text-gray-300`}>{`/ ${m.month ? m.month: ""} months `}</p>
                    </div>
                    {/*<p class="mt-4 text-gray-500 dark:text-gray-300">Bill all 6 months</p>*/}
                </div>

                <div class="mt-8 space-y-2">
                    

                     {
           m.benefits.map((k,i)=>{
             return (
               <div key={k.id} class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>

                        <span class="mx-4 text-gray-700 dark:text-gray-300">{k.title}</span>
                    </div>
               )
           })
         }
                </div>

                <button onClick={()=>openBillingModal(m.amount,m.plantype,m.notificationcount,m.blogcount,m.benefits)} class="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    I WANT IT
                </button>
            </div>
          )
      })
    }
  </section>
     }
        {/*<Modal
      opened={billingAlertModal}
               onClose={() => setBillingAlertModal(false)}
               size = {"sm"}
               title={"Alert"}
    >
      <div className="text-center font-bold text-sm text-red-500 mb-10">
         Quota of 10 notification has ended,<br/>
         Buy the Swag pack within 30 days to keep the Account and Data active.
      </div>
      <PaymentForm refButton={true} error={error} country={country} benefits={PricingCard[1].benefits} amount={PricingCard[1].amount} plantype={PricingCard[1].plantype} blogsCount={PricingCard[1].blogsCount} notificationsCount={PricingCard[1].notificationsCount} handlePayment={handlePayment}/>
      </Modal>*/}    
  </div>
  )
}

export default PricingPage

