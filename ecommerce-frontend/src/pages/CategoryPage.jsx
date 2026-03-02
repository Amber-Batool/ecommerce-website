import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";  // CartContext import
import { toast } from "react-toastify";            // Toast import
import "react-toastify/dist/ReactToastify.css";    // Toast CSS

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useCart(); // useCart hook

  // Proper add to cart with toast
  const addToCart = (product) => {
    addToCartContext(product); // CartContext me add
    toast(`${product.name} added to cart`, {
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

  useEffect(() => {
    if (!categoryName) return;

    fetch(`http://127.0.0.1:5000/products?category=${categoryName}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching category products:", err));
  }, [categoryName]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">{categoryName} Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((p) => (
            <div
              key={p._id}
              className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <img
                src={`http://127.0.0.1:5000/images/${p.image}`}
                alt={p.name}
                className="h-28 mx-auto object-contain mb-3"
              />
              <p className="text-sm font-medium text-gray-700 truncate mb-1">{p.name}</p>
              <p className="text-red-500 font-semibold mb-2">${p.price}</p>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="flex-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

