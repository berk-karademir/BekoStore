import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

function NavBarTitles() {
  return (
    <div>
      <div className="flex flex-col items-center text-[#737373] py-14 text-[30px] tracking-tight font-[500]">
        <ul className="text-center">
          <li>Home</li>
          <NavLink exact to="/" />
          <li>Product</li>
          <li>Pricing</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default NavBarTitles
