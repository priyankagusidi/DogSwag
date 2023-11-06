import React, { useState } from 'react';
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const ManageProducts = ({products,setProducts}) => {
  // const [products, setProducts] = useState([
  //   { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/1080x720.png' },
  //   { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/1080x720.png' },
  //   { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/1080x720.png' },
  //   { id: 4, name: 'Product 4', image: 'https://via.placeholder.com/1080x720.png' },
  // ]);

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleEditProduct = (productId) => {
    console.log('Edit Product:', productId);
  };
  console.log(products)
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Manage Products</h2>
      {products.length > 0 ? (
        <div className="mt-4 space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between w-full p-4 bg-white shadow-md rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 overflow-hidden rounded-lg">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                <span className="text-gray-900 font-semibold text-xl">{product.title}</span>
                <div className="flex gap-2 text-sm">
                    <p className="text-gray-700 text-sm">{product.description}</p>
                </div>
                <div className="text-xs grid gap-1">
                   <span className="text-gray-700">Price : {product.price}</span>
                    <span className="text-gray-700">ExclPrice : {product.exclprice}</span>
                    <span className="text-gray-700">ProductBy : {product.productBy?.title}</span>
                </div>
                </div>
              </div>
              <div>
                <button
                  className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  {/*<RiDeleteBinLine size={20} />*/}
                Del
                </button>
                <button
                  className="ml-2 p-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  onClick={() => handleEditProduct(product._id)}
                >
                  {/*<RiEdit2Line size={20} />*/}
                 Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ManageProducts;
