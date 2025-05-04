import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/fetchCategories";
import { filterCategories, sortItems } from "@/utils/categoryUtils";
import { useHistory } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      if (
        Array.isArray(fetchedCategories) &&
        fetchedCategories.every((category) => typeof category === "object")
      ) {
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

  const topCategories = categories
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const handleCategoryClick = (category) => {
    const gender = category.gender === "k" ? "kadin" : "erkek";
    history.push(
      `/shop/${gender}/${category.title.toLowerCase()}/${category.id}`
    );
  };

  return (
    <section className="my-20">
      <h3 className=" text-center text-3xl font-bold mb-20">Top Categories</h3>
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full bg-gray-100">
        {topCategories.map((category) => (
          <div
            key={category.id}
            className=" relative cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleCategoryClick(category)}
          >
            <img
              className=" rounded-lg w-full h-auto object-cover aspect-[4/3]"
              src={category.img}
              alt={category.title}
            />
            <div className="rounded-b-lg absolute bottom-0 left-0 right-0 max-w-[full] bg-black bg-opacity-50 text-white text-center p-2 text-[20px]">
              {category.gender === "k" ? "Kadın" : "Erkek"} {category.title} (
              {category.rating}⭐)
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
