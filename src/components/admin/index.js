import React, { useState, useEffect} from 'react';
import Analytics from './analytics';
import Products from './products';
import Videos from './videos/index';
import Quizes from './quizes/index';
import Brands from './brands/index';
import Users from './user/index';
import Activity from './activity/index';

import axios from 'axios'


const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);
  // const [noOfProduct,setNoOfProduct] = useState(0)
  const [brandData,setBrandData] = useState({})
  async function fetchBrand(){
    try {
        await axios.get(`/api/brand/alldata`).then(res=>{
          // setBrandData(res.data.brand)
          setBrandData(res.data)
          // totalQuizesPlayed:sum.totalQuizesPlayed,totalProductClicked: sum.totalProductClicked,totalClickedOnBuy: sum.totalClickedOnBuy
          // setNoOfProduct(res.data.brandProductNo)
        })
    } catch(e) {
      // statements
      console.log(e);
    }
  }

  useEffect(()=>{
      fetchBrand()
  },[])


  const tabs = [
    {
      name: 'Analytics',
      component: <Analytics brandData={brandData} />,
    },
    {
      name: 'Products',
      component: <Products />,
    },
    {
      name: 'Videos',
      component: <Videos brandData={brandData} />,
    },
    {
      name: 'Quizes',
      component: <Quizes />,
    },
    {
      name: 'Brands',
      component: <Brands />,
    },
    {
      name: 'Users',
      component: <Users />,
    },
    {
      name: 'Activity',
      component: <Activity />,
    },
  ];

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
      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">{tabs[currentTab].component}</div>
    </div>
  );
};

export default Dashboard;
