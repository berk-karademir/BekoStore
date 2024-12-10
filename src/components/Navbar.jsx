import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import NavBarTitles from "./NavBarTitles";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            <Menu onClick={toggleMenu}/>
          </li>
        </ul>
      </div>
      {isMenuOpen && <NavBarTitles />}
    </nav>
  );
}

export default Navbar;
