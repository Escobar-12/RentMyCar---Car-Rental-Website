import React from 'react'
import { Link } from 'react-router-dom'

const CustomButton = ({Lable, redirect=true, to='/', onClick, hover=true, className=""}) => {
  const commonClasse = ` CustomB ${className} cursor-pointer text-center text-white text-md xl:text-lg font-semibold px-4 xl:px-6 py-2 min-h-12 min-w-26 `;
  
    if(redirect)
    {
      return (
        <Link to={to} onClick={onClick} className={commonClasse}>
            {Lable}
        </Link>
      )
    }
    return (
      <button onClick={onClick} className={commonClasse}>
          {Lable}
      </button>
    )
}

export default CustomButton