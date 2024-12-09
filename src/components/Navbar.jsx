import React from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";

function Navbar() {
  return (
    <nav>
      <div className="">
        <h2>BekoStore</h2>
        <ul>
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
