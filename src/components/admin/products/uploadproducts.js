import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const ProductForm = ({fetchProducts}) => {

  const [productImage,setProductImage] = useState(null)
  const [brands,setBrands] = useState([])

  const [formData, setFormData] = useState({
    productlink: 'https://google.com',
    exclproductlink: 'https://google.com',
    price: '20',
    exclprice: '15',
    title: 'product title',
    description: 'product description',
    bought: '0',
    productBy:"bapun",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData.productBy)
    // return
        // return
        const formDatas = new FormData();
        formDatas.append("title", formData.title)
        formDatas.append("description", formData.description)
        formDatas.append("productlink", formData.productlink)
        formDatas.append("exclproductlink", formData.exclproductlink)
        formDatas.append("price", formData.price)
        formDatas.append("exclprice", formData.exclprice)
        formDatas.append("productimage", productImage)
        formDatas.append("productBy",  formData.productBy)

    try {
      const res = await axios.post('/api/product/create', formDatas); // Change the endpoint according to your server setup
      console.log(res.data); // Optional: Log the response data
      fetchProducts()
      // Do something with the response if needed
    } catch (error) {
      console.error(error);
    }
  };

  function handleChangeProductImage(e){
     console.log(e.target.files)
     setProductImage(e.target.files[0])
  }


   async function fetchBrands(){
    try {
        await axios.get('/api/brand/all').then(res=>{
           console.log(res)
          setBrands(res.data.Brands)

        })
    } catch(e) {
      // statements

      console.log(e);
    }
  }

  useEffect(()=>{
     fetchBrands()
  },[])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="grid  gap-3">
      <div className="grid">
          <label htmlFor="productBy" className="text-sm font-semibold">
            Product By
          </label>
          <select name="productBy" className="p-2" onChange={handleChange}>
            {
             brands?.map((brand,i)=>{
               return(
                 <option key={brand._id} value={brand._id}>{brand.title}</option>
                )              
             })
            }
          </select>
        </div>
        <div className="grid">
          <label htmlFor="title" className="text-sm font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid">
          <label htmlFor="description" className="text-sm font-semibold">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid">
          <label htmlFor="productlink" className="text-sm font-semibold">
            Product Link:
          </label>
          <input
            type="text"
            name="productlink"
            value={formData.productlink}
            onChange={handleChange}
            required
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid">
          <label htmlFor="exclproductlink" className="text-sm font-semibold">
            Excl. Product Link:
          </label>
          <input
            type="text"
            name="exclproductlink"
            value={formData.exclproductlink}
            onChange={handleChange}
            required
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid">
          <label htmlFor="price" className="text-sm font-semibold">
            Price:
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid">
          <label htmlFor="exclprice" className="text-sm font-semibold">
            Excl. Price:
          </label>
          <input
            type="text"
            name="exclprice"
            value={formData.exclprice}
            onChange={handleChange}
            required
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid">
          <label htmlFor="productimage" className="text-sm font-semibold">
            image
          </label>
          <input
            type="file"
            name="productimage"
            onChange={handleChangeProductImage}
            // required
            className=" px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
