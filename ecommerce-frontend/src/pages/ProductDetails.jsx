import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [tab, setTab] = useState("desc");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Fetch main product
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));

    // Fetch related products dynamically
    fetch(`http://localhost:5000/products`)
      .then(res => res.json())
      .then(data => {
        // Filter out current product and take first 5 as related
        setRelatedProducts(data.filter(p => p._id !== id).slice(0, 5));
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Top Section */}
      <div className="bg-white p-6 rounded-xl shadow-md grid lg:grid-cols-3 gap-8">

        {/* Image Gallery */}
        <div>
          <img
            src={`http://localhost:5000/images/${product.image}`}
            alt={product.name}
            className="w-full rounded-lg shadow-sm"
          />
          <div className="flex gap-2 mt-3">
            {[1, 2, 3, 4].map(i => (
              <img
                key={i}
                src={`http://localhost:5000/images/${product.image}`}
                alt="thumbnail"
                className="w-16 h-16 rounded cursor-pointer hover:opacity-80 shadow-sm"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>

          <div className="text-yellow-500 text-sm">
            ⭐⭐⭐⭐☆ <span className="text-gray-500 ml-1">(32 reviews)</span>
          </div>

          <p className="text-3xl text-orange-600 font-bold">${product.price}</p>

          <div className="text-sm text-gray-600 space-y-1 pt-2">
            <p><span className="font-medium">Brand:</span> Generic</p>
            <p><span className="font-medium">Category:</span> {product.category || "General"}</p>
            <p><span className="font-medium">Shipping:</span> Free worldwide</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition">
              Buy now
            </button>

            <button
              onClick={() => addToCart(product)}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition"
            >
              Add to cart
            </button>
          </div>
        </div>

        {/* Supplier Box */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm space-y-3 h-fit">
          <h3 className="font-semibold text-gray-800">Supplier</h3>
          <p className="text-sm font-medium">Gadget World Ltd.</p>
          <p className="text-xs text-gray-500">Verified supplier</p>
          <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition">
            Contact supplier
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex gap-6 border-b mb-4 text-sm font-medium">
          <button
            onClick={() => setTab("desc")}
            className={`${tab === "desc" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"}`}
          >
            Description
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={`${tab === "reviews" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"}`}
          >
            Reviews
          </button>
          <button
            onClick={() => setTab("shipping")}
            className={`${tab === "shipping" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"}`}
          >
            Shipping
          </button>
        </div>

        {tab === "desc" && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description || "This product is built with high-quality materials and designed for long-lasting performance."}
          </p>
        )}

        {tab === "reviews" && (
          <div className="space-y-2 text-sm text-gray-600">
            <p>⭐⭐⭐⭐⭐ — Excellent product!</p>
            <p>⭐⭐⭐⭐ — Very good value for money.</p>
          </div>
        )}

        {tab === "shipping" && (
          <p className="text-sm text-gray-600">
            Ships within 3–5 business days. International delivery available.
          </p>
        )}
      </div>
      {/* Related Products */}
<div className="bg-white p-6 rounded-xl shadow-md">
  <h3 className="font-semibold mb-4 text-gray-800">Related products</h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
    {relatedProducts.map(product => (
      <div
        key={product._id}
        className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center"
      >
        <div className="w-full h-40 overflow-hidden rounded mb-2 flex justify-center items-center">
          <img
            src={`http://localhost:5000/images/${product.image}`}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <p className="text-sm text-center">{product.name}</p>
        <p className="text-orange-600 font-bold text-sm">${product.price}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}