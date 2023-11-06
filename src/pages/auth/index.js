import VetLogin from '@/components/auth'

export default function Index({userdata}){
	return(
		 <VetLogin userdata={userdata}/>
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


      if(userdata?.user && userdata?.user?.isDoctor){
        return {
          redirect: {
            permanent: false,
            destination: `/doctor`,
          }
        }
      }

      if(userdata?.user && !userdata?.user?.isDoctor){
        return {
          redirect: {
            permanent: false,
            destination: `/vetchat`,
          }
        }
      }
     

     return {
        props : {userdata}
     }

    }catch(err){
         return {
           props : {error:true,status:503}
        }
    }
    
    

}

