import React from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="pt-10">
      <div className="flex justify-around">
        <h3>BekoStore</h3>
        <ul className="flex">
          <li>
            <User />
          </li>
          <li>
            <Search />
          </li>
          <li>
            <ShoppingCart />
          </li>
          <li>
            <Menu />
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center text-[#737373] py-12 text-[30px] tracking-tight font-[500]">
        <ul>
          <li>Home</li>
          <li>Product</li>
          <li>Pricing</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
