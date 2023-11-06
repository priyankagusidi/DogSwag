import {useState,useEffect} from 'react'
import axios from 'axios'

const Products = () => {
     const [products,setProducts] = useState([])
    // const prod = [
    //     {
    //         image: "/product.png",
    //         sale: "/saleoff.png",
    //         left: "244px",
    //         width: "110px",
    //         height: "110px",
    //         position: "absolute",
    //         text: "Energetic play",
    //     },
    //     {
    //         image: "/product.png",
    //         sale: "/saleoff.png",
    //         position: "absolute",
    //         left: "566px",

    //         width: "110px",
    //         height: "110px",

    //         text: "Training",
    //     },
    //     {
    //         image: "/product.png",
    //         text: "Unleased Creativity",
    //         position: "absolute",
    //         left: "894px",

    //         width: "110px",
    //         height: "110px",

    //         sale: "/saleoff.png"

    //     },
    //     {
    //         image: "/product.png",
    //         sale: "/saleoff.png",
    //         position: "absolute",
    //         left: "1222px",

    //         width: "110px",
    //         height: "110px",
    //         text: "Life Skills"
    //     }
    // ]
  console.log(products)

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
        <div className="bg-white h-full w-full my-10">

            <div className="flex justify-start w-full">
                <div className="">
                    <h1 className="font-bold text-4xl lg:text-7xl uppercase font-Jumper tracking-widest text-gray-700">Products</h1>
                </div>
            </div>

            <div className="">
                <div className="flex flex-wrap gap-20 justify-center mt-10 ">
                    {products.map((c, i) => {
                        return (
                            <div className="flex flex-col relative justify-center border p-5 bg-gray-100 w-60" key={i}>
                                <img src={'/saleoff.png'} alt="" className="absolute md:w-[140px] md:h-[140px] w-[110px] h-[110px] -top-14 md:-right-[74px] -right-[59px]" />
                                <img className="w-full" src={c.image} alt="" />
                                <button className="rounded-xl px-10 mt-10" style={{ background: 'linear-gradient(0deg, #F4C40C, #F4C40C)', border: '5px solid #F4C40C' }}>Buy Now</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>


    )
}

export default Products