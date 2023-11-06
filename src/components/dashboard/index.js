import React, { useState,useEffect } from 'react';
import Analytics from './analytics';
import Videos from './videos/index';
import axios from 'axios'
// import Products from './products';
// import Quizes from './quizes/index';
// import Brands from './brands/index';



const Dashboard = ({userdata}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [brandData, setBrandData] = useState({});
  const [noOfProduct,setNoOfProduct] = useState(0)
  const amount = 1

  const handlePayment = async (amount,currency,plantype,blogsCount,notificationsCount) => {
    // alert("j")
     try {
      const {data} = await axios.post('/api/billing/create',{
         amount, currency,plantype,blogsCount,notificationsCount
      })
      document.open(); 
      document.write(data); 
      document.close(); 
  
     } catch(e) {
       console.log(e);
     }
  }



  const tabs = [
    {
      name: 'Analytics',
      component: <Analytics brandData={brandData} noOfProduct={noOfProduct}/>,
    },
    {
      name: 'Videos',
      component: <Videos brandData={brandData}/>,
    },
    // {
    //   name: 'Videos',
    //   component: <Videos />,
    // },
    // {
    //   name: 'Quizes',
    //   component: <Quizes />,
    // },
    // {
    //   name: 'Brands',
    //   component: <Brands />,
    // },
  ];

  console.log(userdata)


    async function fetchBrand(){
    try {
        await axios.get(`/api/brand/one`).then(res=>{
          setBrandData(res.data.brand)
          setNoOfProduct(res.data.brandProductNo)
        })
    } catch(e) {
      // statements
      console.log(e);
    }
  }

  useEffect(()=>{
      fetchBrand()
  },[])


  console.log(brandData)

  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <nav className="mt-6">
          {tabs.map((tab, index) => (
            <a
              key={index}
              onClick={() => handleTabClick(index)}
              className={`block py-2 px-4 ${
                currentTab === index
                  ? 'text-white bg-gray-700'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
      <div className='flex-1'>
        <div className="h-20 bg-white flex flex-col justify-center p-3">
           <h1 className="font-bold ">{brandData.title}</h1>
           <ul>
             <li className="flex gap-2 text-xs">
                <div className="text-xs font-semibold p-1 bg-amber-500 w-fit rounded-md text-white">Credits : {brandData.credit}</div>
                <button onClick={()=>handlePayment(1,"INR","brandcredit")} className="px-2 py-1 bg-green-500 text-white shadow-sm rounded-md">Buy Credits</button>
             </li>
           </ul>
        </div>
        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">{tabs[currentTab].component}</div>
      </div>
      
    </div>
  );
};

export default Dashboard;
