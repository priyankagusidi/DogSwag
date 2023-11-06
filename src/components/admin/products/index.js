import React from 'react';
import ManageProducts from './manageproducts';
import UploadProducts from './uploadproducts';
import { useState,useEffect } from 'react';
import axios from 'axios'

const App = () => {
   const [products,setProducts] = useState([])
   
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
  },[])
  
  return (
    <div className="container mx-auto px-4 py-2">
      <UploadProducts fetchProducts={fetchProducts}/>
      <ManageProducts products={products} setProducts={setProducts}/>
    </div>
  );
};

export default App;
