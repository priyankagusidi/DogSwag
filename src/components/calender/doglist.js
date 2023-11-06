    import Calendar from './calendar'
    import Addcontact from './addcontact'
    import Invite from './invite'
    import Dogdetail from './dogdetail'
    import DogProfiles from './dogProfiles'
    import VerifyPhoneNo from './verifyPhoneNo'
    import {useState} from 'react'
    const Index = ({userdata}) => {

      console.log(userdata)

      const [hasPhoneNumber,setHasPhoneNumber] = useState(userdata && userdata.user && userdata.user.hasphonenumber === true ? true:false)

      return (
       <div className="flex flex-col p-4 gap-5">
                   
       </div>
       )
    };

    export default Index;


