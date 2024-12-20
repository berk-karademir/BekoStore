import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShopCards from '../components/ShopCards';

const ShopPage = () => {
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Shop</h1>
        <div className="text-sm">
          <Link to="/" className="text-gray-800 hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Shop</span>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        <div className="text-sm text-gray-600 mb-4">
          Showing all results
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* View Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm">Views:</span>
            <button 
              className={`p-2 border ${view === 'grid' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setView('grid')}
            >
              <i className="fas fa-th"></i>
            </button>
            <button 
              className={`p-2 border ${view === 'list' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setView('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>

          {/* Filter Controls */}
          <div className="flex gap-3">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded text-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <button className="bg-blue-500 text-white px-6 py-2 rounded">
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid with Background */}
      <div 
        className="relative py-16"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10">
          <ShopCards />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
