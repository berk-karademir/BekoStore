import React from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";

function Navbar() {
  return (
    <nav>
      <div className="flex items-center justify-evenly py-10">
        <h3>BekoStore</h3>
        
        <ul className="flex gap-3">
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

      
    </nav>
  );
}

export default Navbar;
