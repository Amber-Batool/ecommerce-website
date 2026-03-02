
import { useEffect, useState } from "react";
import { TrashIcon, ShoppingBagIcon, UserGroupIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Toastify imports
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminPanel() {  // ✅ Default export name match karo
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  });

  // ------------------ Fetch Products ------------------
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ------------------ Add Product ------------------
  const addProduct = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return toast.warning("Admin not logged in!");

    try {
      const res = await fetch("http://127.0.0.1:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // ✅ Bearer token
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Failed to add product");

      toast.success("Product added successfully!");
      fetchProducts();
      setForm({ name: "", price: "", image: "", description: "", category: "", stock: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // ------------------ Delete Product ------------------
  const deleteProduct = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return toast.warning("Admin not logged in!");

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },  // ✅ Bearer token
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Failed to delete product");

      toast.error("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // ------------------ Chart Data ------------------
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 2300, 3400],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: false },
    },
  };

  // ------------------ Render ------------------
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">AdminPanel</div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
            <ShoppingBagIcon className="w-5 h-5 mr-2" /> Products
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
            <UserGroupIcon className="w-5 h-5 mr-2" /> Users
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors">
            <ChartBarIcon className="w-5 h-5 mr-2" /> Analytics
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-xl shadow flex flex-col">
            <span className="text-gray-400 text-sm">Revenue</span>
            <span className="text-2xl font-bold text-blue-600">$34,000</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow flex flex-col">
            <span className="text-gray-400 text-sm">Orders</span>
            <span className="text-2xl font-bold text-blue-600">1,250</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow flex flex-col">
            <span className="text-gray-400 text-sm">Products</span>
            <span className="text-2xl font-bold text-blue-600">{products.length}</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow flex flex-col">
            <span className="text-gray-400 text-sm">Users</span>
            <span className="text-2xl font-bold text-blue-600">560</span>
          </div>
        </div> 

        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow mb-6" style={{ height: "300px" }}>
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6 transition">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["name", "price", "image", "description", "category", "stock"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            ))}
          </div>

          {form.image && (
            <div className="mt-4">
              <span className="text-gray-500 text-sm">Image Preview:</span>
              <img
                src={`http://127.0.0.1:5000/images/${form.image}`}
                alt="preview"
                className="mt-2 w-24 h-24 object-contain rounded-lg border"
              />
            </div>
          )}

          <button
            onClick={addProduct}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            Add Product
          </button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-2xl shadow flex flex-col justify-between transition hover:shadow-md"
            >
              <img
                src={`http://127.0.0.1:5000/images/${p.image}`}
                alt={p.name}
                className="w-full h-36 object-contain rounded-lg mb-3"
              />
              <div>
                <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                <p className="text-gray-500 mb-1">{p.category}</p>
                <p className="text-gray-700 mb-1">${p.price}</p>
                <p className="text-gray-400 text-sm">Stock: {p.stock}</p>
              </div>
              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-3 flex items-center text-red-500 hover:text-red-600"
              >
                <TrashIcon className="w-5 h-5 mr-1" /> Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}