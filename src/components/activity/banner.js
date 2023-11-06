import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader





const Header = () => {
  
   const images = [

   {
    image:"dog-banner_1.jpg",
   },
    {
    image:"dog-banner_2.jpg",
   }
   ,
    {
    image:"dog-banner_3.jpg",
   }
   
]

    return (
        <div className="mt-8 mx-auto ">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showArrows={false}
            >

            {
                images.map((img)=>{
                    return(
                          <img key={img.image} src={img.image} alt="dog-banner_1.jpg"/>
                        )
                })
            }
 
            </Carousel>
        </div>
    )
}

export default Header

