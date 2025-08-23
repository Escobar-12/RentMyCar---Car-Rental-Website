import React from 'react'
import HeroSec from '../components/HeroSec'
import FeaturesSec from '../components/FeaturesSec'
import Banner from '../components/Banner'
import TestimonialSec from '../components/TestimonialSec'
import SubscribeSec from '../components/SubscribeSec'
import FouterSec from '../components/FouterSec'
import BrandSec from '../components/BrandSec'
const HomeMainPage = () => {
  return (
    <>
    <HeroSec/>
    <div className='max-w-[1400px] min-h-screen mx-auto mb-40 px-4 md:px-8 lg:px-16 w-full'>
      <FeaturesSec/>
      <Banner/>
      <TestimonialSec/>
      <SubscribeSec/>
      <BrandSec/>
    </div>
    <FouterSec/>
    </>
  )
}

export default HomeMainPage