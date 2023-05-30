import React from 'react'
import Link from 'next/link'
import NavBar from './navbar/navbar'


const Header = () => {
  return (
    <div className={`flex flex-row items-center justify-between  lg:px-32`}>
        <div>
            <Link className={`font-semibold lg:text-3xl font-serif text-gray-700`} href="/">
                DevHub
            </Link>
        </div>
        <div>
            <NavBar />
        </div>
    </div>
  )
}

export default Header