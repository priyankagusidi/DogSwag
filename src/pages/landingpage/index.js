import Header from "@/components/header"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Testimonial from "@/components/testimonial"
import Supporter from "@/components/supporter"
import PricePlans from "@/components/priceplans"

const index =()=>{
    return (
<div className="max-w-screen-2xl mx-auto bg-white">
<Navbar/>
<Header/>
<Services/>
<Testimonial/>
<Supporter></Supporter>
<PricePlans></PricePlans>
</div>  
  )
}


export default index