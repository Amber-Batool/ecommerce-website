
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategorySidebar from "../components/CategorySidebar";
import ProductCard from "../components/ProductCard";
import heroImage from "../assets/hero.png";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart(); // 🔥 Use context for cart

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date("2026-03-15T00:00:00");

  // ================= COUNTDOWN =================
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days:0, hours:0, minutes:0, seconds:0 });
        return;
      }
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff / (1000*60*60)) % 24);
      const minutes = Math.floor((diff / (1000*60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ================= FETCH PRODUCTS (WITH SEARCH) =================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");

    let url = "http://127.0.0.1:5000/products";
    if (search) url += `?search=${search}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [location.search]);

  // ================= CATEGORY FILTER =================
  useEffect(() => {
    if (!selectedCategory) return;
    fetch(`http://127.0.0.1:5000/products?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setCategoryProducts(data))
      .catch((err) => console.error("Error fetching category products:", err));
  }, [selectedCategory]);

  // 🔥 Toast helper for Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

      {/* ROW 1 */}
      <div className="grid lg:grid-cols-5 gap-6 items-stretch">
        <div className="lg:col-span-1 h-80">
          <CategorySidebar onSelectCategory={setSelectedCategory} />
        </div>

        <div className="lg:col-span-4 grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 relative rounded-xl overflow-hidden shadow-sm">
            <img src={heroImage} alt="Hero" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center">
              <div className="px-10 text-white max-w-lg">
                <h2 className="text-4xl font-bold mb-4">
                  Latest trending <br /> Electronic items
                </h2>
                <p className="mb-5 text-sm">Best deals on gadgets and devices</p>
                <button className="bg-white text-black px-6 py-2 rounded-lg font-medium">
                  Learn more
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between h-80">
            <div>
              <h3 className="font-semibold text-lg mb-2">Hi, user</h3>
              <p className="text-sm text-gray-500 mb-4">Let's get started</p>
              <button onClick={() => navigate("/register")} className="w-full bg-blue-600 text-white py-2 rounded mb-3">Join now</button>
              <button onClick={() => navigate("/login")} className="w-full border border-gray-300 py-2 rounded">Log in</button>
            </div>
            <div className="bg-orange-100 p-3 rounded text-sm text-orange-700 mt-4">
              Get US $10 off with a new supplier
            </div>
          </div>
        </div>
      </div>

      {/* ================= DEALS SECTION ================= */}
      <div className="grid lg:grid-cols-5 gap-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="lg:col-span-1 flex flex-col">
          <h3 className="text-xl font-semibold text-blue-800">Deals and Offers</h3>
          <p className="text-sm text-blue-500 mt-1">Grab these top trending items now</p>
          <div className="flex gap-2 mt-4">
            {["days","hours","minutes","seconds"].map((unit,i) => (
              <div key={i} className="flex flex-col items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-lg shadow">
                <span className="text-sm font-bold">{timeLeft[unit]}</span>
                <span className="text-[10px] text-gray-300">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0,4).map((p) => (
            <div key={p._id} className="relative border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
              <span className="absolute top-2 right-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">-25%</span>
              <img src={`http://127.0.0.1:5000/images/${p.image}`} alt={p.name} className="h-28 mx-auto object-contain mb-3" />
              <p className="text-sm font-medium text-gray-700 truncate mb-1">{p.name}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-500 font-semibold">${(p.price*0.75).toFixed(2)}</span>
                <span className="text-xs text-gray-400 line-through">${p.price}</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => navigate(`/product/${p._id}`)} className="flex-1 text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-200 transition">View Details</button>
                <button onClick={() => handleAddToCart(p)} className="flex-1 text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded hover:bg-green-200 transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CATEGORY PRODUCTS ================= */}
      {selectedCategory && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{selectedCategory} Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {categoryProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* ================= RECOMMENDED PRODUCTS ================= */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((p) => (
            <div key={p._id} className="relative border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
              <img src={`http://127.0.0.1:5000/images/${p.image}`} alt={p.name} className="h-28 mx-auto object-contain mb-3" />
              <p className="text-sm font-medium text-gray-700 truncate mb-1">{p.name}</p>
              <div className="mb-2"><span className="text-red-500 font-semibold">${p.price}</span></div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => navigate(`/product/${p._id}`)} className="flex-1 text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-200 transition">View Details</button>
                <button onClick={() => handleAddToCart(p)} className="flex-1 text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded hover:bg-green-200 transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
            

        
                  <div className="bg-blue-500 text-white rounded-xl p-5 flex flex-col lg:flex-row justify-between gap-5">
        <div className="lg:w-1/2">
          <h3 className="text-lg font-semibold">An easy way to send requests to suppliers</h3>
          <p className="text-sm mt-1 text-blue-100">Get quotes from multiple sellers</p>
          <ul className="mt-4 space-y-2 text-sm text-blue-100">
            <li className="flex items-center gap-2">✔ Verified suppliers</li>
            <li className="flex items-center gap-2">✔ Fast response within 24 hours</li>
            <li className="flex items-center gap-2">✔ Best price guarantee</li>
          </ul>
        </div>
        <div className="bg-white text-gray-800 rounded-xl p-4 shadow-md lg:w-1/2">
          <h4 className="text-base font-semibold mb-3">Send quote to supplier</h4>
          <form className="space-y-3">
            <input type="text" placeholder="What item you need?" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <textarea rows="2" placeholder="Type more details" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Quantity" className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>PCS</option>
                <option>Boxes</option>
                <option>Kg</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition text-sm">Send Inquiry</button>
          </form>
        </div>
      </div>
      {/* ================= OUR BEST SELLERS ================= */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
        <h3 className="font-semibold mb-4">Our Best Sellers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.slice(5,10).map((p) => (
            <div key={p._id} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition duration-300">
              <img src={`http://127.0.0.1:5000/images/${p.image}`} alt={p.name} className="h-28 mx-auto object-contain mb-2" />
              <p className="text-sm font-medium text-gray-700 truncate mb-1">{p.name}</p>
              <p className="text-red-500 font-semibold mb-2">${p.price}</p>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => navigate(`/product/${p._id}`)} className="flex-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition">View Details</button>
                <button onClick={() => handleAddToCart(p)} className="flex-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}