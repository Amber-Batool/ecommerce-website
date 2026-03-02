
// src/pages/OrderSuccess.jsx
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ real order ID from URL

  useEffect(() => {
    clearCart(); // clear cart when page loads
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="inline-block bg-green-100 p-5 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800">
        Order Placed Successfully!
      </h1>

     <p className="text-gray-600">
  Your order ID is{" "}
  <span className="font-medium text-orange-600">
    {id.slice(-6)} {/* last 6 characters of MongoDB ObjectId */}
  </span>
</p>


      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
      >
        Continue Shopping
      </button>
    </div>
  );
}