import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripePaymentForm = ({ handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(1000); // default amount in cents (e.g., $1.00)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await handlePayment(1000);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        response.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.error('Payment failed:', error);
        // Handle payment failure here
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment successful!');
        // Redirect to a success page or show a success message
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };


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

  return (
    <form onSubmit={handleSubmit}>
       <div style={{ padding: '10px 0' }}>
          <CardElement options={{ style: cardElementStyle }} />
        </div>
       <button type="submit" className="flex justify-center items-center bg-[#FFCB07] w-full rounded-xl p-2">Pay now with <img src="/stripe.png" className="w-16"/></button>
    </form>
  );
};

export default StripePaymentForm;
