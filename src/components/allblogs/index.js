import UserList from './userlist'
import MemeList from './memelist'
import BlogList from './bloglist'

const Blog = ({blogdata,userdata}) => {
  return (
    <div className="flex flex-col lg:flex-row mt-10 gap-5 max-w-6xl mx-auto"> 
     <div className="lg:w-8/12">
      <BlogList blogdata={blogdata} userdata={userdata}/>
     </div>
      <div className="lg:w-4/12 font-[poppins] px-5 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
         <UserList userdata={userdata}/>
         {/*<MemeList/>*/}
        </div>
      </div>

    </div>
  )
}

export default Blog
