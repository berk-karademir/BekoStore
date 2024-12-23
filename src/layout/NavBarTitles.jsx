import React from 'react'
import { Link } from 'react-router-dom'

function NavBarTitles() {
  return (
    <div>
      <div className="flex flex-col items-center text-[#737373] py-14 text-[25px] tracking-tight font-[500]">
        <ul className="text-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBarTitles
