import React, { useState } from "react";
// import {IoMdNotificationsOutline} from 'react-icons/io'
// import {AiOutlineHome} from 'react-icons/ai'
// import { CiLogout } from 'react-icons/ci';
// import {BsCamera} from 'react-icons/bs'
// import {CgProfile} from 'react-icons/cg'


function FooterGuided() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const navItems = [
    { text: "Get DO", icon: <img className="md:h-8 sm:h-7 sm:w-7 h-6 w-6 md:w-8 sm:h-7 sm:w-7 h-6 w-6 relative top-1/2 left-1/2 -translate-x-[18px] sm:-translate-y-[0px] translate-y-[10px]" src="/assets/icons/calender.svg"/> },
    { text: "Blogs", icon:  <img className="md:h-8 sm:h-7 sm:w-7 h-6 w-6 md:w-8 sm:h-7 sm:w-7 h-6 w-6 relative top-1/2 left-1/2 -translate-x-[18px] sm:-translate-y-[0px] translate-y-[10px]" src="/assets/icons/neon.svg"/>},
    { text: "Woof, Woof", icon: <img className="md:h-8 sm:h-7 sm:w-7 h-6 w-6 md:w-8 sm:h-7 sm:w-7 h-6 w-6 relative top-1/2 left-1/2 -translate-x-[18px] sm:-translate-y-[0px] translate-y-[10px]" src="/img/joke.svg"/> },
    { text: "Ecom", icon: <img className="md:h-8 sm:h-7 sm:w-7 h-6 w-6 md:w-8 sm:h-7 sm:w-7 h-6 w-6 relative top-1/2 left-1/2 -translate-x-[18px] sm:-translate-y-[0px] translate-y-[10px]" src="/img/ecommerce.svg"/> },
    // { text: "Logout", icon: <CiLogout/> },
  ];

  return (
    <div className="bodyNavigationGuided border border-black">
       <div className="navigationGuided md:w-[400px] md:h-[70px] sm:w-[375px]  sm:h-[60px] w-[360px] h-[50px] top-[70%] md:left-[87%] sm:left-[80%] left-[57%] z-[1000] mb-10 mt-20">
      <ul className="ulGuided">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`liGuided list ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            <a className="aGuided">
              <span className="iconGuided  flex items-center justify-center">
                <span className="ion-icon">{item.icon}</span>
              </span>
              <span className="text">{item.text}</span>
     
            </a>
          </li>
        ))}
        <div className="indicatorr md:w-[70px] md:h-[70px] sm:h-[65px] sm:w-[65px] h-[55px] w-[55px]"></div>
      </ul>
    </div>
    </div>
   
  );
}

export default FooterGuided;