import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'

const ProductList = () => {

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
    <div>
    <h2 className="text-2xl font-semibold">Product List</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4">
              <span className="text-gray-700  mr-2">₹{product.price}</span>
              <del className="text-gray-700  mr-2">₹{product.exclprice}</del>
            </div>
            <button className="p-2 bg-blue-500 text-white w-full text-sm mt-3 rounded-md">Add</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductList;
