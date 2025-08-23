import React from 'react'
import Title from './Title.jsx'
import TestimonialCard from './TestimonialCard.jsx'
import { assets } from '../assets/assets.js'

const TestimonialSec = () => {
  return (
    <div className='mt-30'>
        <Title title={"What Our Customers Say"} subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 sm:mt-20'>
            <TestimonialCard profile={assets.testimonial_image_1} userName={"User Name"} userLocation={"New York, USA"} comment='Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor'/>
            <TestimonialCard profile={assets.testimonial_image_2} userName={"User Name"} userLocation={"New York, USA"} comment='Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor'/>
            <TestimonialCard profile={assets.testimonial_image_1} userName={"User Name"} userLocation={"New York, USA"} comment='Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor'/>
        </div>
        
    </div>

  )
}

export default TestimonialSec