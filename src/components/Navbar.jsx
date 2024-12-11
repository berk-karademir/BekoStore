import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import NavBarTitles from "./NavBarTitles";
import { useHistory } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToSignUp = () => {
    history.push("/signup");
  };

  return (
    <nav>
      <div className="flex items-center justify-evenly py-10">
        <h3>BekoStore</h3>
        
        <ul className="flex gap-3">
          <li>
            <User onClick={goToSignUp} style={{ cursor: "pointer" }} />
          </li>
          <li>
            <Search />
          </li>
          <li>
            <ShoppingCart />
          </li>
          <li>
            <Menu onClick={toggleMenu} />
          </li>
        </ul>
      </div>
      {isMenuOpen && <NavBarTitles />}
    </nav>
  );
}

export default Navbar;
