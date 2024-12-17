import React from "react";

function Blog() {
  return (
    <section className="flex flex-col items-center justify-center mx-auto my-20">
        <h5 className="text-[#23A6F0]">Practice Advice</h5>
        <h2 className="max-w-[60%] text-center">Featured Products</h2>
      {/* Card Container */}
      <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <div className="w-full ">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Colorful Abstract"
              className="object-cover w-full h-full"
            />
          </div>
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            NEW
          </span>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="text-sm text-gray-500 space-x-2 mb-2">
            <span className="text-blue-600 font-semibold">Google</span>
            <span>Trending</span>
            <span>New</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Loudest à la Madison #1 (L'integral)
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            We focus on ergonomics and meeting you where you work. It's only a
            keystroke away.
          </p>

          {/* Date and Comments */}
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7v10l8-5-8-5z"
                />
              </svg>
              <span>31 December 2024</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v8a2 2 0 002 2h2m10-12V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0H7"
                />
              </svg>
              <span>10 comments</span>
            </div>
          </div>
        </div>

        {/* Learn More */}
        <div className="border-t px-6 py-4">
          <a
            href="#"
            className="text-blue-600 font-semibold hover:underline flex items-center"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Blog;
