import React from 'react'
import { MenuItem } from './menuitem'
import { IoIosMenu } from 'react-icons/io'

const navlist = [
    {
        name: 'Log In',
        href: '/',
        btntype: 'primary'
    },
    {
        name: 'Get Started',
        href: '/',
        btntype: 'secondary'
    },
    {
        name: (
            <div>
                <IoIosMenu className={`text-2xl font-semibold`} />
            </div>
        ),
        href: '/',
        btntype: 'other'
    }
]

const NavBar = () => {
    return (
        <div className={`flex flex-row gap-4 lg:w-64 justify-evenly`}>
            {navlist.map((item, idx) => (
                <MenuItem key={idx} href={item.href} btntype={item.btntype} >{item.name}</MenuItem>
            ))}
        </div>
    )
}

export default NavBar