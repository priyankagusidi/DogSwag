import { loadStripe } from '@stripe/stripe-js';
import { Elements ,CardElement,useElements} from '@stripe/react-stripe-js';
import axios from 'axios'
const stripePromise = loadStripe('pk_test_51NbkruSHAVi1546zdee7VfgbOYlZEa9dfXeRJ2m6oUGlMnlufe3h5ZgOCVUF3YcIK0Gu6DjJRdviNsgGBeTx6MqH00BfLrk21g');

// pk_test_51NbkruSHAVi1546zdee7VfgbOYlZEa9dfXeRJ2m6oUGlMnlufe3h5ZgOCVUF3YcIK0Gu6DjJRdviNsgGBeTx6MqH00BfLrk21g
const StripeButtonComponent = ({counter}) => {

// const elements = useElements();

const cardElementStyle = {
  base: {
    fontSize: '16px',
    color: '#424770',
    '::placeholder': {
      color: '#aab7c4',
    },
    padding:'10px',
    margin:'10px'
  },
  invalid: {
    color: '#9e2146',
  },
};
  
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const response = await axios.post('/api/billing/create', {
        credit: counter,
        paymentMethod:"stripe",
        plantype:"chatcredit"
    });


    try{
        const stripe = await stripePromise;
        const result = await stripe.confirmCardPayment(response.data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement), // Add CardElement from the Stripe library
          },
        });

        if (result.error) {
          console.error('Payment error:', result.error);


        } else {
          // Handle successful payment (e.g., show a success message, update the database)
          alert('Payment successful!');
        }
    }
    catch(err){
        console.log(err)
    }
  };

  return (

       <Elements stripe={stripePromise}>
      {/* Add your Stripe payment form or button here */}
      <form onSubmit={handleSubmit}>
        {/* Add your payment form fields (e.g., CardElement, etc.) here */}
        {/* For example: */}
        <div style={{ padding: '10px 0' }}>
          <CardElement options={{ style: cardElementStyle }} />
        </div>
        <button type="submit" className="flex justify-center items-center bg-[#FFCB07] w-full rounded-xl p-2">Pay now with <img src="/stripe.png" className="w-16"/></button>
      </form>
    </Elements>
   
         
  );
};

export default StripeButtonComponent;
