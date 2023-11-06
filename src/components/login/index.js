import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';


export default function Login(){

  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [user,setuser] = useState()
  const router = useRouter()
  
    const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const googleAuth = () => {
    

      if(router.query.reqinfo){
           console.log("write")

            window.open(
              `/api/auth/google/callback/${router.query.reqinfo}`,
              "_self"
            );
      }else{
           console.log("normal")
           window.open(
            `/api/auth/google/callback`,
             "_self"
           );
      }

  };


   
  const linkedinAuth = () => {
    

      if(router.query.reqinfo){
           console.log("write")

            window.open(
              `/api/auth/linkedin/callback/${router.query.reqinfo}`,
              "_self"
            );
      }else{
           console.log("normal")
           window.open(
            `/api/auth/linkedin/callback`,
             "_self"
           );
      }

  };



	return (
		     <div className={`loginContainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form loginForm">
            <h2 className="title">Sign in</h2>

           
            <p className="social-text loginp"> Sign in with social platforms</p>
            <div className="social-media">
              
              <a  onClick={googleAuth} className="social-icon">
                <img src="/assets/icons/google-col.svg" className="w-10"/>
              </a>
             {/* <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} className='my-auto mx-auto'/>
              </a>*/}
            </div>
          </form>
          <form action="#" className="sign-up-form loginForm">
            <h2 className="title">Sign up</h2>
           
            <p className="social-text loginp">Or Sign up with social platforms</p>
            <div className="social-media">
             
              <a onClick={googleAuth} className="social-icon">
                <img src="/assets/icons/google-col.svg" className="w-10"/>              
              </a>
            {/*  <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} className='my-auto mx-auto'/>
              </a>*/}
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="contentLogin">
            <h3 className='loginh3'>New here?</h3>
            <p className='loginp'>
              {/*Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!*/}
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
              </button>
          </div>
          <img src="/img/dogLogin1.svg" class="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="contentLogin">
            <h3 className='loginh3'>One of us ?</h3>
            <p className='loginp'>
             {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.*/}
            </p>
            <button onClick={handleSignInClick} className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="/img/dogLogin.svg" class="image" alt="" />
        </div>
      </div>
    </div>
		)
}