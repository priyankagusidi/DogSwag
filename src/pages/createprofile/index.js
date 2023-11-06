import CreateProfile from  '@/components/createprofile'
import Head from 'next/head'
import {m_title,m_description} from '@/meta/index'

const Index = (props) => {
    return (
      <section className='h-screen'> 
         <Head>
          <title>DogSwag - Create Profile</title>
        
            <meta name="description" content={m_description} key="desc" />
            <meta property="og:title" content={m_title}/>
            <meta property="og:description" content={m_description}/>
            <link rel="icon" href="/img/logo.png" />
            <meta property="og:url" content="https://dogswag.club/"/>
            <meta property="og:type" content="Blogging website"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <meta charSet="utf-8"></meta>
            <meta name="google-site-verification" content="Hv9JsVd4FGvDsHikaGYqshKLHZA4ji-CVZh3oq58GJU" />
            <link rel="canonical" href="https://dogswag.club/" key="canonical"/>
            <meta property="og:image" content="/img/logo.png"/>
            <meta name="keywords" content="Dog blogs, Canine experiences, Dog owners community, Dog lovers forum, Dogswag blogs, Pet blogs, Canine stories, Dogswag experiences, Pawsome stories, Dog blog community, Dogswag forum, Share your dog experiences, Best dog blogs, Dogswag writers, Canine bloggers, PetBlogPay, PawsWrite, BarkEarn, FurryWords, WoofWage, CanineCoin, TailTalesPay, BlogBark, PetProsePay, InvitePaw, Pet Blogging Platform - An exclusive invite-only platform where pet parents and experienced bloggers can share their knowledge and expertise about dogs, their behavior, health, diet, and training techniques Pay Per Minute - A unique earning opportunity for pet bloggers who will be paid by the minute for every user read time. The more readers engage with your content, the more you earn, Focused on Canines - This platform is exclusively focused on dogs, allowing bloggers and pet parents to share their experiences, advice, and expertise about their furry companions, Educational and Engaging - Our platform is dedicated to providing high-quality content that is both educational and engaging. Pet parents can find answers to their questions, while bloggers can share their expertise and earn money, Community-Driven - Our platform is a community-driven space where pet bloggers and parents can interact, share ideas, and support each other in their pet-related endeavors, Vetted Members - All members of our platform are vetted to ensure that the content shared is authentic, reliable, and useful for our readers. This way, we maintain the quality of our platform and uphold the trust of our readers, Growing Network - Our platform is constantly expanding, bringing together pet lovers and experts from all around the world. As we grow, we continue to provide new opportunities for bloggers to earn money by sharing their knowledge about dogs, Personalized Experience - Our platform provides a personalized experience for both readers and bloggers. Readers can find content tailored to their specific needs and interests, while bloggers can target specific audiences and earn more money, User-Friendly Interface - Our platform is easy to use, with a simple and intuitive interface that allows bloggers to focus on creating quality content and earning money, write blog and earn money" />          
      </Head>        
         <CreateProfile userdata={props.userdata}/>
      </section>

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

     if(!userdata.user){
        return {
          redirect: {
            permanent: false,
            destination: "/login?reqinfo=eyJ0eXBlIjoiY3JlYXRlcHJvZmlsZSJ9",
          }
        }
    }


    const res2 =await fetch(`${url}/api/info/getprofile/${userdata.user._id}`)
    const userprofiledata = await res2.json()

    console.log("userprofiledata",userprofiledata)

    if(!userprofiledata.error){
        return {
          redirect: {
            permanent: false,
            destination: `/profile/${userdata.user._id}`,
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

export default Index






const breeds = [
    { value: 'afghan hound', label: 'Afghan hound' },
    { value: 'airedale terrier', label: 'Airedale terrier' },
    { value: 'akita', label: 'Akita' },
    { value: 'alaskan Malamute', label: 'Alaskan Malamute' },
    { value: 'american Staffordshire terrier', label: 'American Staffordshire terrier' },
    { value: 'american water spaniel', label: 'American water spaniel' },
    { value: 'australian cattle dog', label: 'Australian cattle dog' },
    { value: 'australian shepherd', label: 'Australian shepherd' },
    { value: 'australian terrier', label: 'Australian terrier' },
    { value: 'aasenji', label: 'basenji' },
    { value: 'aasset hound', label: 'basset hound' },
    { value: 'beagle', label: 'beagle' },
    { value: 'bearded collie', label: 'bearded collie' },
    { value: 'bedlington terrier', label: 'Bedlington terrier' },
    { value: 'bernese mountain dog', label: 'Bernese mountain dog' },
    { value: 'bichon frise', label: 'bichon frise' },
    { value: 'black and tan coonhound', label: 'black and tan coonhound' },
    { value: 'bloodhound', label: 'bloodhound' },
    { value: 'border collie', label: 'border collie' },
    { value: 'border terrier', label: 'border terrier' },
    { value: 'borzoi', label: 'borzoi' },
    { value: 'boston terrier', label: 'Boston terrier' },
    { value: 'bouvier des Flandres', label: 'bouvier des Flandres' },
    { value: 'boxer', label: 'boxer' },
    { value: 'briard', label: 'briard' },
    { value: 'brittany', label: 'Brittany' },
    { value: 'brussels griffon', label: 'Brussels griffon' },
    { value: 'bull terrier', label: 'bull terrier' },
    { value: 'bulldog', label: 'bulldog' },
    { value: 'bullmastiff', label: 'bullmastiff' },
    { value: 'cairn terrier', label: 'cairn terrier' },
    { value: 'banaan dog', label: 'Canaan dog' },
    { value: 'bhesapeake Bay retriever', label: 'Chesapeake Bay retriever' },
    { value: 'bhihuahua', label: 'Chihuahua' },
    { value: 'bhinese crested', label: 'Chinese crested' },
    { value: 'bhinese shar-pei', label: 'Chinese shar-pei' },
    { value: 'chow chow', label: 'chow chow' },
    { value: 'blumber spaniel', label: 'Clumber spaniel' },
    { value: 'cocker spaniel', label: 'cocker spaniel' },
    { value: 'collie', label: 'collie' },
    { value: 'curly-coated retriever', label: 'curly-coated retriever' },
    { value: 'dachshund', label: 'dachshund' },
    { value: 'balmatian', label: 'Dalmatian' },
    { value: 'boberman pinscher', label: 'Doberman pinscher' },
    { value: 'bnglish cocker spaniel', label: 'English cocker spaniel' },
    { value: 'bnglish setter', label: 'English setter' },
    { value: 'bnglish springer spaniel', label: 'English springer spaniel' },
    { value: 'bnglish toy spaniel', label: 'English toy spaniel' },
    { value: 'bskimo dog', label: 'Eskimo dog' },
    { value: 'binnish spitz', label: 'Finnish spitz' },
    { value: 'flat-coated retriever', label: 'flat-coated retriever' },
    { value: 'fox terrier', label: 'fox terrier' },
    { value: 'foxhound', label: 'foxhound' },
    { value: 'French bulldog', label: 'French bulldog' },
    { value: 'berman shepherd', label: 'German shepherd' },
    { value: 'berman shorthaired pointer', label: 'German shorthaired pointer' },
    { value: 'berman wirehaired pointer', label: 'German wirehaired pointer' },
    { value: 'golden retriever', label: 'golden retriever' },
    { value: 'bordon setter', label: 'Gordon setter' },
    { value: 'breat Dane', label: 'Great Dane' },
    { value: 'greyhound', label: 'greyhound' },
    { value: 'irish setter', label: 'Irish setter' },
    { value: 'irish water spaniel', label: 'Irish water spaniel' },
    { value: 'irish wolfhound', label: 'Irish wolfhound' },
    { value: 'jack Russell ', label: 'Jack Russell ' },
    { value: 'terrier', label: 'terrier' },
    { value: 'japanese spaniel', label: 'Japanese spaniel' },
    { value: 'keeshond', label: 'keeshond' },
    { value: 'kerry blue terrier', label: 'Kerry blue terrier' },
    { value: 'komondor', label: 'komondor' },
    { value: 'kuvasz', label: 'kuvasz' },
    { value: 'labrador retriever', label: 'Labrador retriever' },
    { value: 'lakeland terrier', label: 'Lakeland terrier' },
    { value: 'lhasa apso', label: 'Lhasa apso' },
    { value: 'maltese', label: 'Maltese' },
    { value: 'manchester terrier', label: 'Manchester terrier' },
    { value: 'mastiff', label: 'mastiff' },
    { value: 'mexican hairless', label: 'Mexican hairless' },
    { value: 'ewfoundland', label: 'Newfoundland' },
    { value: 'orwegian elkhound', label: 'Norwegian elkhound' },
    { value: 'orwich terrier', label: 'Norwich terrier' },
    { value: 'otterhound', label: 'otterhound' },
    { value: 'papillon', label: 'papillon' },
    { value: 'Pekingese', label: 'Pekingese' },
    { value: 'pointer', label: 'pointer' },
    { value: 'Pomeranian', label: 'Pomeranian' },
    { value: 'poodle', label: 'poodle' },
    { value: 'pug', label: 'pug' },
    { value: 'puli', label: 'puli' },
    { value: 'rhodesian ridgeback', label: 'Rhodesian ridgeback' },
    { value: 'rottweiler', label: 'Rottweiler' },
    { value: 'saint Bernard', label: 'Saint Bernard' },
    { value: 'saluki', label: 'saluki' },
    { value: 'samoyed', label: 'Samoyed' },
    { value: 'schipperke', label: 'schipperke' },
    { value: 'schnauzer', label: 'schnauzer' },
    { value: 'scottish deerhound', label: 'Scottish deerhound' },
    { value: 'scottish terrier', label: 'Scottish terrier' },
    { value: 'sealyham terrier', label: 'Sealyham terrier' },
    { value: 'shetland sheepdog', label: 'Shetland sheepdog' },

];