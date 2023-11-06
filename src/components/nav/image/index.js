
export default function index({userdata}){

	return (
	
		    <img 
               className="rounded-full w-10 h-10 object-cover border" 
               src={userdata && userdata.user && userdata.user.profilePic || '/img/defaultprofile.jpg'} 
            />
            

		)
}