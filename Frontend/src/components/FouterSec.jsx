import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const FouterSec = () => {
  return (
    <div className='bg-bg'>
        <div className='max-w-[1400px] py-10 mx-auto px-4 md:px-8 lg:px-16 w-full  flex flex-col gap-10'>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className='flex flex-col gap-4 '>
                    <Link to={'/'} className=''>
                        <img src={assets.logo} alt="Company Logo" className="object-contain w-auto " />
                    </Link>
                    <p className='text-sm text-neutral-400 max-w-sm'>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. </p>
                    <div className='flex gap-3'>
                        <img src={assets.facebook_logo} alt="facebook" />
                        <img src={assets.instagram_logo} alt="instagram" />
                        <img src={assets.twitter_logo} alt="twitter" />
                        <img src={assets.gmail_logo} alt="gmail" />
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3 space-y-5 mt-6'>
                    <div className='flex flex-col gap-3'>
                        <h4 className='font-semibold'>QUICK LINKS</h4>
                        <div className='flex flex-col gap-2 text-sm text-neutral-400/80'>
                            <Link to={'/'}>Home</Link>
                            <Link to={'/'}>Browse Cars</Link>
                            <Link to={'/'}>List Your Car</Link>
                            <Link to={'/'}>About Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h4 className='font-semibold'>RESOURCES</h4>
                        <div className='flex flex-col gap-2 text-sm text-neutral-400/80'>
                            <Link to={'/'}>Help Center</Link>
                            <Link to={'/'}>Terms of Service</Link>
                            <Link to={'/'}>Privacy</Link>
                            <Link to={'/'}>Insurance</Link>
                        </div>
                    </div><div className='flex flex-col gap-3'>
                        <h4 className='font-semibold'>CONTACT</h4>
                        <div className='flex flex-col gap-2 text-sm text-neutral-400/80'>
                            <Link to={'/'}>1234 Luxury Drive</Link>
                            <Link to={'/'}>San Fransisco, CA 94107</Link>
                            <Link to={'/'}>+1(555) 123-4567</Link>
                            <Link to={'/'}>car@mail.som</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-neutral-400/60 h-0.5'></div>
            <div className='flex items-center justify-between text-neutral-400'>
                <p>© 2025 RentMyCar. All rights reserved.</p>
                <div className='flex items-center justify-between gap-4'>
                    <p>Terms</p>
                    <p>Privacy</p>
                    <p>Cookies</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FouterSec