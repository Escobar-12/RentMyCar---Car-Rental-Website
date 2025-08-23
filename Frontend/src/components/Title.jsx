import React from 'react'

const Title = ({title, subtitle, align}) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align=="left" && "md:items-start md:text-left"}`}>
        <h1 className='font-semibold text-4xl md:text-[40px] text-neutral-700 '>{title}</h1>
        <p className='text-sm font-semibold md:text-base text-gray-400/80 mt-2 max-w-156'>{subtitle}</p>
    </div>
  )
}

export default Title