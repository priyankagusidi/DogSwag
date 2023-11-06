import React, { useState } from 'react';
import Link from 'next/link'
const LandingPage = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [productIndex, setProductIndex] = useState(0);

  const slide = () => {
    // alert("hello")
    // return
    if (isScroll) return;

    setIsScroll(true);

    const currProduct = document.querySelector('.product-info.active');
    currProduct.classList.remove('active');

    const productInfos = document.querySelectorAll('.product-info');
    const nextIndex = (productIndex + 1) % productInfos.length;
    setProductIndex(nextIndex);

    productInfos[nextIndex].classList.add('active');

    const listItems = document.querySelectorAll('.landing_slide');
    const landing_slider = document.querySelector('.landing_slider');

    const reverse = Array.from(listItems).slice().reverse();

    const left = reverse[0].offsetLeft + 'px';
    const height = reverse[0].offsetHeight + 'px';
    const width = reverse[0].offsetWidth + 'px';
    const zIndex = reverse[0].style.zIndex;

    reverse.forEach((el, index) => {
      if (index < listItems.length - 1) {
        el.style.left = reverse[index + 1].offsetLeft + 'px';
        el.style.height = reverse[index + 1].offsetHeight + 'px';
        el.style.width = reverse[index + 1].offsetWidth + 'px';
        el.style.zIndex = index + 1;
        el.style.transform = 'unset';
        el.style.opacity = '1';
      }
      if (index === listItems.length - 1) {
        el.style.transform = 'scale(1.5)';
        el.style.opacity = '0';

        const cloneNode = el.cloneNode(true);

        setTimeout(() => {
          el.remove();
          cloneNode.style.transform = 'scale(0)';
          cloneNode.style.left = left;
          cloneNode.style.height = height;
          cloneNode.style.width = width;
          cloneNode.style.opacity = '0';
          cloneNode.style.zIndex = 0;
          cloneNode.style.animation = 'unset';
          landing_slider.appendChild(cloneNode);
          setIsScroll(false);
        }, 1000);
      }
    });

    const updatedListItems = document.querySelectorAll('.landing_slide');
    updatedListItems[0].style.zIndex = '4';
  };

  const openNav = () => {
    const nav = document.querySelector('.nav-overlay');
    const hamb = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamb.classList.toggle('active');
  };

  return (
    <div className="containerLanding sm:h-[115vh] h-[145vh] -mt-[160px] md:-mt-32 ">
   
      {/* ----------nav----- */}
    
      <div id="switch_slide" className="landing_slide-control" onClick={slide}>
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" id="arrow-right"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M10 17l5-5-5-5v10z"></path></svg>
      </div>
      <div className="overlay -z-10"></div>
      <div className="col-5 " style={{ zIndex: 97 }}>
        <div className="infoLanding">
          {/* info 1 */}
          <div className="product-info active">
            <h1 className='h1Landing'>
              Dog<span className='spanLanding' style={{ color: '#e29f01' }}>Swag</span>
            </h1>
            <h1 className='h1Landing'>
              <span className='spanLanding' style={{ color: '#e29f01' }}>ORG</span>NIZER
            </h1>
            <p className='pLanding '>
            {`"Set, Reminder, Track and Analyse your dog's daily schedule and behaviour patterns."`}
            </p>
            <Link href="/do">
            <button className='buttonLanding'>
              DogSwag Organiser
            </button>
            </Link>
          </div>
          {/* end info 1 */}
          {/* info 2 */}
          <div className="product-info">
            <h1 className='h1Landing'>
              <span className='spanLanding' style={{ color: '#e29f01' }}>DOG</span>SWAG
            </h1>
            <h1 className='h1Landing '>
              BLOG<span className='spanLanding' style={{ color: '#e29f01' }}>S</span>
            </h1>
          
            <p className='pLanding'>
            {`"A microblog for learning and sharing stories, training tips, food recommendations, health insights, and promoting mental well-being of dogs."`}
            </p>
            <Link href="/blog">
            <button className='buttonLanding '>
              Read now
            </button>
            </Link>
          </div>
          
        </div>
      </div>
      <div className="col-7 flex items-center sm:justify-center justify-start mx-5">
        <div className="landing_slider">
          <div className="landing_slide">
            <div className="img-holder" style={{ backgroundImage: "url(/assets/img/cal.png"}}></div>
          </div>
          <div className="landing_slide">
            <div className="img-holder" style={{ backgroundImage: "url(/assets/img/blog.png)" }}>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default LandingPage;




// import React, { useState, useEffect, useRef } from 'react';


// const LandingPage = () => {
//   const [productIndex, setProductIndex] = useState(0);
//   const [isScroll, setIsScroll] = useState(false);
//   const productInfosRef = useRef([]);

//   useEffect(() => {
//     productInfosRef.current = document.querySelectorAll('.product-info');
//     setTimeout(() => {
//       productInfosRef.current[productIndex].classList.add('active');
//     }, 200);
//   }, [productIndex]);

//   const scrolllanding_Slide = () => {
//     if (isScroll) return;
//     setIsScroll(true);
//     let currProduct = document.querySelector('.product-info.active');
//     currProduct.classList.remove('active');
//     setProductIndex((prevIndex) => prevIndex + 1 > productInfosRef.current.length - 1 ? 0 : prevIndex + 1);
//     productInfosRef.current[productIndex].classList.add('active');
//     let listitems = document.querySelectorAll('.landing_slide');
//     let landing_slider = document.querySelector('.landing_slider');
//     let reverse = Array.from(listitems).slice().reverse();
//     let left = reverse[0].offsetLeft + 'px';
//     let height = reverse[0].offsetHeight + 'px';
//     let width = reverse[0].offsetWidth + 'px';
//     let zIndex = reverse[0].style.zIndex;
//     reverse.forEach((el, index) => {
//       if (index < listitems.length - 1) {
//         el.style.left = reverse[index + 1].offsetLeft + 'px';
//         el.style.height = reverse[index + 1].offsetHeight + 'px';
//         el.style.width = reverse[index + 1].offsetWidth + 'px';
//         el.style.zIndex = index + 1;
//         el.style.transform = 'unset';
//         el.style.opacity = '1';
//       }
//       if (index === listitems.length - 1) {
//         el.style.transform = 'scale(1.5)';
//         el.style.opacity = '0';
//         let cln = el.cloneNode(true);
//         setTimeout(() => {
//           el.remove();
//           cln.style.transform = 'scale(0)';
//           cln.style.left = left;
//           cln.style.height = height;
//           cln.style.width = width;
//           cln.style.opacity = '0';
//           cln.style.zIndex = 0;
//           cln.style.animation = 'unset';
//           landing_slider.appendChild(cln);
//           setIsScroll(false);
//         }, 1000);
//       }
//     });
//     listitems = document.querySelectorAll('.landing_slide');
//     listitems[0].style.zIndex = '4';
//   };

//   return (
//     <>
//     <div className="container">
//       {/* <Fonts /> */}
//       {/* <Icons /> */}
//       {/* <div className="nav">
//         <div className="logo">
//           <img src="/img/dlogo.png" alt="" className="dogswagLogo" />
//           <span>DogSwag</span>
//         </div>
//         <div>
//           <img src="/img/user.jpg" className="user" alt="user" />
//         </div>
//       </div> */}
//       <div className="landing_slide-control" onClick={scrolllanding_Slide}>
//       <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" id="arrow-right"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M10 17l5-5-5-5v10z"></path></svg>
//       </div>
//       <div className="overlay"></div>
//       <div className="col-5" style={{ zIndex: 97 }}>
//         <div className="info">
//           <div className={`product-info ${productIndex === 0 ? 'active' : ''}`}>
//           <h1> DOG<span style={{color: "#e29f01"}}>SWAG</span>
//                     </h1>
//                     <h1>
//                         <span style={{color: "#e29f01"}}>B</span>LOG
//                     </h1>
//             <p className="text-xl">"A microblog for learning and sharing stories, training tips, food recommendations, health insights, and promoting mental well-being of dogs."</p>
//             <button>Read now</button>
//           </div>
//           <div className={`product-info ${productIndex === 1 ? 'active' : ''}`}>
//           <h1> <span style={{color: "#e29f01"}}>DogS</span>wag
//                     </h1>
//                     <h1>
//                         E<span style={{color: "#e29f01"}}>com</span>
//                     </h1>
//             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo eos illo quam? Aspernatur dolorem vel sint enim ipsam fugit obcaecati?</p>
//             <button>Shop Now</button>
//           </div>
//           <div className={`product-info ${productIndex === 2 ? 'active' : ''}`}>
//           <h1><span style={{color: "#e29f01"}}>Dog</span>Swag
//                 </h1>
//                     <h1>
//                         <span style={{color: "#e29f01"}}>Org</span>nizer
//                     </h1>
//             <p className="text-xl">"Set, Reminder, Track and Analyse your dog's daily schedule and behaviour patterns." <br /></p>
//             <button className="text-black">GET DO</button>
//           </div>
//           <div className={`product-info ${productIndex === 3 ? 'active' : ''}`}>
//           <h1>
//                         <span style={{color: "#e29f01"}}>Woof,</span>Woof
//                     </h1>
//                     <h1>
//                         JOK<span style={{color: "#e29f01"}}>ES</span>
//                     </h1>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iure nesciunt minus natus soluta consectetur. Similique animi odit accusamus quasi!</p>
//             <button>Read</button>
//           </div>
//         </div>
//       </div>
//       <div className="col-7">
//         <div className="landing_slider">
//           <div className="landing_slide">
//             <img src="./Img/blogs.png" alt="" />
//           </div>
//           <div className="landing_slide">
//             <img src="/img/ecom.jpg" alt="" />
//           </div>
//           <div className="landing_slide">
//             <img src="/img/calendar.png" alt="" />
//           </div>
          
//           <div className="landing_slide">
//             <img src="/img/jokes.png" alt="" />
//           </div>
//         </div>
//       </div>
      
//     </div>
//     </>
//   );
// };

// export default LandingPage;