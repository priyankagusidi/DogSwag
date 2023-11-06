import Paypal from './paypal'

export default function paymentForm({transactionIdValue,hashValue,setHashValue,efButton,error,country,benefits,amount,plantype,blogsCount,notificationsCount,handlePayment}){
	
// function submitHandle(){
//     // alert('')
// }
    return(
		<div className="grid justify-center">
      {error && <p className="bg-red-200 p-2">{error}</p>}
      <div className="grid gap-3">
        {
      country === "IN" ? 
       <div className="grid gap-2">
      {/*<div>
          <input className="p-2 border w-full" onChange={handleChange} name={"phoneno"}  placeholder="Phone no"/>
        </div>*/}
       {/* <div>
          <input className="p-2 border w-full" onChange={handleChange} name={"email"}  placeholder="Email"/>
        </div>*/}
       <div className="text-4xl uppercase font-bold text-center">{plantype}</div>
       <div className="text-xl text-gray-700 text-center font-bold">
         {'"We are really Grateful to you!"'}
       </div>
       {
 benefits && benefits.map((k,i)=>{
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

{/*<form action='https://test.payu.in/_payment' method='post'>
<input type="hidden" name="key" value="vK4F7h" />
<input type="hidden" name="txnid" value={transactionIdValue} />
<input type="hidden" name="productinfo" value="iPhone" />
<input type="hidden" name="amount" value={amount} />
<input type="hidden" name="email" value="test@gmail.com" />
<input type="hidden" name="firstname" value="Bapun" />
<input type="hidden" name="surl" value="https://test-payment-middlare.payu.in/simulatorResponse" />
<input type="hidden" name="furl" value="https://test-payment-middleware.payu.in/simulatorResponse" />
<input type="hidden" name="phone" value="8328821185" />
<input type="hidden" name="hash" value={hashValue} />
<input className="p-2 w-full bg-amber-500 justify-center font-bold text-white gap-2 w-full flex items-center" type="submit" value="Proceed to Pay"/> 
</form>*/}
<input id="proceed_to_pay_button" onClick={()=>handlePayment(amount,"INR",plantype,blogsCount,notificationsCount)} className="p-2 w-full bg-amber-500 cursor-pointer justify-center font-bold text-white gap-2 w-full flex items-center" type="submit" value="Proceed to Pay"/> 
      
       </div>
        :
        <div>
<div className="text-4xl uppercase font-bold">{plantype}</div>
       <div className="text-xl text-gray-700 text-center font-bold">
         {'"We are really Grateful to you!"'}
       </div>
       {
 benefits && benefits.map((k,i)=>{
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
        
        <Paypal amount={amount} plantype={plantype} notificationsCount={notificationsCount}blogsCount ={blogsCount}/>
        </div>
        }
        
      </div>
    </div>



		)
}