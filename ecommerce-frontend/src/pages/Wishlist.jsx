
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (wishlist.length === 0) 
    return <p className="p-10 text-center text-gray-500 text-lg">Your wishlist is empty 💔</p>;

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`, {

     position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: "#fff",
        color: "#000",
        border: "1px solid #ccc",
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div 
            key={product._id} 
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition relative flex flex-col justify-between"
          >
            {/* Product Image */}
            <img
              src={`http://127.0.0.1:5000/images/${product.image}`}
              alt={product.name}
              className="w-full h-36 object-contain rounded mb-3"
            />

            {/* Product Info */}
            <p className="font-medium text-gray-700 truncate mb-1">{product.name}</p>
            <p className="text-orange-600 font-semibold mb-3">${product.price}</p>

            {/* Buttons */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="flex-1 text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-200 transition"
              >
                View
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded hover:bg-green-200 transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="absolute top-2 right-2 text-red-500 text-lg hover:scale-110 transition"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}