
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Cara({images,style}){


// const images = [
//   "/img/coin_slider/11.webp",
//   "/img/coin_slider/22.webp",
//   "/img/coin_slider/33.webp",
//   "/img/coin_slider/44.webp",
//   "/img/coin_slider/55.webp",
// ];

        return (
            <Carousel
            autoPlay
            infiniteLoop  
            showThumbs  ={false}
            >
             {
               images && images.map((m,i)=>{
                    return(
                           <img key={i} src={m} className={style}/>
                        )
                })
             }
            </Carousel>
        );
    }

