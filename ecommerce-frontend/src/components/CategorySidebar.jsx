import { useNavigate } from "react-router-dom";

export default function CategorySidebar({ onSelectCategory }) {
  const navigate = useNavigate();
  const cats = ["Electronics", "Fashion", "Jwellery", "Beauty", "Tech", "HomeDecor"];

  return (
    <aside className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-full">
      <h2 className="font-semibold text-gray-800 mb-3">Categories</h2>

      <div className="space-y-1">
        {cats.map((c) => (
          <div
            key={c}
            className="px-3 py-1.5 rounded-md text-sm text-gray-600 
                       cursor-pointer transition duration-200
                       hover:bg-blue-50 hover:text-blue-600"
            onClick={() => {
              onSelectCategory(c); // 🔹 update selected category
              navigate(`/category/${c}`); // 🔹 navigate to category route
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </aside>
  );
}