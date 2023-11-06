import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios'

const PayPalButtonComponent = ({counter}) => {
  // const paypalOptions = {
  //   'client-id': 'AcwmB9GKVnirKjYIPibieW_y6_6QyzgaA4r7K72-Mt7Qupn5jYkTKkyLUFhWJiods6OYlyfq0VQrkTqi',
  //   currency: 'USD', // e.g., 'USD'
  // };

  const createOrder = async(data, actions) => {
    // You can send a request to your server to create a payment order.
    e.preventDefault();

    try {
      // Send payment data to backend
      const response = await axios.post('/api/billing/create', {
        credit: counter,
        paymentMethod:"paypal",
        plantype:"chatcredit"
      });

      // Redirect to PayPal for payment approval
      window.location.href = response.data.approvalUrl;
    } catch (error) {
      console.log(error);
    }// Return the PayPal payment ID received from the server.
  };

  const onApprove = (data, actions) => {
    // You can perform any post-payment actions here (e.g., update the database, show a success message).
    alert('Payment successful!');
  };

  const onError = (err) => {
    // Handle any error that occurs during the payment process.
    console.error('Payment error:', err);
  };

  return (
    <PayPalScriptProvider >
      <PayPalButtons  />
    </PayPalScriptProvider>
  );
};

export default PayPalButtonComponent;
