import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const params = new URLSearchParams(location.search);
  const search = params.get("search");

  useEffect(() => {
    if (!search) return;

    fetch(`http://127.0.0.1:5000/products?search=${search}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching search results:", err));

  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <h2 className="text-2xl font-semibold mb-6">
        Search Results for: "{search}"
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

    </div>
  );
}