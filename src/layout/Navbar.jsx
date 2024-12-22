import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import NavBarTitles from "./NavBarTitles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.client.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUserClick = () => {
    // Check both Redux state and localStorage
    const storedUser = localStorage.getItem('user');
    const hasUser = user && Object.keys(user).length > 0;
    const hasStoredUser = storedUser && storedUser !== 'undefined';

    

    if (hasUser || hasStoredUser) {
      console.log("User is logged in, navigating to profile");
      history.push("/profile");
    } else {
      console.log("No user found, navigating to signup");
      history.push("/signup");
    }
  };

  return (
    <nav>
      <div className={`flex items-center justify-evenly pt-10 ${isMenuOpen ? '' : 'pb-10'}`} >
        <h3 onClick={() => history.push("/")}>BekoStore</h3>
        
        <ul className="flex gap-3">
          <li>
            <User onClick={handleUserClick} style={{ cursor: "pointer" }} />
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
