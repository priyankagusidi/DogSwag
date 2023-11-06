// import styles from '@/styles/Home.module.css'
import Profile from '@/components/profile/index.js'
import Footer from '@/components/footer'
import Head from 'next/head'
const index = (props) => {

  const title = `DogSwag - ${props.userprofiledata.user ? props.userprofiledata.user.username:"cant find this user"}` 
  return (
    <div>
      <Head>
          <title>{title}</title>
            <meta name="description" content={props.userprofiledata.user ? props.userprofiledata.user.bio:"no bio"} key="desc" />
            <meta property="og:title" content={props.userprofiledata.user ? props.userprofiledata.user.username:"cant find this user"} />
            <meta property="og:description" content={props.userprofiledata.user ?props.userprofiledata.user.bio:"no bio"}/>
            <link rel="icon" href="/img/logo.png" />
            <meta property="og:url" content={props.userprofiledata.user ?`https://dogswag.club/profile?user=${props.userprofiledata.user.infoID}`:"https://dogswag.club"}/>
            <meta property="og:type" content="Blogging website"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <meta charSet="utf-8"></meta>
            <link rel="canonical" href={props.userprofiledata.user ?`https://dogswag.club/profile?user=${props.userprofiledata.user.infoID}`:"https://dogswag.club"}/>
            <meta property="og:image" content={props.userprofiledata.user ?props.userprofiledata.user.profilePic:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}/>
            <meta name="keywords" content="Dog blogs, Canine experiences, Dog owners community, Dog lovers forum, Dogswag blogs, Pet blogs, Canine stories, Dogswag experiences, Pawsome stories, Dog blog community, Dogswag forum, Share your dog experiences, Best dog blogs, Dogswag writers, Canine bloggers, PetBlogPay, PawsWrite, BarkEarn, FurryWords, WoofWage, CanineCoin, TailTalesPay, BlogBark, PetProsePay, InvitePaw, Pet Blogging Platform - An exclusive invite-only platform where pet parents and experienced bloggers can share their knowledge and expertise about dogs, their behavior, health, diet, and training techniques Pay Per Minute - A unique earning opportunity for pet bloggers who will be paid by the minute for every user read time. The more readers engage with your content, the more you earn, Focused on Canines - This platform is exclusively focused on dogs, allowing bloggers and pet parents to share their experiences, advice, and expertise about their furry companions, Educational and Engaging - Our platform is dedicated to providing high-quality content that is both educational and engaging. Pet parents can find answers to their questions, while bloggers can share their expertise and earn money, Community-Driven - Our platform is a community-driven space where pet bloggers and parents can interact, share ideas, and support each other in their pet-related endeavors, Vetted Members - All members of our platform are vetted to ensure that the content shared is authentic, reliable, and useful for our readers. This way, we maintain the quality of our platform and uphold the trust of our readers, Growing Network - Our platform is constantly expanding, bringing together pet lovers and experts from all around the world. As we grow, we continue to provide new opportunities for bloggers to earn money by sharing their knowledge about dogs, Personalized Experience - Our platform provides a personalized experience for both readers and bloggers. Readers can find content tailored to their specific needs and interests, while bloggers can target specific audiences and earn more money, User-Friendly Interface - Our platform is easy to use, with a simple and intuitive interface that allows bloggers to focus on creating quality content and earning money, write blog and earn money" />
      </Head>
      <Profile userdata = { props.userdata } userprofiledata={props.userprofiledata.user} blogdata={props.blogdata}/>
      <Footer/>
    </div>
  )
}


export async function getServerSideProps(ctx) {
     try{
     const {userid} = ctx.params

     const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.PROD_URI }`
    
     const res = await fetch(`${url}/api/auth/login/success`, {
        withCredentials: true,
        headers: {
            Cookie: ctx.req.headers.cookie
        }
    });

     const userdata = await res.json()

     const res2 =await fetch(`${url}/api/info/getprofile/${userid}`)
     const userprofiledata = await res2.json()

     
    const res4 =await fetch(`${url}/api/blogs/blog/author/${userid}&0`)
    const blogdata = await res4.json()
     
   const res5 = await fetch(`${url}/api/notifications`, {
        withCredentials: true,
        headers: {
            Cookie: ctx.req.headers.cookie
        }
    });
    const notificationdata = await res5.json() 

     return {
        props : {userdata , userprofiledata,blogdata ,notificationdata}
     }    

       }catch(err){
         return {
           props : {error:true,status:503}
        }
    }
    

}

export default index

