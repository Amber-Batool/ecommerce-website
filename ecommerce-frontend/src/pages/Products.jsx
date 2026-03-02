

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";



export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState("Best Match");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  // Fetch all products from backend
  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter + Sort + Search logic
  useEffect(() => {
    let filtered = [...products];

    // Category Filter
    if (categoryFilter.length > 0) {
      filtered = filtered.filter(p => categoryFilter.includes(p.category));
    }

    // Search Filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, sortOrder, searchTerm, products]);

  const handleCategoryChange = (category) => {
    setCategoryFilter(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-4 gap-6">

      {/* Sidebar */}
      <aside className="bg-white p-5 rounded-xl shadow-sm space-y-8 h-fit">
        {/* Category */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">Category</h3>
          {["Electronics", "Fashion", "HomeDecor", "Tech"].map(c => (
            <label key={c} className="flex items-center text-sm mb-2 cursor-pointer hover:text-blue-600">
              <input
                type="checkbox"
                className="mr-2 accent-blue-600"
                checked={categoryFilter.includes(c)}
                onChange={() => handleCategoryChange(c)}
              />
              {c}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">Price Range</h3>
          <input type="range" className="w-full accent-blue-600" min="0" max="1000" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">Rating</h3>
          {[5, 4, 3].map(r => (
            <label key={r} className="flex items-center text-sm mb-2 cursor-pointer hover:text-blue-600">
              <input type="checkbox" className="mr-2 accent-blue-600" />
              <span className="text-yellow-500 mr-1">{"⭐".repeat(r)}</span>
              & up
            </label>
          ))}
        </div>
      </aside>

      {/* Products */}
      <div className="lg:col-span-3 space-y-4">

        {/* Top Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md w-1/2"
          />
          <select
            className="border px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option>Best Match</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Product Cards */}
        {filteredProducts.map(product => {
          const inWishlist = wishlist.some(item => item._id === product._id);

          return (
            <div
              key={product._id}
              className="bg-white p-5 rounded-xl shadow-md flex gap-5 hover:shadow-lg transition duration-300 relative"
            >
              {/* Product Image */}
              <img
                src={`http://localhost:5000/images/${product.image}`}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg shadow-sm"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h3
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="font-semibold text-lg text-blue-600 hover:underline cursor-pointer"
                >
                  {product.name}
                </h3>

                <p className="text-orange-600 font-bold mt-2 text-lg">${product.price}</p>

                <div className="text-yellow-500 text-sm mt-1">
                  ⭐⭐⭐⭐☆ <span className="text-gray-500 ml-1">(24)</span>
                </div>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  High quality product with excellent supplier rating and fast delivery.
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition text-sm"
                  >
                    Add to cart
                  </button>

                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="text-sm text-blue-600 border border-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-50 transition"
                  >
                    View details
                  </button>
                </div>
              </div>

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 right-3 text-xl ${inWishlist ? "text-red-500" : "text-gray-400"}`}
              >
                {inWishlist ? "❤️" : "🤍"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}




