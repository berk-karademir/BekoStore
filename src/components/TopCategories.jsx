import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/fetchCategories";
import { filterCategories, sortItems } from '@/utils/categoryUtils';

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // Set to empty string by default

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      if (Array.isArray(fetchedCategories) && fetchedCategories.every(category => typeof category === 'object')) {
        setCategories(fetchedCategories);
      } else {
        console.error(
          "Fetched categories is not a valid array of objects:",
          fetchedCategories
        );
      }
    };
    getCategories();
  }, []);

  // Filter categories based on selected gender
  const filteredCategories = filterCategories(categories, selectedGender);

  // Sorting logic
  const sortedItems = sortItems(filteredCategories, sortOrder);

  const topCategories = categories.sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <section>
      <div className="flex flex-col items-center gap-10">
        <h5>Home &#10095; <span className="text-[#737373]">Shop</span></h5>
        <div className="flex flex-col items-center">
        </div>
        <div className="flex flex-col items-center gap-10">
          <h3>Top Categories</h3>
          <div className="flex flex-col gap-20">
            {topCategories.map((category) => (
              <div key={category.id} className="relative">
                <img
                  className="w-screen h-auto"
                  src={category.img}
                  alt={category.title}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 text-[20px]">
                  {category.gender === "k" ? "Kadın" : "Erkek"} {category.title} (
                  {category.rating}⭐)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default TopCategories;