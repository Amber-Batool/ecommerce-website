import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white p-4 rounded-lg border border-gray-200 
                 hover:shadow-lg hover:-translate-y-1 
                 transition duration-300"
    >
      <img
        src={`http://127.0.0.1:5000/images/${product.image}`}
        alt={product.name}
        className="h-32 mx-auto object-contain mb-3"
      />

      <h3 className="text-sm font-medium text-gray-700 truncate">
        {product.name}
      </h3>

      <p className="text-red-500 font-semibold mt-1">
        ${product.price}
      </p>
    </Link>
  );
}




