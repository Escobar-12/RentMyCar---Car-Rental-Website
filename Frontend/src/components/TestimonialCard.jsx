import React, { useRef } from 'react'

import { FaStar,FaRegStar,FaStarHalfAlt  } from "react-icons/fa";

const TestimonialCard = ({profile, userName, userLocation, rating=5, comment=""}) => {
    const cardRef = useRef(null);
    const handleMouseHover = (e) =>
    {
        if(window.innerWidth < 1024) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y-centerX)/8;
        const rotateY = (x-centerY)/8;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    const handleMouseLeave = () =>
    {
        const card = cardRef.current;
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }

    const renderStars = (starNum) => 
    {
        let arrStars = [];
        for(let i=1; i<=5; i++)
        {
            if(starNum>=i) arrStars.push(<FaStar className='text-blue-800' key={i}/>)
            else if(starNum>= i - 0.5) arrStars.push(<FaStarHalfAlt className='text-blue-800' key={i}/>)
            else {arrStars.push(<FaRegStar className='text-blue-800' key={i} />);}
        }
        return arrStars;
    }

  return (
    <div ref={cardRef} onMouseMove={handleMouseHover} onMouseLeave={handleMouseLeave}  className='flex flex-col gap-5 max-w-lg items-start shadow-xl rounded-2xl py-5 px-7 transition-transform duration-100 ease-in-out '
>
        <div className='flex flex-col gap-3 items-start'>
            <div className='flex gap-4 items-center'>
                <img src={profile} width={55} alt="profile" />
                <div className='flex flex-col'>
                    <h3 className='font-semibold text-neutral-700'>{userName}</h3>
                    <span className='text-sm font-semibold text-neutral-400'>{userLocation}</span>
                </div>
            </div>
            <div className="flex text-yellow-400">{renderStars(rating)}</div>
        </div>
        <div className='max-w-sm text-neutral-400 font-semibold'>"{comment}"</div>
    </div>
  )
}

export default TestimonialCard