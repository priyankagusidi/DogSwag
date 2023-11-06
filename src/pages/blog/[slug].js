// import styles from '@/styles/Home.module.css'
import SingleBlog from '@/components/blog'
import Head from 'next/head'

const index = (props) => {


const title = `DogSwag - ${props.blogdata ? props.blogdata.title:'not found'}`
console.log(props.blogdata.coverimage.path)
  return (
    <div>
       <Head>
          <title>{title}</title>
            <meta name="description" content={props.blogdata ? props.blogdata.description : "no description"} key="desc" />
            <meta property="og:title" content={props.blogdata ? props.blogdata.title : "not found"} />
            <meta property="og:description" content={props.blogdata ?props.blogdata.description : "no description"}/>
            <link rel="icon" href="/img/logo.png" />
            <meta name="google-site-verification" content="Hv9JsVd4FGvDsHikaGYqshKLHZA4ji-CVZh3oq58GJU" />
            <meta property="og:url" content={props.blogdata ?  `https://dogswag.club/blog/${props.blogdata.slug}`:"https://dogswag.club"}/>
            <meta property="og:type" content="Blogging website"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <meta charSet="utf-8"></meta>
            <link rel="canonical" href={props.blogdata ?  `https://dogswag.club/blog/${props.blogdata.slug}`:"https://dogswag.club"}/>
            <meta property="og:image" content={props.blogdata && props.blogdata.coverimage ? props.blogdata.coverimage.path : "https://via.placeholder.com/1080x720.png"}/>
            <meta name="keywords" content="Dog blogs, Canine experiences, Dog owners community, Dog lovers forum, Dogswag blogs, Pet blogs, Canine stories, Dogswag experiences, Pawsome stories, Dog blog community, Dogswag forum, Share your dog experiences, Best dog blogs, Dogswag writers, Canine bloggers, PetBlogPay, PawsWrite, BarkEarn, FurryWords, WoofWage, CanineCoin, TailTalesPay, BlogBark, PetProsePay, InvitePaw, Pet Blogging Platform - An exclusive invite-only platform where pet parents and experienced bloggers can share their knowledge and expertise about dogs, their behavior, health, diet, and training techniques Pay Per Minute - A unique earning opportunity for pet bloggers who will be paid by the minute for every user read time. The more readers engage with your content, the more you earn, Focused on Canines - This platform is exclusively focused on dogs, allowing bloggers and pet parents to share their experiences, advice, and expertise about their furry companions, Educational and Engaging - Our platform is dedicated to providing high-quality content that is both educational and engaging. Pet parents can find answers to their questions, while bloggers can share their expertise and earn money, Community-Driven - Our platform is a community-driven space where pet bloggers and parents can interact, share ideas, and support each other in their pet-related endeavors, Vetted Members - All members of our platform are vetted to ensure that the content shared is authentic, reliable, and useful for our readers. This way, we maintain the quality of our platform and uphold the trust of our readers, Growing Network - Our platform is constantly expanding, bringing together pet lovers and experts from all around the world. As we grow, we continue to provide new opportunities for bloggers to earn money by sharing their knowledge about dogs, Personalized Experience - Our platform provides a personalized experience for both readers and bloggers. Readers can find content tailored to their specific needs and interests, while bloggers can target specific audiences and earn more money, User-Friendly Interface - Our platform is easy to use, with a simple and intuitive interface that allows bloggers to focus on creating quality content and earning money, write blog and earn money" />
      </Head>
      <SingleBlog blogdata={props.blogdata} userdata={props.userdata} ipdata={props.ipdata}/>
    </div>
  )
}


export async function getServerSideProps(ctx) {
   
try{
     const {slug} = ctx.params
   

     console.log("--------------------------------------------",slug)
     const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.PROD_URI }`
     const res = await fetch(`${url}/api/auth/login/success`, {
        withCredentials: true,
        headers: {
            Cookie: ctx.req.headers.cookie
        }
    });
     const userdata = await res.json()

       return {
              redirect: {
                permanent: false,
                destination: `/commingsoon`,
              }
            }


    
        const res2 =await fetch(`${url}/api/blogs/blog/${slug}`,{
            withCredentials: true,
            headers: {
                Cookie: ctx.req.headers.cookie
            }
        })


        const blogdata = await res2.json()   

        if(!blogdata._id){
        return {
          redirect: {
            permanent: false,
            destination: `/notfound`,
          }
        }
    }    
       

    const res4 =await fetch(`${url}/ip/192.168.1.2`)
    const ipdata = await res4.json()

const res5 = await fetch(`${url}/api/notifications`, {
        withCredentials: true,
        headers: {
            Cookie: ctx.req.headers.cookie
        }
    });
    const notificationdata = await res5.json()
     

     return {
        props : {userdata,blogdata,ipdata,notificationdata}
     }

       }catch(err){
         return {
           props : {error:true,status:503}
        }
    }
    
    

}

export default index



