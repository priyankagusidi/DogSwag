import { useState } from 'react';
import { loadScript } from './utils';
import {Modal} from '@mantine/core'
import axios from 'axios'
import Paypal from './paypal'
import { useMantineTheme } from '@mantine/core';
import PaymentForm from './paymentForm'

function CheckoutForm({ transactionIdValue,hashValue,setHashValue,error,handlePayment,benefits,country,amount,setAmount,plantype,notificationsCount,blogsCount,billingModal,setBillingModal}) {
 
  return (
     <Modal
      opened={billingModal}
               onClose={() => setBillingModal(false)}
               size = {"sm"}
    >

    <PaymentForm transactionIdValue={transactionIdValue} hashValue={hashValue}setHashValue={setHashValue} error={error} country={country} benefits={benefits} amount={amount} plantype={plantype} blogsCount={blogsCount} notificationsCount={notificationsCount} handlePayment={handlePayment}/>
    </Modal>


  );
}

export default CheckoutForm;
 