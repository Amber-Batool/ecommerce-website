
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  HomeIcon, 
  ShoppingBagIcon,
  HeartIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const resize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?search=${searchQuery}`);
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600">Brand</Link>

        {/* Search Form */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 relative"
        >
          <input
            className="flex-1 border border-blue-500 px-3 py-2 rounded-l focus:outline-none"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-24 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}

          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 rounded-r"
          >
            Search
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-xs items-center">
          <Link to="/products" className="flex flex-col items-center hover:text-blue-600 transition">
            <Squares2X2Icon className="h-6 w-6 mb-1" />
            <span>Products</span>
          </Link>

          <button 
            onClick={() => navigate("/wishlist")} 
            className="relative flex flex-col items-center hover:text-red-500 transition"
          >
            <HeartIcon className="h-6 w-6 mb-1" />
            <span>Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {wishlist.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => navigate("/cart")} 
            className="relative flex flex-col items-center hover:text-green-600 transition"
          >
            <ShoppingBagIcon className="h-6 w-6 mb-1" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 right-2 bg-green-600 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMenuOpen(true)} 
          className="md:hidden text-2xl ml-auto"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-16 right-4 w-64 bg-white shadow-xl rounded-lg 
        transform transition-all duration-300 
        ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="p-4 flex justify-between border-b">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <nav className="p-4 flex flex-col gap-5 text-sm">
          <Link 
            to="/" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 hover:text-blue-600 transition"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>

          <Link 
            to="/products" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 hover:text-blue-600 transition"
          >
            <Squares2X2Icon className="h-5 w-5" />
            <span>Products</span>
          </Link>

          <Link 
            to="/wishlist" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between hover:text-red-500 transition"
          >
            <div className="flex items-center gap-3">
              <HeartIcon className="h-5 w-5" />
              <span>Wishlist</span>
            </div>
            {wishlist.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link 
            to="/cart" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between hover:text-green-600 transition"
          >
            <div className="flex items-center gap-3">
              <ShoppingBagIcon className="h-5 w-5" />
              <span>Cart</span>
            </div>
            {cartItems.length > 0 && (
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}