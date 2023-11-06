import '@/styles/globals.css'
import '../styles/global.css'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'
import ErrorBoundary from '@/components/errorboundary'
import Script from 'next/script';
import { GoogleAnalytics } from "nextjs-google-analytics";
import TagManager ,{TagManagerArgs} from "react-gtm-module"
import {useEffect} from 'react'
import Navbar from '@/components/nav'
import Guide from '@/components/guide'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
const ProgressBar = dynamic(() => import('@/components/loadingbar'), { ssr: false });
// import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import '@/utils/socket'; // Import the socket.js file to establish the connection


export default function App({ Component, pageProps }) {
      // console.log(pageProps,"+++++++++++++++++")

      const router = useRouter();
      const showHeader = router.pathname === '/faq' || router.pathname === '/forgot-password' || router.pathname === '/reset-password'|| router.pathname === '/auth' || router.pathname === '/vetchat/doctor/[id]' || router.pathname === '/dogprofile' || router.pathname === '/setting' || router.pathname === '/doctor/profile' || router.pathname === '/vetchat/[id]'|| router.pathname === '/doctorslogin'|| router.pathname === '/doctorschatconversationlist'|| router.pathname ===  '/doctorsprofileown/[id]' || router.pathname === '/doctorsprofileown' || router.pathname === '/landingpage' ||  router.pathname === '/vetchatsignup' || router.pathname === '/vetchatdoctors/[id]' || router.pathname === '/vetchatdoctors' ||  router.pathname === '/vetchat' || router.pathname === '/chatconversation' || router.pathname === '/login' ||router.pathname === '/vetchatlogin' || router.pathname === '/privacypolicy' || router.pathname === '/pay' ? false : true;

      const gtmId = process.env.NEXT_PUBLIC_GTM_ID || ""

      const tagManagerArgs ={
        gtmId
      }

// if(typeof window !== 'undefined'){
// router.beforePopState((state) => {
//   state.options.scroll = false;
//   return true;
// });
// }

    // useEffect(()=>{
    //   TagManager.initialize(tagManagerArgs);
    //   const handleRouteChange = () => {
    //   document.documentElement.style.scrollBehavior = 'auto';
    //   document.documentElement.scrollTop = 0;
    //   document.documentElement.style.scrollBehavior = '';
    // };

    // router.events.on('beforeHistoryChange', handleRouteChange);
    //     return () => {
    //       router.events.off('beforeHistoryChange', handleRouteChange);
    //     };
    // },[])
    
     useEffect(() => {
      TagManager.initialize(tagManagerArgs);
     }, []);





  

  return (
    <ErrorBoundary>
     <Head>
            {/*  <script
                // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: `
                                      window.fbAsyncInit = function() {
                        FB.init({
                          appId            : '1292493891481710',
                          autoLogAppEvents : true,
                          xfbml            : true,
                          version          : 'v16.0'
                        });
                      };
                    `,
                }}
              /> 
              <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>*/}
      </Head>
      <GoogleAnalytics trackPageViews />
        <ProgressBar/>
        {showHeader &&
        <div className="max-w-9xl mx-auto">
        <Navbar userdata = { pageProps.userdata } coindata={pageProps.coindata} notificationdata={pageProps.notificationdata} /> 
        </div>
       }

      <Component {...pageProps} />
    </ErrorBoundary>
    )
}


export async function getServerSideProps({req}) {


try{
    const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.PROD_URI }`
     const res = await fetch(`${url}/api/auth/login/success`, {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
    });
     const userdata = await res.json()

     const res5 =await fetch(`${url}/api/coins/allcoins/0`,{
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
     })

    const coindata = await res5.json()
    console.log("coindata",coindata,"+++++++++++++++++++++")

    const res4 = await fetch(`${url}/api/notifications`, {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
    });
    const notificationdata = await res4.json()

    

     return {
        props : {userdata,notificationdata,coindata}
     }
    

      }catch(err){
         return {
           props : {error:true,status:503}
        }
    }
    

}