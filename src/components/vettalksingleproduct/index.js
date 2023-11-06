import React, { useEffect, useState } from 'react';
import axios from 'axios'

const VetTalkSingleProduct = ({ product, setDiscountedPrice,timeRemaining,discountedPrice,sponsoredBy}) => {
  const discountTimeSec = JSON.parse(localStorage.getItem('DiscountTimeSec')) || 60 * 60;
  const [countdown, setCountdown] = useState(discountTimeSec);
  const [isDiscountStarted, setIsDiscountStarted] = useState(false)

  // Format the countdown time to display in mm:ss format
  const formatCountdown = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
   
  async function clicked(type){
      try{
         await axios.put(`/api/product/${sponsoredBy._id}/${type}`)
      }catch(err){
        console.log(err)
      }
  }

  return (
    <div className="" onClick={()=>clicked("clickedonproduct")}>
      <div className="card outline-orange-500 w-56 border-orange-500  glass bg-red-100 shadow-xl">
       <img className=' w-full animate-pulse' src={product.image} alt="Shoes" />
        <div className="card-body text-sm">
          {
            discountedPrice && <div className=" gap-4">
              <button className="bg-white rounded-lg text-semibold text-black text-xs w-40">
                Exclusive Offer
                {/*<div className="">+{30}</div>*/}
              </button>
              <button className="mt-1">30% discount</button>
            </div>
          }
            {

              discountedPrice ?  
              <h3>  
                 {formatCountdown(timeRemaining)} 
              </h3>
              :
              <></>
            }
           
          <p className="text-semibold text-center text-secondary">Price: ₹{discountedPrice  ? <span className="text-secondary">{product.exclprice}  <del className="block">₹{product.price}</del> </span> : <span>{product.price}</span>}</p>
          <div className="mt-3">
           
            <a onClick={()=>clicked("clickedonbuy")}  className={`${discountedPrice ? "bg-blue-400": "bg-gray-200" } py-2 px-3 rounded-2xl`} target="__blank" href={discountedPrice ? product.exclproductlink: product.productlink}>Buy</a> 
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-md font-bold">{product.title}</h3>
      <h3 className="mt-1 text-xs text-gray-500">{product.description}</h3>
    </div>
  );
};

export default VetTalkSingleProduct
