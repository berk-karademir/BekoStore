import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { fetchCategories } from "../services/fetchCategories";
import { ChevronDown } from "lucide-react";

function NavBarTitles() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  const handleShopClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/shop") {
      history.push("/shop");
    }
    setShowDropdown(!showDropdown);
  };

  const groupedCategories = {
    erkek: categories.filter((cat) => cat.gender === "e"),
    kadin: categories.filter((cat) => cat.gender === "k"),
  };

  return (
    <div className="">
      <div className="flex flex-col items-center text-[#737373] py-14 text-[25px] tracking-tight font-[500]">
        <ul className="text-center flex flex-col justify-center items-center gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a
              href="/shop"
              onClick={handleShopClick}
              className="flex justify-center items-center ml-4 pb-2"
            >
              Shop <ChevronDown />
            </a>

            {showDropdown && (
              <div className=" bg-white border rounded-lg shadow-xl">
                <div className="p-10 flex gap-14 relative">
                  <div>
                    <h3 className="font-bold text-2xl mb-2 text-black">
                      Kadın
                    </h3>
                    {groupedCategories.kadin.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop/kadin/${cat.title.toLowerCase()}/${cat.id}`}
                        className="block py-1 hover:text-blue-600"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                  <div
                    className="w-[1px] bg-gray-300 absolute h-full top-0"
                    style={{ left: "50%" }}
                  ></div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2 text-black">
                      Erkek
                    </h3>
                    {groupedCategories.erkek.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop/erkek/${cat.title.toLowerCase()}/${cat.id}`}
                        className="block py-1 hover:text-blue-600"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/team">Team</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBarTitles;
