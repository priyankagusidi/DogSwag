// import styles from '@/styles/Home.module.css'
import Pay from '@/components/pay/index'
import Footer from '@/components/footer'
import Head from 'next/head'
const index = (props) => {

  return (
    <div>
      <Head>
          <title>Success</title>
      </Head>
      <Pay userdata = { props.userdata } />
    </div>
  )
}


export async function getServerSideProps({req,params}) {

try{
     const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.PROD_URI }`
     const res = await fetch(`${url}/api/auth/login/success`, {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
    });
     const userdata = await res.json()
     

     return {
        props : {userdata}
     }

       }catch(err){
         return {
           props : {error:true,status:503}
        }
    }
    
    

}

export default index