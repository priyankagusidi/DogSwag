import React, { useEffect, useState } from 'react';
import axios from 'axios'
import dynamic from 'next/dynamic'
const VetTalkSingleProduct = dynamic(() => import("@/components/vettalksingleproduct"), {
  ssr: false,
});

const VetTalkProducts = ({discountStart, setDiscountStart,sponsoredBy,timeRemaining,discountedPrice}) => {
  const [products, setProducts] = useState([]);
  
const [updated, setUpdated] = useState(false)
  // useEffect(() => {
  //   fetch('https://swag-club-second-task-server.vercel.app/products')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       setProducts(data);
  //     });
  // }, [updated]);
   
   async function fetchProducts(){
    try {
        await axios.get('/api/product/all').then(res=>{
           console.log(res)
            setProducts(res.data.Products)
        })
    } catch(e) {
      // statements
      console.log(e);
    }
  }

  useEffect(()=>{
      fetchProducts()
  },[updated])


  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-center font-bold italic mt-8 text-4xl ">Featured Products of <span className="uppercase">{sponsoredBy?.title}</span></h2>
      <hr className=" border border-dashed border-orange-500 w-48 mx-auto mt-2"/>
      {/*<hr className=" border border-dashed border-orange-500 w-32 mx-auto mt-2"/>*/}
      <div className="grid mt-8 gap-8 grid-cols-1 md:grid-cols-3">
        {products.map(product => (
          <VetTalkSingleProduct key={product._id} 
          discountStart={discountStart}
          setDiscountStart={setDiscountStart}
          updated={updated}
          setUpdated={setUpdated}
          timeRemaining={timeRemaining}
          discountedPrice={discountedPrice}
          sponsoredBy={sponsoredBy}
          product={product}></VetTalkSingleProduct>
        ))}
      </div>
    
    </div>
  );
};

export default VetTalkProducts;
